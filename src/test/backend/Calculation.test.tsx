import 'jest-extended'
import React                    from 'react'
import Enzyme                   from 'enzyme'
import Adapter                  from 'enzyme-adapter-react-16'
import {
    TCalculation,
    TItem,
    TTax
}                               from '../../graphql/type_logic/types';
import {
    addMonths,
    differenceInCalendarDays
}                               from 'date-fns'
import {
    calculationRandomForTest,
    calculationRandomItemsForTest,
    insertAndCheckOne,
    insetItemAndCheck,
    updateCalculation,
    validateWarehouseFinanceRecords,
    validateWarehouseItemsRecords
}                               from '../helpers/calculation';
import _                        from 'lodash'
import { CONSTANT_CALCULATION } from '../../application/constants';
import {
    getCalculations,
    getItems,
    getLastWarehouseFinance,
    getTaxes,
    getWarehouseItemStates
}                               from '../helpers';

Enzyme.configure( { adapter : new Adapter() } );

jest.setTimeout( 100000 );


describe( 'Calculation test', () => {
    let calculationObject : TCalculation;
    let calculations = [] as TCalculation[]
    let date = new Date()
    date.setDate( date.getDate() - 35 )
    const count = differenceInCalendarDays( addMonths( date, 1 ), date )
    const { BOOKED } = CONSTANT_CALCULATION.STATUS
    let taxes = [] as TTax[]
    let _items = [] as TItem[]

    it( 'Calculation insert for 1 month', async ( done ) => {
        taxes = await getTaxes()
        _items = await getItems( 15 )
        for ( let i = 0; i < count; i++ ) {
            const amount = _.random( 0, 10 ) > 6 ? _.subtract( date.getDate(), _.random( 0, 15 ) ) : _.add( date.getDate(), _.random( 0, 14 ) )
            date.setDate( amount )
            const items = await calculationRandomItemsForTest( _items )
            const calculationData = await calculationRandomForTest( date, items, taxes )
            const calculation = await insertAndCheckOne( date, calculationData )
            const calcItemData = await items.map( item => {
                return {
                    ..._.omit( item, [ 'taxId' ] )
                }
            } )
            for ( let i = 0; i < calcItemData.length; i++ ) {
                await insetItemAndCheck( calcItemData[i], Number( calculation.id ) )
            }
        }
        done()
    } )

    it( 'Fetch calculations', async ( done ) => {
        calculations = await getCalculations( 10 )
        done()
    } )

    it( 'Book calculation', async ( done ) => {
        for ( let i = 0; i < calculations.length; i++ ) {
            let calculation = calculations[i]
            const itemsIds = ( calculation as any ).items.map( ( i : any ) => i.item.id as string )
            let warehouseFinanceBefore : any = await getLastWarehouseFinance( `${ calculation.warehouseId }` )
            let warehouseItemsBefore = await getWarehouseItemStates( `${ calculation.warehouseId }`, itemsIds )
            !warehouseFinanceBefore && ( warehouseFinanceBefore = {
                owes : 0,
                claims : 0,
                balance : 0,
                totalOwes : 0,
                totalClaims : 0
            } as any )
            warehouseItemsBefore && warehouseItemsBefore.length === 0 && ( warehouseItemsBefore = [ {
                item : {
                    id : itemsIds[0]
                },
                warehouseItem : {
                    quantityTransactionOwes : 0,
                    priceTransaction : 0,
                    quantityOnStack : 0,
                    quantityTotalOwes : 0,
                    financeOnStack : 0,
                    financeTotalOwes : 0
                }
            } ] )
            calculation = await updateCalculation( Number( calculation.id ), BOOKED )
            const warehouseFinanceAfter : any = await getLastWarehouseFinance( `${ calculation.warehouseId }` )
            await validateWarehouseFinanceRecords( warehouseFinanceBefore, calculation, warehouseFinanceAfter )
            const warehouseItemsAfter = await getWarehouseItemStates( `${ calculation.warehouseId }`, itemsIds )
            await validateWarehouseItemsRecords( warehouseItemsBefore, calculation, warehouseItemsAfter )
        }
        done()
    } )


} )




