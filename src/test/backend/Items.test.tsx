import 'jest-extended'
import React                      from 'react'
import Enzyme                     from 'enzyme'
import Adapter                    from 'enzyme-adapter-react-16'
import * as _                     from 'lodash'
import { renderHook }             from '../TestComponent';
import { useInsertItemsMutation } from '../../graphql/graphql'
import { TItem }                  from '../../graphql/type_logic/types';
import { base }                   from '../base/artBase'
import { act }                    from "react-dom/test-utils";
import {
    getCategories,
    getCustomers
} from "../helpers";

Enzyme.configure({adapter: new Adapter()});


describe('Items test', () => {
    let mutationInsert: any;
    let lastItem: TItem = {}

    it('Generate items 3k', async (done) => {
        const customers = await getCustomers(40)
        mutationInsert = renderHook(useInsertItemsMutation);
        const categories = await getCategories(20)
        const [mutationCall] = mutationInsert
        const items: TItem[] = []
        const rndStr = _.random(3000, 1200000)
        const codeRnd = _.random(10, 100) * 3000
        for (let i = 0; i < 3000; i++) {
            let price = _.round(_.random(10, 1200, true), 2)
            while (price > 850) {
                price = _.round(_.random(10, 1200, true), 2)
            }
            items.push({
                type: Math.floor(Math.random() * 10) + 1,
                barCode: `${base[i].barCode}${rndStr}`,
                code: codeRnd + i,
                shortName: `${base[i].description}`,
                fullName: `${base[i].description}-${rndStr} - long name`,
                taxId: _.random(1, 2),
                uom: _.random(1, 2),
                vp: _.round(_.divide(_.multiply(price, 85), 100), 2),
                mp: price,
                categoryId: Number(categories[_.random(0,categories.length -1)].id),
                itemSuppliers: [{
                    code: i + 1,
                    supplierId: Number(customers[_.random(0,customers.length - 1)].id)
                }]
            } as any)
        }

        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: items
                    }
                })
            } catch (e) { console.log(e) }

            expect(result).toHaveProperty('data')
            const res = _.get(result, 'data.items')
            expect(res).toBe("OK")
        })
        done()
    })

})
