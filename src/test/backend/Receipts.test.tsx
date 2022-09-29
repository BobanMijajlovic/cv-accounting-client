import 'jest-extended'
import React             from 'react'
import Enzyme            from 'enzyme'
import Adapter           from 'enzyme-adapter-react-16'
import {
    insertAndCheckOneReceipt,
    receiptRandomItemsForTest,
    receiptRandomPaymentsForTest
}                        from "../helpers/receipts";
import {getTotalFinance} from "../../application/components/sale/util";
import _                 from 'lodash'
import {
    addDays,
    addMonths,
    differenceInCalendarDays,
}                        from "date-fns";
import { getItems }      from "../helpers";

Enzyme.configure({adapter: new Adapter()});

describe('Receipts test', () => {

 it('Generate receipts',async(done)=> {
     let date = new Date()
     const count = 100
     date.setDate(date.getDate()-count)
     const items = await getItems(10)
     for(let i=0;i<count;i++) {
         const _items = await receiptRandomItemsForTest(items,date)
         const totalReceiptFinance = await getTotalFinance(_items as any)
         const payments = await receiptRandomPaymentsForTest(totalReceiptFinance) as any
         await insertAndCheckOneReceipt({
             items:_items,
             payments
         })
         date = addDays(date,1)
     }
     done()
 })
})
