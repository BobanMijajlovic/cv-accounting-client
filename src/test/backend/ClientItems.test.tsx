import 'jest-extended'
import React                                from "react"
import Enzyme                               from 'enzyme'
import Adapter                              from 'enzyme-adapter-react-16';
import {renderHook}                         from "../TestComponent";
import * as _                               from 'lodash'
import {useTestInsertItemsByClientMutation} from "../../graphql/graphql";
import {TItem}                              from "../../graphql/type_logic/types";
import {base}                               from '../base/artBase'
import {act}                                from "react-dom/test-utils";

Enzyme.configure({adapter: new Adapter()});


const generateItems = (count: number) => {
    const items: TItem[] = []
    const rndStr = _.random(3000, 12000000)
    const codeRnd = _.random(10, 100) * 10000
    for (let i = 0; i < count; i++) {
        let price = _.round(_.random(1, 99999, true), 2)
        while (price > 5000) {
            price = _.round(_.random(1, 99999, true), 2)
        }
        let rnd = i > 4970 ? _.random(1, 4970) : i
        let barCode = Number(`${base[rnd].barCode}${rndStr}`)+i
        items.push({
            type: Math.floor(Math.random() * 10) + 1,
            barCode: `${barCode}`,
            code: codeRnd + i,
            shortName: `${base[rnd].description}`,
            fullName: `${base[rnd].description}-${rndStr} - long name`,
            taxId: _.random(1, 2),
            uom: _.random(1, 2),
            mp: _.round(_.subtract(price,100),2),
            vp: price,
            itemSuppliers: [{
                code: i + 1,
                supplierId: _.random(1, 1400)
            }]
        } as any)
    }
    return items
}


jest.setTimeout(170000)

describe('Client test', () => {
    let mutationInsert: any;

    it('Generate 10k items of  10 client', async (done) => {
        mutationInsert = renderHook(useTestInsertItemsByClientMutation)
        const [mutationCall] = mutationInsert
        const items = generateItems(10000)
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
