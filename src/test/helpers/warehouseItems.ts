import {TWarehouseItemInfo} from "../../graphql/type_logic/types";
import _                    from 'lodash'

export interface IWarehouseItemData {
    itemId: number | string
    price: number,
    quantity: number
}

export interface IWarehouseItemChanges {
    customerId: string | number
    warehouseId: string | number
    calculationId: string | number
    items: IWarehouseItemData[]
}

const checkItemCalculation = (startItem: TWarehouseItemInfo = {}, finalItem: TWarehouseItemInfo, changes: IWarehouseItemData, direction: boolean) => {
    const quantity = +changes.quantity
    const price = +changes.price
    const finance = _.round(quantity * price, 2)
    /** must be quantity we sent */
    if (direction) {
        expect(quantity).toBe(+_.get(finalItem, 'warehouseItem.quantityTransactionOwes', 0))
    } else {
        expect(quantity).toBe(+_.get(finalItem, 'warehouseItem.quantityTransactionClaims', 0))
    }
    expect(price).toBe(+_.get(finalItem, 'warehouseItem.priceTransaction', 0))

    let value = direction ? _.round(_.add(+_.get(startItem, 'warehouseItem.quantityOnStack', 0), quantity), 3) : _.round(_.subtract(+_.get(startItem, 'warehouseItem.quantityOnStack', 0), quantity), 3);
    const quantityOnStack = +_.get(finalItem, 'warehouseItem.quantityOnStack', 0)
    expect(value).toBe(quantityOnStack);

    value = direction ? _.round(_.add(+_.get(startItem, 'warehouseItem.quantityTotalOwes', 0), quantity), 3) : _.round(_.add(+_.get(startItem, 'warehouseItem.quantityTotalClaims', 0), quantity), 3);
    let finalValue = direction ? +_.get(finalItem, 'warehouseItem.quantityTotalOwes', 0) : +_.get(finalItem, 'warehouseItem.quantityTotalClaims', 0)
    expect(value).toBe(finalValue);

    value = direction ? _.round(_.add(+_.get(startItem, 'warehouseItem.financeOnStack', 0), finance), 2) : _.round(_.subtract(+_.get(startItem, 'warehouseItem.financeOnStack', 0), finance), 2);
    const financeOnStack = +_.get(finalItem, 'warehouseItem.financeOnStack', 0)
    expect(value).toBe(financeOnStack);

    value = direction ? _.round(_.add(+_.get(startItem, 'warehouseItem.financeTotalOwes', 0), finance), 2) : _.round(_.add(+_.get(startItem, 'warehouseItem.financeTotalClaims', 0), finance), 2);
    finalValue = direction ? +_.get(finalItem, 'warehouseItem.financeTotalOwes', 0) : +_.get(finalItem, 'warehouseItem.financeTotalClaims', 0)
    expect(value).toBe(finalValue);

    const priceStack = _.round(_.divide(financeOnStack, quantityOnStack), 2)
    expect(priceStack).toBe(+_.get(finalItem, 'warehouseItem.priceStack', 0))

}

export const validateRecords = (startItems: TWarehouseItemInfo[], endItems: TWarehouseItemInfo[], entryChanges: IWarehouseItemChanges, direction: boolean) => {

    /** all items in entry changes must exists in endItems */
    entryChanges.items.every(x => {
        const startValue = startItems.find((i: TWarehouseItemInfo) => +x.itemId === +_.get(i, 'item.id'))
        /** start value do not need to exists*/
        const finalValue = endItems.find((i: TWarehouseItemInfo) => +x.itemId === +_.get(i, 'item.id'))
        expect(finalValue).toBeObject()
        expect(finalValue?.warehouseId).toBe(entryChanges.warehouseId)
        checkItemCalculation(startValue, finalValue as TWarehouseItemInfo, x, direction)
    })

}
