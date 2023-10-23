import 'jest-extended'
import React        from 'react'
import Enzyme       from 'enzyme'
import Adapter      from 'enzyme-adapter-react-16'
import {renderHook} from '../TestComponent';
import {act}        from 'react-dom/test-utils';
import {TCustomer}  from "../../graphql/type_logic/types";
import {
    CONSTANT_ADDRESS,
    CONSTANT_CONTACT
}                   from "../../application/constants";
import {
    useInsertCustomerMutation,
    useUpdateCustomerMutation
}                   from "../../graphql/graphql";
import _            from 'lodash'


Enzyme.configure({adapter: new Adapter()});


describe('Customers test', () => {
    let mutationInsert: any;
    let customerObject: TCustomer;
    const customerData = {
        shortName: 'test-sale',
        fullName: 'customer-test-sale',
        taxNumber: '2254567892',
        uniqueCompanyNumber: '25785214',
        description: 'customer description',
        contacts: [
            {
                type: CONSTANT_CONTACT.TYPES.MOBILE,
                value: '063555994'
            }
        ],
        addresses: [
            {
                type: CONSTANT_ADDRESS.TYPES.SHOP,
                street: 'some street',
                zipCode: '37000',
                city: 'Krusevac',
                state: 'Serbia'
            }
        ]
    }
    it('Customer insert', async (done) => {
        mutationInsert = renderHook(useInsertCustomerMutation)
        const [mutationCall] = mutationInsert

        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: customerData
                    }
                })


            } catch (e) {

            }
                expect(result).toHaveProperty('data')
                const customer = _.get(result, 'data.customer')
                expect(customer).toHaveProperty('shortName', customerData.shortName)
                expect(customer).toHaveProperty('fullName', customerData.fullName)
                expect(customer.contacts).toBeArray()
                expect(customer.contacts).toBeArrayOfSize(1)
                const contacts = customer.contacts
                expect(contacts[0]).toHaveProperty('type',customerData.contacts[0].type)
                customerObject = customer


        })

        done()
    })

    it('Customer not valid tax number', async (done) => {
        mutationInsert = renderHook(useInsertCustomerMutation)
        const [mutationCall] = mutationInsert
        const _cData = {
            ...customerData,
            taxNumber: '11'
        }
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: _cData
                    }
                })

            } catch (e) {

                const msg = _.get(e, 'message')
                expect(msg).toBe('GraphQL error: Validation error: Tax number is not valid')
            }


        })
        done()
    })
    it('Customer not valid unique Company Number', async (done) => {
        mutationInsert = renderHook(useInsertCustomerMutation)
        const [mutationCall] = mutationInsert
        const _cData = {
            ...customerData,
            uniqueCompanyNumber: '333'
        }
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: _cData
                    }
                })

            } catch (e) {

                const msg = _.get(e, 'message')
                expect(msg).toBe( 'GraphQL error: Validation error: Customer Company Number is not valid')
            }


        })
        done()
    })
    it('Customer update', async (done) => {
        mutationInsert = renderHook(useUpdateCustomerMutation)
        const [mutationCall] = mutationInsert
        const _cData = {
            fullName: 'customer-test-update-sale'
        }
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: _cData,
                        id: Number(customerObject.id)

                    }
                })

            } catch (e) {

            }
            expect(result).toHaveProperty('data')
            const customer = _.get(result, 'data.customer')
            expect(customer).toHaveProperty('fullName', _cData.fullName)

        })
        done()
    })

})