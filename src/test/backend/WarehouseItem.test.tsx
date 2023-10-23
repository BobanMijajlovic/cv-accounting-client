import 'jest-extended'
import React             from "react"
import Enzyme            from 'enzyme'
import Adapter           from 'enzyme-adapter-react-16';
import _                 from 'lodash'
import {renderHook}      from "../TestComponent";
import {
    useTestInsertWarehouseItemMutation,
    WarehouseItemsBulk
}                        from "../../graphql/graphql";
import {act}             from "react-dom/test-utils";
import {
    TCalculation,
    TInvoice,
    TItem,
    TWarehouse
}                        from "../../graphql/type_logic/types";
import {
    getCalculations,
    getInvoices,
    getRandomItems,
    getWarehouseItemStates,
    getWarehouses
}                        from "../helpers";
import {validateRecords} from "../helpers/warehouseItems";

Enzyme.configure({adapter: new Adapter()});

jest.setTimeout(450000)

const insertItems = async (items: TItem[], customerId: number, warehouse: TWarehouse, calculation: TCalculation, invoice: TInvoice, direction: boolean) => {
    const mutationInsert = renderHook(useTestInsertWarehouseItemMutation)
    const [mutationCall] = mutationInsert
    let object = Object.assign({
        customerId: Number(customerId),
        warehouseId: Number(warehouse.id),
        items: []
    }, (direction ? {calculationId: Number(calculation.id)} : {invoiceId: Number(invoice.id)})) as WarehouseItemsBulk

    object.items = items.map(item => ({
        itemId: Number(item.id),
        price: _.round(_.random(1, 200, true), 2),
        quantity: _.round(_.random(1, 2000, true), 3),
    }))

    let result = void (0)
    await act(async () => {
        try {
            result = await mutationCall({
                variables: {
                    data: object
                }
            })
        } catch (e) {
            console.log(" Error ", e)
        }
    })
    return object
}

const testOnce = async (items: TItem[], warehouses: TWarehouse[], calculations: TCalculation[], invoices: TInvoice[]) => {
    const warehouse = warehouses[_.random(0, warehouses.length - 1)]

    const calculation = calculations[_.random(0, calculations.length - 1)]
    const invoice = invoices[_.random(0, invoices.length - 1)]
    const itemsIds = items.map(i => i.id as string)

    const direction = !!_.random(0, 1) // 0 - invoice, 1 calc

    const customerId = direction ? Number(calculation.supplierId) : Number(invoice.customerId)

    const warehouseItemsBefore = await getWarehouseItemStates(warehouse.id as string, itemsIds)
    const insertObject = await insertItems(items, customerId, warehouse, calculation, invoice, direction)
    const warehouseItemsAfter = await getWarehouseItemStates(warehouse.id as string, itemsIds)
    validateRecords(warehouseItemsBefore, warehouseItemsAfter, insertObject as any, direction)
}

describe('Warehouse item test with checking', () => {

    let warehouses: TWarehouse[] = [];
    let calculations: TCalculation [] = [] as TCalculation[]
    let invoices: TInvoice[] = []

    it("fetch need data ", async (done) => {

        warehouses = await getWarehouses(3)
        calculations = await getCalculations()
        invoices = await getInvoices()
        done()
    })

    it('Test 50 records with 10 items - checking', async (done) => {
        for (let i = 0; i < 50; i++) {
            const items = await getRandomItems(10, 10)
            await testOnce(items, warehouses, calculations, invoices)
        }
        done()
    })

    it('Test 50 records with 5 items - checking', async (done) => {
        for (let i = 0; i < 100; i++) {
            const items = await getRandomItems(10, 5)
            await testOnce(items, warehouses, calculations, invoices)
        }
        done()
    })

    it('Test 1000 records with 5 items - checking', async (done) => {
        for (let i = 0; i < 100; i++) {
            const items = await getRandomItems(100, 10)
            await testOnce(items, warehouses, calculations, invoices)
        }
        done()
    })
})
