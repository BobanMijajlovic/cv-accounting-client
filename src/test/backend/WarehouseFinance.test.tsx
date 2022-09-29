import 'jest-extended'
import React                                from 'react'
import Enzyme                               from 'enzyme'
import Adapter                              from 'enzyme-adapter-react-16'
import {act}                                from 'react-dom/test-utils';
import {
    TCalculation,
    TCalculationItem,
    TInvoice,
    TWarehouse
} from "../../graphql/type_logic/types";
import {useInsertWarehouseFinanceMutation,} from "../../graphql/graphql";
import {renderHook}                         from "../TestComponent";
import {
    getCalculations,
    getInvoices,
    getWarehouses
}                                           from "../helpers";
import _                                    from "lodash";

Enzyme.configure({adapter: new Adapter()});

jest.setTimeout(70000);


const insertAndCheckOne = async ({warehouse,calculation,invoice}: {warehouse: TWarehouse,invoice ?: TInvoice,calculation?: TCalculation}) => {
    const mutationInsert = renderHook(useInsertWarehouseFinanceMutation)
    const [mutationCall] = mutationInsert
    let object =  Object.assign({
        warehouseId: Number(warehouse.id),
    },(calculation ? {
        date: (calculation as any ).date,
        owes: _.round((calculation as any).items.reduce((acc: number, item: TCalculationItem) => _.add(acc, Number(item.financeFinalVP)), 0), 2),
        claims: 0,
        calculationId: Number(calculation.id),
        invoiceId: null
    } : {
        date: (invoice as any).date,
        owes: 0,
        claims: _.random(0,10000),
        invoiceId: Number((invoice as any).id),
        calculationId: null
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
            console.log(" Error ", JSON.stringify(e))
        }
    })
    expect(result).toHaveProperty('data')
    const warehouseFinance = _.get(result, 'data.warehouseFinance')
    expect(warehouseFinance).toHaveProperty('owes', object.owes)
    expect(warehouseFinance).toHaveProperty('claims', object.claims)
    expect(warehouseFinance).toHaveProperty('calculationId',object.calculationId)
    expect(warehouseFinance).toHaveProperty('invoiceId', object.invoiceId)
}

describe('Warehouse Finance test', () => {
    let warehouses: TWarehouse[] = [];
    let calculations: TCalculation [] = [] as TCalculation[]
    let invoices: TInvoice[] = []

    it("fetch need data ", async (done) => {
        warehouses = await getWarehouses(4)
        calculations = await getCalculations(10)
        invoices = await getInvoices(10)
        done()
    })


    it('Warehouse  finance insert ( Warehouse id - 1 )',async (done)=> {
        for(let i=0;i< calculations.length;i++) {
            const calculation= calculations[i]
            const invoice= invoices[i]
            const warehouse = warehouses[0]
            await insertAndCheckOne({warehouse,calculation})
            await insertAndCheckOne({warehouse,invoice})
        }
        done()
    })

    /*it('Warehouse  finance insert ( Warehouse id - 2)',async (done)=> {
        for(let i=0;i< calculations.length;i++) {
            const calculation= calculations[i]
            const invoice= invoices[i]
            const warehouse = warehouses[1]
            await insertAndCheckOne({warehouse,calculation})
            await insertAndCheckOne({warehouse,invoice})
        }
        done()
    })


    it('Warehouse  finance insert ( Warehouse id - 3)',async (done)=> {
        for(let i=0;i< calculations.length;i++) {
            const calculation= calculations[i]
            const invoice= invoices[i]
            const warehouse = warehouses[2]
            await insertAndCheckOne({warehouse,calculation})
            await insertAndCheckOne({warehouse,invoice})
        }
        done()
    })

    it('Warehouse  finance insert ( Warehouse id - 4)',async (done)=> {
        for(let i=0;i< calculations.length;i++) {
            const calculation= calculations[i]
            const invoice= invoices[i]
            const warehouse = warehouses[3]
            await insertAndCheckOne({warehouse,calculation})
            await insertAndCheckOne({warehouse,invoice})
        }
        done()
    })*/


})
