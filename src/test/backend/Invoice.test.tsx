import 'jest-extended'
import React                             from 'react'
import Enzyme                            from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
    getInvoices,
    getItems,
    getWarehouses
}              from "../helpers";
import {
    addDays,
    addMonths,
    differenceInCalendarDays,
    subMonths
}              from "date-fns";
import {
    insertAndCheckOne,
    insertFooterAndCheck,
    insetItemAndCheck,
    invoiceFooterDueDate,
    invoiceFooterRandomTest,
    invoiceRandomItemsForTest,
    updateInvoice
}                                        from "../helpers/invoice";
import {CONSTANT_INVOICE}                from "../../application/constants";
import {useInsertInvoiceVersionMutation} from "../../graphql/graphql";
import {renderHook}                      from "../TestComponent";
import {act}                             from "react-dom/test-utils";
import _                                 from 'lodash'
import {
    TItem,
    TWarehouse
} from "../../graphql/type_logic/types";

Enzyme.configure({adapter: new Adapter()});

jest.setTimeout(130000);


describe('Invoice test', () => {
    const {SAVED} = CONSTANT_INVOICE.STATUS
    let date = subMonths(new Date(), 1)
    const count = differenceInCalendarDays(addMonths(date, 1), date)
    let invoices: any;
    let items = [] as TItem[]
    let warehouses = [] as TWarehouse[]

    it('Insert invoice version', async (done) => {
        const [mutationInsertInvoiceVersion] = renderHook(useInsertInvoiceVersionMutation)
        const obj = {
            name: 'testType',
            description: 'test type'
        }
        let result = {};
        await act(async () => {
            try {
                result = await mutationInsertInvoiceVersion({
                    variables: {
                        data: obj
                    }
                })
            } catch (e) {
                console.log(e)
            }
        })
        expect(result).toHaveProperty('data')
        const invoice = _.get(result, 'data.invoiceVersion')
        expect(invoice).toHaveProperty('name', obj.name)
        expect(invoice).toHaveProperty('description', obj.description)
        done()
    })

    it('Invoice insert 1 month', async (done) => {
        for (let i = 0; i < count; i++) {
            await insertAndCheckOne(date)
            date = addDays(date, 1)
        }
        done()
    })

    it('Fetch invoices', async (done) => {
        invoices = await getInvoices(15)
        done()
    })


    it('Invoice insert items', async (done) => {
        items = await getItems(10)
        warehouses = await getWarehouses(3)
        for (let j = 0; j < invoices.length; j++) {
            const invoiceId = Number(invoices[j].id)
            const invoiceItemData = await invoiceRandomItemsForTest(items,warehouses);
            for (let i = 0; i < invoiceItemData.length; i++) {
                await insetItemAndCheck(invoiceItemData[i], invoiceId)
            }
        }
        done()
    })

    it('Fetch invoices', async (done) => {
        invoices = await getInvoices(10)
        done()
    })


    it('Invoice insert footer', async (done) => {
        for (let i = 0; i < invoices.length; i++) {
            const invoiceData = await invoiceFooterRandomTest();
            await insertFooterAndCheck(invoices[i].id, invoiceData)
        }
        done()
    })

    it('Fetch invoices', async (done) => {
        invoices = await getInvoices(10)
        done()
    })

    it('Invoice insert footer', async (done) => {
        for (let i = 0; i < invoices.length; i++) {
            const invoiceData = await invoiceFooterDueDate(date, invoices[i]);
            await insertFooterAndCheck(invoices[i].id, invoiceData)
        }
        done()
    })


    it('Save invoices', async (done) => {
        for (let i = 0; i < invoices.length; i++) {
            let invoice = invoices[i]
            invoice = await updateInvoice(Number(invoice.id), SAVED)
        }
        done()
    })
})
