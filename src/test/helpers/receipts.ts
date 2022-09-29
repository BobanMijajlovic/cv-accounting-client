import {
    getItems,
}                                           from "./index";
import {TItem}                              from "../../graphql/type_logic/types";
import _                                    from "lodash";
import {renderHook}                         from "../TestComponent";
import {
    useInsertReceiptMutation,
    useInsertUpdateInvoiceItemMutation
} from "../../graphql/graphql";
import {act}                                from "react-dom/test-utils";

export const receiptRandomItemsForTest= async (items: TItem[],date: Date)=> {
    return items.map((item: TItem,index)=> {
        const percentValue = !!_.random(0,1) // 0 - discountValue, 1 - discountPercent
        const discountEx = _.random(0,1000)
        const discount = percentValue ? { value : _.random(0,100)} : {percent: _.random(0,99)}
        return Object.assign({
            quantity:  _.round(_.random(1,35,true),2),
            price: _.toNumber(item.vp),
            itemId: Number(item.id),
            date
        },discountEx > 1001 ? {discount:discount} : {})
    })
}

export const receiptRandomPaymentsForTest = async (totalReceipt: number)=> {
    let payed = 0
    const payments = []
    while(totalReceipt > payed) {
        const res = _.round(_.subtract(totalReceipt,payed),2)
        let value = _.round(_.random(0,res,true),2)
        value = res < 150 || payments.length > 1 ? res : value
        payments.push({
            type: _.random(0,2),
            value: value
        })
        payed = _.round(_.add(payed,value),2)
    }
    return payments
}

const validateReceiptItems = async (receiptItemsBefore:any,receiptItemsAfter:any)=> {
    receiptItemsAfter.every((item: any)=> {
        const _item = receiptItemsBefore.find((i:any)=> Number(i.itemId) === Number(item.itemId))
        expect(item).toHaveProperty('quantity',_item.quantity)
        expect(item).toHaveProperty('price',_item.price)
    })
}



export const insertAndCheckOneReceipt = async (receiptData:any) => {
    const [mutationCall] = renderHook(useInsertReceiptMutation)
    let result = {};
    await act(async () => {
        try {
            result = await mutationCall({
                variables: {
                    data: receiptData
                }
            })
        } catch (e) {
            console.log(e)
        }
    })

    expect(result).toHaveProperty('data')
    const receipt = _.get(result,'data.receipt')
    expect(receipt).toHaveProperty('items')
    expect(receipt).toHaveProperty('payments')
    expect(receipt.items).toBeArrayOfSize(receiptData.items.length)
    expect(receipt.payments).toBeArrayOfSize(receiptData.payments.length)
    await validateReceiptItems(receiptData.items,receipt.items)
}