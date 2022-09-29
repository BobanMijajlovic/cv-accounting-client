import 'jest-extended'
import React           from "react"
import Enzyme, {mount} from 'enzyme'
import Adapter         from 'enzyme-adapter-react-16';
import {TestComponent} from '../TestComponent';
import {act}           from "react-dom/test-utils";
import *  as _         from 'lodash'
import {
    useInsertCurrencyDefinitionMutation,
    useInsertCurrencyValueMutation
}                      from '../../graphql/graphql';

Enzyme.configure({adapter: new Adapter()});

describe('Currency test', () => {
    let mutationInsert: any;
    const renderHook = (hook: any, data?: any) => {
        let p: any
        const HookWrapper = () => {
            p = hook(data)
            return null
        };
        mount(<TestComponent render={HookWrapper}/>);
        return p;
    };

    it('Currency insert definition ', async (done) => {
        mutationInsert = renderHook(useInsertCurrencyDefinitionMutation)
        const [mutationCall] = mutationInsert
        const currencyDefinitionData = {
            name: 'US Dollar',
            short: 'USD',
            mark: '$'
        }

        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: currencyDefinitionData
                    }
                })
            } catch (e) {}
            const currency = _.get(result, 'data.currency')
            expect(currency).toBeObject()
            expect(_.get(currency, 'name')).toBe(currencyDefinitionData.name)
            expect(_.get(currency, 'short')).toBe(currencyDefinitionData.short)
            expect(_.get(currency, 'mark')).toBe(currencyDefinitionData.mark)
        })
        done()
    })

    it('Currency insert value ', async (done) => {
        mutationInsert = renderHook(useInsertCurrencyValueMutation)
        const [mutationCall] = mutationInsert
        const currencyValueData = {
            date: new Date().toLocaleString(void (0), {dateStyle: 'short', timeStyle: 'short'} as any),
            exchange: 101.00,
            currencyDefinitionId: 1
        }

        await act(async () => {
            let result;
            try {
                result = await mutationCall({
                    variables: {
                        data: currencyValueData
                    }
                })
            } catch (e) {}
            const currency = _.get(result, 'data.currency')
            expect(currency).toBeObject()
            let date = _.get(currency, 'date')
            date = new Date(date).toLocaleString(void (0), {dateStyle: 'short', timeStyle: 'short'} as any)
            expect(date).toBe(currencyValueData.date)
            expect(_.get(currency, 'exchange')).toBe(currencyValueData.exchange)
            expect(_.get(currency, 'currencyDefinition.short')).toBe('USD')
            expect(_.get(currency, 'currencyDefinition.mark')).toBe('$')
        })
        done()
    })

})
