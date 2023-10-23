import 'jest-extended'
import React                         from "react"
import Enzyme                        from 'enzyme'
import Adapter                       from 'enzyme-adapter-react-16';
import {renderHook}                  from "../TestComponent";
import {act}                         from "react-dom/test-utils";
import {useInsertWarehousesMutation} from "../../graphql/graphql";
import {TWarehouse}                  from "../../graphql/type_logic/types";
import {get as _get}                 from 'lodash'

Enzyme.configure({adapter: new Adapter()});

jest.setTimeout(15000)

describe('Warehouse test', () => {
    let mutationInsert: any
    it('Generate 10 warehouses', async (done) => {
        mutationInsert = renderHook(useInsertWarehousesMutation);
        const [mutationCall] = mutationInsert
        const warehouses: TWarehouse[] = []
        for (let i = 1; i < 11; i++) {
            const num = i + 1
            warehouses.push({
                name: `Warehouse ${num}`,
                description: ` some description - ${num}`
            } as any)
        }
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: warehouses
                    }
                })
            } catch (e) {
                console.log(e)
            }
            expect(result).toHaveProperty('data')
            const res = _get(result, 'data.warehouses')
            expect(res).toBe("OK")
        })
        done()
    })


})
