import {
    TInvoice,
    TItem,
    TReturnInvoice,
    TWarehouse,
    TWarehouseFinance,
    TWarehouseItemInfo
}                               from '../../graphql/type_logic/types';
import {
    getInvoiceExpenseFinanceMP,
    getInvoiceExpenseFinanceTax,
    getInvoiceFinanceAfterExpense,
    getInvoiceFinanceMP,
    getInvoiceFooterAdditionalExpenseFinance
} from '../../application/components/invoice/util';
import _                        from 'lodash';
import { renderHook }           from '../TestComponent';
import {
    useInsertReturnInvoiceMutation,
    useInsertUpdateInvoiceItemMutation,
    useUpdateReturnInvoiceMutation
}                               from '../../graphql/graphql';
import { act }                  from 'react-dom/test-utils';
import { invoiceRandomForTest } from './invoice';
import {
    getLastWarehouseFinance,
    getWarehouseItemStates
}                               from './index';
import { CONSTANT_INVOICE }     from '../../application/constants';


export const returnInvoiceFooterDueDate = async ( date : Date, invoice : TReturnInvoice ) => {
    const totalExpenseFinance = getInvoiceFooterAdditionalExpenseFinance( invoice.expense as any )
    const dueDateFinance = _.round( _.add( getInvoiceFinanceMP( invoice.items as any ), totalExpenseFinance ), 2 )
    /*  const dueDate = new Date()
     const amount = _.random(0,10) > 8 ? _.subtract(dueDate.getDate(),_.random(0,30)) :  _.add(dueDate.getDate(),_.random(0,14))
     dueDate.setDate(amount)*/
    return {
        footer : {
            dueDates : [
                {
                    dueDate : new Date( date ).toISOString(),
                    finance : dueDateFinance,
                }
            ],
        }
    }
}


export const returnInvoiceFooterRandomTest = async () => {
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
            ]
        }
    }
}


export const returnInvoiceRandomItemsForTest= async (items: TItem[],warehouses: TWarehouse[])=> {
    return items.map((item: TItem,index)=> {
        const percentValue = !!_.random(0,1) // 0 - discountValue, 1 - discountPercent
        const discountEx = _.random(0,1000)
        const discount = percentValue ? { value : _.random(0,100)} : {percent: _.random(0,99)}
        return Object.assign({
            quantity:  _.round(_.random(1,35,true),2),
            price: _.toNumber(item.mp),
            itemId: Number(item.id),
            warehouseId: Number(warehouses[0].id),
            useDiscountDefault : 0
        },discountEx > 999 ? {discount:discount} : {})
    })
}


export const insertReturnInvoiceFooterAndCheck = async ( id : string, invoiceData : any ) => {
    const [ mutationCall ] = renderHook( useUpdateReturnInvoiceMutation )
    let result = {};
    await act( async () => {
        try {
            result = await mutationCall( {
                variables : {
                    id : Number( id ),
                    data : invoiceData
                }
            } )
        } catch ( e ) {
            console.log( e )
        }
    } )
    expect( result ).toHaveProperty( 'data' )
    const returnInvoice = _.get( result, 'data.returnInvoice' )
    const { footer } = invoiceData
    if ( footer.dueDates && footer.dueDates.length !== 0 ) {
        expect( returnInvoice.dueDates ).toBeArrayOfSize( 1 )
        expect( returnInvoice ).toHaveProperty( 'dueDates' )
        expect( returnInvoice.dueDates[0] ).toHaveProperty( 'date' )
        expect( returnInvoice.dueDates[0] ).toHaveProperty( 'finance', footer.dueDates[0].finance )
    }
    if ( footer.additionalExpense && footer.additionalExpense.length !== 0 ) {
        const { expense } = returnInvoice
        expect( returnInvoice ).toHaveProperty( 'expense' )
        expect( returnInvoice.expense ).toBeArrayOfSize( 1 )
        expect( expense[0] ).toHaveProperty( 'items' )
        expect( expense[0].items ).toBeArrayOfSize( 1 )
        const { items } = expense[0]
        const { items : _items } = footer.additionalExpense[0]
        expect( items[0] ).toHaveProperty( 'taxId', Number( _items[0].taxId ) )
        expect( items[0] ).toHaveProperty( 'financeMP', Number( _items[0].financeMP ) )
    }
    return returnInvoice
}

export const insertReturnInvoiceAndCheckOne = async ( date : Date ) => {
    const [ mutationCall ] = renderHook( useInsertReturnInvoiceMutation )
    const invoiceData = await invoiceRandomForTest( date );
    let result = {};
    await act( async () => {
        try {
            result = await mutationCall( {
                variables : {
                    data : invoiceData
                }
            } )
        } catch ( e ) {
            console.log( JSON.stringify( e ) )
        }
    } )
    expect( result ).toHaveProperty( 'data' )
    const returnInvoice = _.get( result, 'data.returnInvoice' )
    const { header } = invoiceData
    expect( returnInvoice ).toHaveProperty( 'customer' )
    expect( returnInvoice ).toHaveProperty( 'flag', header.flag )
    const { customer } = returnInvoice
    expect( customer ).toHaveProperty( 'id', `${ header.customerId }` )
    return returnInvoice
}


export const insetReturnInvoiceItemAndCheck = async ( invoiceItemData : any, invoiceId : number ) => {
    const [ mutationCall ] = renderHook( useInsertUpdateInvoiceItemMutation )
    let result = {};
    await act( async () => {
        try {
            result = await mutationCall( {
                variables : {
                    id : 0,
                    additionalData : {
                        returnInvoiceId : invoiceId
                    },
                    data : invoiceItemData
                }
            } )
        } catch ( e ) {
            console.log( e )
        }
    } )

    expect( result ).toHaveProperty( 'data' )
    /*const invoice = _get(result, 'data.invoice')
     const {items} = invoice
     const item = items[items.length-1]
     expect(item).toHaveProperty('itemId',invoiceItemData.itemId)*/
}


export const updateReturnInvoice = async ( invId : number, status : number ) => {
    const [ mutationUpdateInvoice ] = renderHook( useUpdateReturnInvoiceMutation )
    let returnInvoice : any;
    let result;
    await act( async () => {
        try {
            result = await mutationUpdateInvoice( {
                variables : {
                    id : invId,
                    data : {
                        status
                    }
                }
            } )
        } catch ( e ) {
            console.log( e )
        }
    } )
    expect( result ).toHaveProperty( 'data' )
    returnInvoice = _.get( result, 'data.returnInvoice' )
    expect( returnInvoice ).toHaveProperty( 'status', status )
    return returnInvoice
}

export const saveReturnInvoiceAndValidate = async ( invoice : TInvoice | TReturnInvoice ) => {

    const { SAVED } = CONSTANT_INVOICE.STATUS
    const mergeDuplicatesItems = ( invoice.items || [] ).reduce( ( acc : any, item : any ) => {
        const _item = acc.find( ( x : any ) => x.itemId === item.id && x.warehouseId === item.warehouseId )
        if ( !_item ) {
            return [ ...acc, item ]
        }
        _item.quantity = _.round( _.add( _item.quantity, item.quantity ), 3 )
        return acc
    }, [] )
    let warehouseId = mergeDuplicatesItems[0].warehouseId
    const itemsIds = mergeDuplicatesItems.map((x:any)=> x.itemId as string)
    let warehouseFinanceBefore : any = await getLastWarehouseFinance(`${warehouseId}`)
    let warehouseItemsBefore = await getWarehouseItemStates(`${warehouseId}`, itemsIds)
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
    const returnInvoice = await updateReturnInvoice(Number(invoice.id),SAVED)
    warehouseId = `${returnInvoice.items[0].warehouseId}`
    const warehouseFinanceAfter: any = await getLastWarehouseFinance(warehouseId)
    await validateInvoiceWarehouseFinanceRecords(warehouseFinanceBefore, returnInvoice, warehouseFinanceAfter)
    const warehouseItemsAfter = await getWarehouseItemStates(warehouseId, itemsIds)
    await validateInvoiceWarehouseItemsRecords(warehouseItemsBefore, returnInvoice, warehouseItemsAfter)

}



export const validateInvoiceWarehouseFinanceRecords = async (warehouseFinanceBefore: any, invoice: TInvoice|TReturnInvoice, warehouseFinanceAfter: TWarehouseFinance) => {
    let invFinance = _.toNumber(invoice.totalFinanceVP)
    if(invoice.expense) {
        const externalFinanceVP = _.round(_.subtract(getInvoiceExpenseFinanceMP(invoice.expense as any),getInvoiceExpenseFinanceTax(invoice.expense as any)),2)
        invFinance = _.round(_.subtract(invFinance,externalFinanceVP),2)
    }
    const totalOwes = _.round(_.add(warehouseFinanceBefore.totalOwes, invFinance), 2)
    const balance = _.round(_.add(warehouseFinanceBefore.balance, invFinance), 2)
    expect(warehouseFinanceAfter.warehouse).toHaveProperty('id', `${(invoice.items as any)[0].warehouseId}`)
    expect(warehouseFinanceAfter).toHaveProperty('owes', invFinance)
    expect(warehouseFinanceAfter).toHaveProperty('balance', balance)
    expect(warehouseFinanceAfter).toHaveProperty('totalOwes', totalOwes)
}


export const validateInvoiceWarehouseItemsRecords = async (warehouseItemBefore: TWarehouseItemInfo[], invoice: TInvoice|TReturnInvoice, warehouseItemAfter: TWarehouseItemInfo[]) => {
    (invoice as any).items.every((item: any) => {
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

