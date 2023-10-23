import 'jest-extended'
import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    TItem,
    TTax,
    TWarehouse
}              from '../../graphql/type_logic/types';
import {
    addDays,
    differenceInCalendarDays
}              from 'date-fns';
import {
    getItems,
    getTaxes,
    getWarehouses
}              from '../helpers';
import {
    insertReturnInvoiceAndCheckOne,
    insertReturnInvoiceFooterAndCheck,
    insetReturnInvoiceItemAndCheck,
    returnInvoiceFooterDueDate,
    returnInvoiceFooterRandomTest,
    returnInvoiceRandomItemsForTest,
    saveReturnInvoiceAndValidate
}              from '../helpers/returnInvoice';

Enzyme.configure( { adapter : new Adapter() } );

jest.setTimeout( 100000 );

describe( 'Return invoice test', () => {


    let date = new Date()
    const numRecords = 5
    date.setDate( date.getDate() - numRecords )
    let warehouses = [] as TWarehouse[]
    const count = differenceInCalendarDays( addDays( date, numRecords ), date )
    let taxes = [] as TTax[]
    let _items = [] as TItem[]


    it( 'Fetch items/taxes', async ( done ) => {
        taxes = await getTaxes()
        _items = await getItems( 15 )
        warehouses = await getWarehouses( 3 )
        done()
    } )


    for ( let i = 0; i < count; i++ ) {
        let newDate = new Date( date )

        it( 'Return invoice  insert', async ( done ) => {
            let invoice = await insertReturnInvoiceAndCheckOne( newDate )
            let invoiceItemData = await returnInvoiceRandomItemsForTest( _items, warehouses )
            invoiceItemData = await invoiceItemData.map( x => {
                return {
                    ...x,
                    useDiscountDefault : 0
                }
            } );
            const invoiceId = Number( invoice.id )
            for ( let i = 0; i < invoiceItemData.length; i++ ) {
                invoice = await insetReturnInvoiceItemAndCheck( invoiceItemData[i], invoiceId )
            }
            let invoiceData = await returnInvoiceFooterRandomTest();
            invoice = await insertReturnInvoiceFooterAndCheck( `${ invoiceId }`, invoiceData )
            const dueDateData = await returnInvoiceFooterDueDate( newDate, invoice );
            invoice = await insertReturnInvoiceFooterAndCheck( `${ invoiceId }`, dueDateData )
            await saveReturnInvoiceAndValidate( invoice )
            done()
        } )
        date = addDays( date, 1 )
    }

} )