import 'jest-extended'
import React        from 'react'
import Enzyme       from 'enzyme'
import Adapter      from 'enzyme-adapter-react-16'
import {act}        from "react-dom/test-utils";
import {renderHook} from '../TestComponent';
import {
    useInsertItemMutation,
    useUpdateItemMutation
}                   from "../../graphql/graphql";
import * as _ from "lodash";
import {TItem}      from "../../graphql/type_logic/types";


Enzyme.configure({adapter: new Adapter()});


describe('Items test', () => {
    let mutationInsert: any;
    let itemObject: TItem;
    let itemObj = {
        type: Math.floor(Math.random() * 10) + 1,
        barCode: '589911112',
        code: 589911112,
        shortName: 'test-item-sale12',
        fullName: 'test-item-sale-long12',
        taxId: _.random(1, 2),
        uom: _.random(1, 2),
        mp: 2022,
        vp: 2222,
        itemSuppliers: [{
            code: 1,
            supplierId: _.random(1, 1400)
        }]
    }
    it('insert item', async (done) => {
        mutationInsert = renderHook(useInsertItemMutation);
        const [mutationCall] = mutationInsert

        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: itemObj,

                    }
                })
            } catch (e) {


            }

            expect(result).toHaveProperty('data')
            const res = _.get(result, 'data.item')
            expect(res).toBeObject()
            expect(res).toHaveProperty('barCode', itemObj.barCode)
            expect(res).toHaveProperty('code', itemObj.code)
            expect(res).toHaveProperty('shortName', itemObj.shortName)
            expect(res).toHaveProperty('fullName', itemObj.fullName)
            expect(res).toHaveProperty('taxId', itemObj.taxId)
            expect(res).toHaveProperty('itemSuppliers')
            const itemSuppliers = _.get(res, 'itemSuppliers')
            expect(itemSuppliers).toBeArray()
            expect(itemSuppliers).toBeArrayOfSize(1)
            expect(itemSuppliers[0]).toHaveProperty('code', 1)
            expect(itemSuppliers[0]).toHaveProperty('supplier')
            expect(_.get(itemSuppliers[0], 'supplier')).toHaveProperty('id', `${itemObj.itemSuppliers[0].supplierId}`)
            itemObject = res
        })
        done()
    })


    it('insert item - barCode not valid', async (done) => {
        mutationInsert = renderHook(useInsertItemMutation);
        const [mutationCall] = mutationInsert
        itemObj.barCode = 'asbcea0d913218'
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: itemObj
                    }
                })
            } catch (e) {

                const msg = _.get(e, 'message')
                expect(msg).toBe('GraphQL error: Validation error: Bar code can consist only numbers !')
            }

        })
        done()
    })

    it('insert item - Item Code not valid', async (done) => {
        mutationInsert = renderHook(useInsertItemMutation);
        const [mutationCall] = mutationInsert
        itemObj.code = 'asbcea0d913218' as any
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: itemObj
                    }
                })
            } catch (e) {

                const msg = _.get(e, 'message')
                expect(msg).toBe('Network error: Response not successful: Received status code 400')
            }

        })
        done()
    })

    it('insert item - Short and full name are not define', async (done) => {
        mutationInsert = renderHook(useInsertItemMutation);
        const [mutationCall] = mutationInsert
        itemObj.shortName = void (0) as any
        itemObj.fullName = void (0) as any
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: itemObj
                    }
                })
            } catch (e) {


                const msg = _.get(e, 'message')
                expect(msg).toBe('Network error: Response not successful: Received status code 400')
            }

        })
        done()
    })

    it('insert item- Price is not define', async (done) => {
        mutationInsert = renderHook(useInsertItemMutation);
        const [mutationCall] = mutationInsert
        itemObj.vp = void (0) as any
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: itemObj
                    }
                })
            } catch (e) {

                const msg = _.get(e, 'message')
                expect(msg).toBe('Network error: Response not successful: Received status code 400')
            }
        })


        done()
    })

    it('item update - Price, Barcode, Code, Short Name', async (done) => {
        mutationInsert = renderHook(useUpdateItemMutation);
        const [mutationCall] = mutationInsert
        const itemUpdateData = {
            vp: 200.03,
            barCode: '99995552',
            code: 99995552,
            shortName: 'test-item-sale-update',
        }

        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: itemUpdateData,
                        id: Number(itemObject.id)
                    }
                })
            } catch (e) {
                console.log(e)
            }
              expect(result).toHaveProperty('data')
              const res = _.get(result, 'data.item')
              expect(res).toBeObject()
              expect(res).toHaveProperty('vp', itemUpdateData.vp)
              expect(res).toHaveProperty('barCode', itemUpdateData.barCode)
              expect(res).toHaveProperty('code', itemUpdateData.code)
              expect(res).toHaveProperty('shortName', itemUpdateData.shortName)


        })

        done()

    })


})