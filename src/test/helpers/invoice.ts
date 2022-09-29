import {
    getCustomers,
    getItems,
    getWarehouses
}                   from "./index";
import _            from "lodash";
import {renderHook} from "../TestComponent";
import {
    useInsertInvoiceMutation,
    useInsertUpdateInvoiceItemMutation,
    useUpdateInvoiceMutation
}            from "../../graphql/graphql";
import {act} from "react-dom/test-utils";
import {
    TInvoice,
    TInvoiceItem,
    TItem,
    TWarehouse
} from "../../graphql/type_logic/types";
import {
    getInvoiceFinanceMP,
    getInvoiceFooterAdditionalExpenseFinance
}            from "../../application/components/invoice/util";
import React from "react";

export const invoiceRandomForTest = async (date: Date) => {

    /** set customer limit on 1 for test customer Card  default is 20*/
    const customers = await getCustomers(1)//20
    return {
        header: {
            customerId: Number(customers[_.random(0, customers.length - 1)].id),
            discountDefault: _.round(_.random(0,10),2),
            flag : 1,
            date: date.toString()
        }
    }
}

export const invoiceFooterDueDate = async (date:Date,invoice: TInvoice) => {
    const totalExpenseFinance = getInvoiceFooterAdditionalExpenseFinance(invoice.expense as any)
    const  dueDateFinance = _.round(_.add(getInvoiceFinanceMP(invoice.items as any),totalExpenseFinance),2)
  /*  const dueDate = new Date()
    const amount = _.random(0,10) > 8 ? _.subtract(dueDate.getDate(),_.random(0,30)) :  _.add(dueDate.getDate(),_.random(0,14))
    dueDate.setDate(amount)*/
    return {
        footer: {
            dueDates: [
                {
                    dueDate: new Date(date).toISOString(),
                    finance: dueDateFinance,
                }
            ],
        }
    }
}

export const invoiceFooterRandomTest = async () => {
    const isDiscount  = !!_.random(0,1)
    return {
        footer: {
            additionalExpense: [
                {
                    items: [
                        {
                            taxId: _.random(1,2),
                            financeMP:  _.random(1, 1000),
                        }
                    ]
                }
            ],
            discount : isDiscount ? [
                {
                    percent : _.random(0,20),
                    description : 'whole invoice discount '
                }
            ] : void(0)
        }
    }
}

export const insertAndCheckOne = async (date: Date) => {
    const [mutationCall] = renderHook(useInsertInvoiceMutation)
    const invoiceData = await invoiceRandomForTest(date);
    let result = {};
    await act(async () => {
        try {
            result = await mutationCall({
                variables: {
                    data: invoiceData
                }
            })
        } catch (e) {
            console.log(JSON.stringify(e))
        }
    })
    expect(result).toHaveProperty('data')
    const invoice = _.get(result, 'data.invoice')
    const {header} = invoiceData
    expect(invoice).toHaveProperty('customer')
    expect(invoice).toHaveProperty('discountDefault',header.discountDefault)
    expect(invoice).toHaveProperty('flag',header.flag)
    const {customer} = invoice
    expect(customer).toHaveProperty('id', `${header.customerId}`)
    return invoice
}


export const insertFooterAndCheck = async (id: string,invoiceData: any) => {
    const [mutationCall] = renderHook(useUpdateInvoiceMutation)
    let result = {};
    await act(async () => {
        try {
            result = await mutationCall({
                variables: {
                    id: Number(id),
                    data: invoiceData
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
    expect(result).toHaveProperty('data')
    const invoice = _.get(result, 'data.invoice')
    const {footer} = invoiceData
    if(footer.dueDates && footer.dueDates.length !== 0) {
        expect(invoice.dueDates).toBeArrayOfSize(1)
        expect(invoice).toHaveProperty('dueDates')
        expect(invoice.dueDates[0]).toHaveProperty('date')
        expect(invoice.dueDates[0]).toHaveProperty('finance',footer.dueDates[0].finance)
    }
    if(footer.additionalExpense && footer.additionalExpense.length !== 0){
        const {expense} = invoice
        expect(invoice).toHaveProperty('expense')
        expect(invoice.expense).toBeArrayOfSize(1)
        expect(expense[0]).toHaveProperty('items')
        expect(expense[0].items).toBeArrayOfSize(1)
        const {items} = expense[0]
        const {items:_items} = footer.additionalExpense[0]
        expect(items[0]).toHaveProperty('taxId', Number(_items[0].taxId))
        expect(items[0]).toHaveProperty('financeMP', Number(_items[0].financeMP))
    }
    return invoice
}

export const invoiceRandomItemsForTest= async (items: TItem[],warehouses: TWarehouse[])=> {
    return items.map((item: TItem,index)=> {
        const percentValue = !!_.random(0,1) // 0 - discountValue, 1 - discountPercent
        const discountEx = _.random(0,1000)
        const discount = percentValue ? { value : _.random(0,100)} : {percent: _.random(0,99)}
        return Object.assign({
            quantity:  _.round(_.random(1,35,true),2),
            price: _.toNumber(item.mp),
            itemId: Number(item.id),
            warehouseId: Number(warehouses[_.random(0, warehouses.length - 1)].id),
            useDiscountDefault : _.random(0,1)
        },discountEx > 999 ? {discount:discount} : {})
    })
}

export const insetItemAndCheck = async (invoiceItemData:any,invoiceId: number) => {
    const [mutationCall] = renderHook(useInsertUpdateInvoiceItemMutation)
    let result = {};
    await act(async () => {
        try {
            result = await mutationCall({
                variables: {
                    id: 0,
                    additionalData:  {
                        invoiceId: invoiceId
                    },
                    data: invoiceItemData
                }
            })

        } catch (e) {
            console.log(e)
        }
    })

    expect(result).toHaveProperty('data')
    /*const invoice = _get(result, 'data.invoice')
    const {items} = invoice
    const item = items[items.length-1]
    expect(item).toHaveProperty('itemId',invoiceItemData.itemId)*/
}



export const updateInvoice = async (invId: number, status: number) => {
    const [mutationUpdateInvoice] = renderHook(useUpdateInvoiceMutation)
    let invoice: any;
    let result;
    await act(async () => {
        try {
            result = await mutationUpdateInvoice({
                variables: {
                    id: invId,
                    data: {
                        status
                    }
                }
            })
        } catch (e) {
            console.log(e)
        }
    })
    expect(result).toHaveProperty('data')
    invoice = _.get(result, 'data.invoice')
    expect(invoice).toHaveProperty('status', status)
    return invoice
}

