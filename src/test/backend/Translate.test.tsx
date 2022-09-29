import 'jest-extended'
import React                        from 'react'
import Enzyme                       from 'enzyme'
import Adapter                      from 'enzyme-adapter-react-16'
import * as _                       from 'lodash'
import {renderHook}                 from '../TestComponent';
import {translate}                  from '../base/translateBase'
import {act}                        from "react-dom/test-utils";
import {useInsertTranslateMutation} from "../../graphql/graphql";


Enzyme.configure({adapter: new Adapter()});



describe('translate test', () => {
    let mutationInsert: any;

    it('Generate translate ', async (done) => {
        mutationInsert = renderHook(useInsertTranslateMutation);
        const [mutationCall] = mutationInsert

        for (let i = 0; i < translate.length; i++) {
            await act(async () => {
                let result;
                try {
                    result = await mutationCall({
                        variables: {
                            data: translate[i]
                        }
                    })
                } catch (e) {
                    console.log(e)
                }

                expect(result).toHaveProperty('data')
                const res = _.get(result, 'data.translate')
                expect(res).toHaveProperty('key',translate[i].key)
            })
        }
            done()
        })
})