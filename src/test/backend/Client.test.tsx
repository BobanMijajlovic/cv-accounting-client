import 'jest-extended'
import React     from 'react'
import Enzyme    from 'enzyme'
import Adapter   from 'enzyme-adapter-react-16'
import {
    renderHook,
    renderHookQuery
}                from '../TestComponent';
import {act}     from 'react-dom/test-utils';
import {
    useClientQuery,
    useInsertClientMutation,
    useUpdateClientMutation
}                from '../../graphql/graphql';
import *  as _   from 'lodash'
import {TClient} from "../../graphql/type_logic/types";

Enzyme.configure({adapter: new Adapter()});


describe('Client test', () => {
    let mutationInsert: any;
    let clientObject: TClient;

    it('client insert ', async (done) => {
        mutationInsert = renderHook(useInsertClientMutation)
        const [mutationCall] = mutationInsert
        const clientData = {
            accountCode: 'test290123',
            shortName: 'Test Client',
            fullName: 'Test Client',
            taxNumber: '987654290123',
            uniqueCompanyNumber: '98765290123',
            description: 'some description',
            addresses: [
                {
                    street: 'Jasicki put 9A',
                    zipCode: '37000',
                    city: 'Krusevac',
                    state: 'Serbia',
                    type: '3',
                    description: 'shop address'
                }
            ]
        }
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: clientData
                    }
                })
            } catch (e) {
                console.log(e)
            }

            const client = _.get(result, 'data.client')
            expect(client).toBeObject()
            expect(client).toHaveProperty('accountCode', clientData.accountCode)
            expect(client).toHaveProperty('taxNumber', clientData.taxNumber)
            expect(client).toHaveProperty('uniqueCompanyNumber', clientData.uniqueCompanyNumber)
            expect(client).toHaveProperty('shortName', clientData.shortName)
            expect(client).toHaveProperty('addresses')
            const addresses = _.get(client, 'addresses')
            expect(addresses).toBeArray()
            expect(addresses).toBeArrayOfSize(1)
            expect(addresses[0]).toHaveProperty('zipCode', '37000')
            expect(addresses[0]).toHaveProperty('street', 'Jasicki put 9A')
            clientObject = client
        })
        done()
    })

    it('Client update', async (done) => {
        mutationInsert = renderHook(useUpdateClientMutation)
        const [mutationCall] = mutationInsert
        const clientData = {
            accountCode: 'test-0003252',
            description: 'test-client-sale'
        }
        await act(async () => {
             let result;
             try {
                 result = await mutationCall({
                     variables: {
                         data: clientData,
                         id: Number(clientObject.id)
                     }
                 })
             }
             catch (e) {
                 console.log(e)
             }

             const client = _.get(result, 'data.client')
             expect(client).toHaveProperty('accountCode',clientData.accountCode)
             expect(client).toHaveProperty('description',clientData.description)
             expect(client).toHaveProperty('description', 'test-client-sale')
             clientObject = client
         })
        done()
    })


    it('Get Client', async (done) => {
        let query = renderHookQuery(useClientQuery,{
            variables:{
                id: Number(clientObject.id)
            }
        })
        await act(async () => {
            let result;
            try {
                result = await query
            }
            catch (e) {
                console.log(e)
            }

            const client = _.get(result, 'client')
            expect(client).toHaveProperty('accountCode',clientObject.accountCode)
            expect(client).toHaveProperty('description',clientObject.description)
            expect(client.fullName).toBeString()
            expect(new Date(client.createdAt)).toBeDate()


        })
        done()
    })



})
