import 'jest-extended'
import React                          from "react"
import Enzyme                         from 'enzyme'
import Adapter                        from 'enzyme-adapter-react-16';
import { renderHook }                 from "../TestComponent";
import { act }                        from "react-dom/test-utils";
import *  as _                        from 'lodash'
import { get as _get }                from 'lodash'
import { useInsertCustomersMutation } from "../../graphql/graphql";
import { base }                       from '../base/customerBase'
import { getBanks }                   from "../helpers";

Enzyme.configure({adapter: new Adapter()});

const genTax = () => {
    const str = `${_.random(10000, 100000000, false)}${_.random(10000, 100000000, false)}${_.random(10000, 100000000, false)}`
    return str.substr(0, 8)
}

const generateCustomer =  (banks: any,count: number) => {
    let array = []
    const rndPos = _.random(1, 50) * 2000
    const rnd = _.random(10, 100) * 10000
    for (let i = 0; i < count; i++) {
        const rndIndex = _.random(0, 1400)
        array.push({
            shortName: base[rndIndex].shortName,
            fullName: base[rndIndex].fullName,
            description: base[rndIndex].description,
            uniqueCompanyNumber: `${rnd + rndPos + i}`,
            taxNumber: `${rnd + rndPos +  i}`,
            addresses: [
                {
                    ...base[rndIndex].addresses[0]
                }
            ],
            banks: [
                {
                    account: `${_.random(1000,9999)} ${_.random(1000,9999)} ${_.random(1000,9999)} ${_.random(1000,9999)}`,
                    bankId: Number(banks[_.random(0,banks.length-1)].id)
                }
            ]
        })
    }
    return array
}

jest.setTimeout(55000)

describe('Customer test', () => {
    let mutationInsert: any;

    it('generate customers 1.5k', async (done) => {
        mutationInsert= renderHook(useInsertCustomersMutation)
        const [mutationCall] = mutationInsert
        const banks = await getBanks()
        const customerArray = generateCustomer(banks,1500)
        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: customerArray
                    }
                })
            } catch (e) {}
            expect(result).toHaveProperty('data')
            const res = _get(result, 'data.customers')
            expect(res).toBe("OK")
        })
        done()
    })

})
