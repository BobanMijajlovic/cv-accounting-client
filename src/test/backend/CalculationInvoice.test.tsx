import 'jest-extended'
import React   from 'react'
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
    addDays,
    differenceInCalendarDays
}              from "date-fns";
import {
    TCalculation,
    TItem,
    TTax,
    TWarehouse
}              from "../../graphql/type_logic/types";
import {
    getItems,
    getTaxes,
    getWarehouses
}              from "../helpers";
import _       from "lodash";
import {
    bookAndValidateCalculation,
    calculationRandomForTest,
    calculationRandomItemsForTest,
    insertAndCheckOne,
    insetItemAndCheck
}              from "../helpers/calculation";

import {
    insertAndCheckOne as invoiceInsertAndCheck,
    insertFooterAndCheck,
    insetItemAndCheck as invoiceInsertItemAndCheck,
    invoiceFooterDueDate,
    invoiceFooterRandomTest,
    invoiceRandomItemsForTest,
    updateInvoice,
}                           from "../helpers/invoice";
import { CONSTANT_INVOICE } from "../../application/constants";

Enzyme.configure({adapter:new Adapter()});

jest.setTimeout(100000);

describe('Calculation/Invoice test', () => {

    let calculations = [] as TCalculation[]
    let date = new Date('2021-02-25')
    const numRecords = 100
    date.setDate(date.getDate() - numRecords)
    let warehouses = [] as TWarehouse[]
    const count = differenceInCalendarDays(addDays(date, numRecords), date)
    let taxes = [] as TTax[]
    let _items = [] as TItem[]
    const {SAVED} = CONSTANT_INVOICE.STATUS


    it('Fetch items/taxes', async (done) => {
        taxes = await getTaxes()
        _items = await getItems(15)
        warehouses = await getWarehouses(3)
        done()
    })

    for (let i = 0; i < count; i++) {
        let newDate=  new Date(date)
        it('Calculation insert', async (done) => {
            const items = await calculationRandomItemsForTest(_items)
           const calculationData = await calculationRandomForTest(newDate, items, taxes)
            let calculation = await insertAndCheckOne(newDate, calculationData)
            const calcItemData = await items.map(item => {
                return {
                    ..._.omit(item, ['taxId'])
                }
            })
            for (let i = 0; i < calcItemData.length; i++) {
                calculation = await insetItemAndCheck(calcItemData[i], Number(calculation.id))
            }
            await bookAndValidateCalculation(calculation)
            done()
        })

        it('Invoice insert', async (done) => {
            let invoice = await invoiceInsertAndCheck(newDate)
            const invoiceItemData = await invoiceRandomItemsForTest(_items, warehouses);
            const invoiceId = Number(invoice.id)
            for (let i = 0; i < invoiceItemData.length; i++) {
                invoice = await invoiceInsertItemAndCheck(invoiceItemData[i], invoiceId)
            }
            let invoiceData = await invoiceFooterRandomTest();
            invoice = await insertFooterAndCheck(`${invoiceId}`, invoiceData)
            const dueDateData = await invoiceFooterDueDate(newDate, invoice);
            invoice = await insertFooterAndCheck(`${invoiceId}`, dueDateData)
            await updateInvoice(Number(invoice.id), SAVED)
            done()
        })

        date = addDays(date, 1)
    }

})


