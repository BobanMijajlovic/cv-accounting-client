import _                        from 'lodash';
import {
    TCalculation,
    TItem,
    TTax,
    TWarehouseFinance,
    TWarehouseItemInfo
}                               from '../../graphql/type_logic/types';
import {
    getCustomers,
    getLastWarehouseFinance,
    getWarehouseItemStates,
    getWarehouses
}                               from './index';
import { renderHook }           from '../TestComponent';
import {
    useInsertCalculationMutation,
    useInsertUpdateCalculationItemMutation,
    useUpdateCalculationMutation
}                               from '../../graphql/graphql';
import { act }                  from 'react-dom/test-utils';
import { CONSTANT_CALCULATION } from '../../application/constants';

const generateRandomNum = () => {
    return `${_.random(1, 1000000)}-${_.random(1, 1000000)}`
}


export const calculationRandomItemsForTest = async (items: TItem[])=> {
    return items.map((item: TItem,index)=> {
        const percentValue = !!_.random(0,1) // 0 - discountValue, 1 - discountPercent
        const discountEx = _.random(0,50)
        const discount = percentValue ? { discountValue : _.random(0,100)} : {discountPercent: _.random(0,99)}
        return Object.assign({
            posNumber: Number(index+1),
            quantity:  _.round(_.random(1,500,true),2),
            financeMP: _.round(_.random(1,10000,true),2),
            itemId: Number(item.id),
            taxId: Number(item.taxId)
        },discountEx > 49 ? discount : {})
    })
}


export const calculationRandomForTest = async (date: Date, items: any,taxes: TTax[]) => {
    const _data = items.reduce((acc: any,item:any) => {
        const tax: any = taxes && taxes.find(v => `${v.id}` === `${item.taxId}`)
        const value = (tax.values as any)[0].value
        const financeMP = item.financeMP
        const financeVP =_.round(_.divide(_.multiply(financeMP, 100), _.add(100, Number(value))), 2)
        //const financeMP = _.round(_.divide(_.multiply(item.financeVP, _.add(100, Number(value))), 100), 2)
        const taxFinance = _.round(_.subtract(financeMP,financeVP),2)
        const index = acc.vats.findIndex((vat:any)=> Number(vat.taxId) === Number(item.taxId))
        const totalInvoice = _.round(_.add(acc.totalInvoice,financeMP),2)
        if(index === -1) {
            return {
                totalInvoice,
                vats: [
                    ...acc.vats,
                    {
                        taxId: item.taxId,
                        taxFinance,
                        financeMP
                    }
                ]
            }
        }
        const vat = acc.vats[index]
        acc.vats.splice(index,1,{
            taxId: vat.taxId,
            taxFinance: _.round(_.add(Number(vat.taxFinance), taxFinance), 2),
            financeMP: _.round(_.add(Number(vat.financeMP),financeMP),2)
        })
        return {
            totalInvoice,
            vats: acc.vats
        }
    },{totalInvoice: 0,vats: []})

    /** set customer limit on 1 for test customer Card  default is 20*/
    const customers = await getCustomers(1) //20
    const warehouses = await getWarehouses(3)
    const {totalInvoice,vats} = _data
    const totalExpense = 0//_.random(1, 1000)
    const discount = 0 //10
    const totalTaxFinance = _.round(_.divide(_.multiply(totalInvoice, _.subtract(100, Number(discount))), 100),2)
    const dueDateFinance = _.round(_.add(totalTaxFinance,totalExpense),2)


    return {
        header: {
            invoiceNumber: generateRandomNum(),
            totalFinanceMP: totalInvoice,
            financeTax: vats.reduce((acc:number,x:any)=> _.round(_.add(acc,Number(x.taxFinance)),2) ,0),
            date: new Date(date).toISOString(),
            invoiceDate: (new Date()).toISOString(),
            supplierId: Number(customers[_.random(0, customers.length - 1)].id),
            warehouseId: Number(warehouses[_.random(0, warehouses.length - 1)].id),
            /*    discount: [
                    {
                        percent: 10
                    }
                ],*/
            dueDate: [
                {
                    date: date.toISOString(),
                    finance: dueDateFinance,
                }
            ],
            vats:vats.sort((a:any,b:any)=> a.taxId > b.taxId),
            /*expense: [
                {
                    items: [
                        {
                            taxId: _.random(1, 3),
                            finance: totalExpense,
                        }
                    ]
                }
            ],
            additionalExpense: [
                {
                    invoiceNumber: `${_.random(1, 10000000)}`,
                    invoiceDate: (new Date()).toISOString(),
                    dueDate: (new Date()).toISOString(),
                    customerId: Number(customers[_.random(0, customers.length - 1)].id),
                    items: [
                        {
                            taxId: _.random(1, 3),
                            finance: _.random(1, 1000),
                        }
                    ]
                }
            ]*/
        }
    }
}


export const insertAndCheckOne = async (date:Date,calculationData:any) => {
    const [mutationCall] = renderHook(useInsertCalculationMutation)
    let result = {};
    await act(async () => {

        try {
            result = await mutationCall({
                variables: {
                    data: calculationData
                }
            })

        } catch (e) {
            console.log(JSON.stringify(e))
        }
    })
    expect(result).toHaveProperty('data')
    const calculation = _.get(result, 'data.calculation')
    const {header} = calculationData
    expect(calculation).toHaveProperty('invoiceNumber', header.invoiceNumber)
    expect(calculation).toHaveProperty('invoiceDate')
    expect(calculation).toHaveProperty('date')
    expect(calculation).toHaveProperty('totalFinanceMP', header.totalFinanceMP)
    expect(calculation).toHaveProperty('financeTax', header.financeTax)
    expect(calculation).toHaveProperty('supplier')
    const {supplier, warehouse, discount, dueDate, vats, expense} = calculation
    expect(supplier).toHaveProperty('id', `${header.supplierId}`)
    expect(warehouse).toHaveProperty('id', `${header.warehouseId}`)

 /*   expect(discount).toBeArrayOfSize(1)
    expect(discount[0]).toHaveProperty('percent', header.discount[0].percent)*/

    expect(dueDate).toBeArrayOfSize(1)
    expect(dueDate[0]).toHaveProperty('date')
    expect(dueDate[0]).toHaveProperty('finance', header.dueDate[0].finance)

    expect(vats).toBeArrayOfSize(2)


    const _vats = vats.sort((a:any,b:any) => a.taxId > b.taxId)
    const headerVats = header.vats.sort((a:any,b:any) => a.taxId > b.taxId)
    expect(vats[0].tax).toHaveProperty('id', `${header.vats[0].taxId}`)
    expect(vats[0]).toHaveProperty('taxFinance', header.vats[0].taxFinance)
    expect(vats[1].tax).toHaveProperty('id', `${header.vats[1].taxId}`)
    expect(vats[1]).toHaveProperty('taxFinance', header.vats[1].taxFinance)

    /* expect(expense).toBeArrayOfSize(2)calcItemData
    expense.map((expense: any) => {
        if (expense.customer && expense.invoiceNumber) {
            const addExpense: any = header.additionalExpense.find((x: any) => `${x.customerId}` === `${expense.customer.id}` && x.invoiceNumber === expense.invoiceNumber)
            expect(expense).toHaveProperty('invoiceNumber', addExpense.invoiceNumber)
            expect(expense.customer).toHaveProperty('id', `${addExpense.customerId}`)
            expect(expense).toHaveProperty('items')
            expect(expense.items).toBeArrayOfSize(1)
            const items = expense.items
            expect(items[0]).toHaveProperty('taxId', addExpense.items[0].taxId)
            expect(items[0]).toHaveProperty('finance', addExpense.items[0].finance)
        } else {
            expect(expense).toHaveProperty('items')
            expect(expense.items).toBeArrayOfSize(1)
        }
    })*/
    return calculation
}

export const insetItemAndCheck = async (calcItemData:any,calculationId: number) => {
    const [mutationCall] = renderHook(useInsertUpdateCalculationItemMutation)
    let result = {};
    await act(async () => {
        try {
            result = await mutationCall({
                variables: {
                    id: 0,
                    calcId: calculationId,
                    data: calcItemData
                }
            })

        } catch (e) {
            console.log(JSON.stringify(e))
        }
    })
    expect(result).toHaveProperty('data')
    const calculation = _.get(result, 'data.calculation')
    const {items} = calculation
    const item = items[items.length-1]
    expect(item).toHaveProperty('posNumber')
    return calculation
}


export const updateCalculation = async (calcId: number, status: number) => {
    const [mutationUpdateCalculation] = renderHook(useUpdateCalculationMutation)
    let calculation: any;
    let result;
    await act(async () => {
        try {
            result = await mutationUpdateCalculation({
                variables: {
                    id: calcId,
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
    calculation = _.get(result, 'data.calculation')

    expect(calculation).toHaveProperty('status', status)
    return calculation
}

export const validateWarehouseFinanceRecords = async (warehouseFinanceBefore: any, calculation: TCalculation, warehouseFinanceAfter: TWarehouseFinance) => {
    const calcFinance = _.toNumber(calculation.totalFinanceVP)
    const totalOwes = _.round(_.add(warehouseFinanceBefore.totalOwes, calcFinance), 2)
    const balance = _.round(_.add(warehouseFinanceBefore.balance, calcFinance), 2)
    expect(warehouseFinanceAfter.warehouse).toHaveProperty('id', `${calculation.warehouseId}`)
    expect(warehouseFinanceAfter).toHaveProperty('calculationId', Number(calculation.id))
    expect(warehouseFinanceAfter).toHaveProperty('owes', calcFinance)
    expect(warehouseFinanceAfter).toHaveProperty('balance', balance)
    expect(warehouseFinanceAfter).toHaveProperty('totalOwes', totalOwes)
}

export const validateWarehouseItemsRecords = async (warehouseItemBefore: TWarehouseItemInfo[], calculation: TCalculation, warehouseItemAfter: TWarehouseItemInfo[]) => {
    (calculation as any).items.every((item: any) => {
        const startItem = warehouseItemBefore.find((i: TWarehouseItemInfo) => +item.item.id === +_.get(i, 'item.id'))
        const finalItem = warehouseItemAfter.find((i: TWarehouseItemInfo) => +item.item.id === +_.get(i, 'item.id'))
        const quantity = item.quantity
        const finance = item.financeFinalVP
        const price = _.round(_.divide(finance, quantity), 2)
        expect(quantity).toBe(+_.get(finalItem, 'warehouseItem.quantityTransactionOwes', 0))
        expect(price).toBe(+_.get(finalItem, 'warehouseItem.priceTransaction', 0))

        const calcQuantity = _.round(_.add(+_.get(startItem, 'warehouseItem.quantityOnStack', 0), quantity), 3)
        const quantityOnStack = +_.get(finalItem, 'warehouseItem.quantityOnStack', 0)
        expect(calcQuantity).toBe(quantityOnStack);

        const calcOwesQty = _.round(_.add(+_.get(startItem, 'warehouseItem.quantityTotalOwes', 0), quantity), 3)
        const quantityTotalOwes = +_.get(finalItem, 'warehouseItem.quantityTotalOwes', 0)
        expect(calcOwesQty).toBe(quantityTotalOwes);

        const calcFinanceOnStack = _.round(_.add(+_.get(startItem, 'warehouseItem.financeOnStack', 0), finance), 3)
        const financeOnStack = +_.get(finalItem, 'warehouseItem.financeOnStack', 0)
        expect(calcFinanceOnStack).toBe(financeOnStack);

        const calcFinanceTotalOwes = _.round(_.add(+_.get(startItem, 'warehouseItem.financeTotalOwes', 0), finance), 3)
        const financeTotalOwes = +_.get(finalItem, 'warehouseItem.financeTotalOwes', 0)
        expect(calcFinanceTotalOwes).toBe(financeTotalOwes);
    })
}




export const bookAndValidateCalculation = async (calculation:TCalculation)=> {
    const {BOOKED} = CONSTANT_CALCULATION.STATUS
    const itemsIds = (calculation as any).items.map((i: any) => i.item.id as string)
    let warehouseFinanceBefore: any = await getLastWarehouseFinance(`${calculation.warehouseId}`)
    let warehouseItemsBefore = await getWarehouseItemStates(`${calculation.warehouseId}`, itemsIds)
    !warehouseFinanceBefore && (warehouseFinanceBefore = {
        owes: 0,
        claims: 0,
        balance: 0,
        totalOwes: 0,
        totalClaims: 0
    } as any)
    warehouseItemsBefore && warehouseItemsBefore.length === 0 && (warehouseItemsBefore = [{
        item: {
            id: itemsIds[0]
        },
        warehouseItem: {
            quantityTransactionOwes: 0,
            priceTransaction: 0,
            quantityOnStack: 0,
            quantityTotalOwes: 0,
            financeOnStack: 0,
            financeTotalOwes: 0
        },
    }])
    const _calculation = await updateCalculation(Number(calculation.id), BOOKED)
    const warehouseFinanceAfter: any = await getLastWarehouseFinance(`${_calculation.warehouseId}`)
    await validateWarehouseFinanceRecords(warehouseFinanceBefore, _calculation, warehouseFinanceAfter)
    const warehouseItemsAfter = await getWarehouseItemStates(`${_calculation.warehouseId}`, itemsIds)
    await validateWarehouseItemsRecords(warehouseItemsBefore, _calculation, warehouseItemsAfter)
}
