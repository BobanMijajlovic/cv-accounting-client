import 'jest-extended'
import React   from "react"
import Enzyme  from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {
  renderHook,
  renderHookQuery,
}              from '../TestComponent';
import {act}   from "react-dom/test-utils";
import *  as _ from 'lodash'
import {
  useGetValidTaxQuery,
  useInsertTaxDefinitionMutation,
  useInsertTaxValueMutation
}              from '../../graphql/graphql';

Enzyme.configure({adapter: new Adapter()});


describe('Tax test', () => {
  let mutationInsert: any;


  it('tax values simple  insert ', async (done) => {
    mutationInsert = renderHook(useInsertTaxDefinitionMutation)
    const [mutationCall] = mutationInsert
    const taxData = [
      {
        name: 'Tax A',
        short: 'Tax A',
        mark: 'A'
      },
      {
        name: 'Tax B',
        short: 'Tax B',
        mark: 'B'
      },
      {
        name: 'Tax C',
        short: 'Tax C',
        mark: 'C'
      }
    ]

    await act(async()=>{
      let result;
      try {
        result = await mutationCall({
          variables: {
            data: taxData
          }
        })
      } catch (e) {}
      const def = _.get(result, 'data.definition')
      expect(def).toBeArray()
      expect(def).toBeArrayOfSize(3)
      expect(_.get(def[0],'mark')).toBe('A')
      expect(_.get(def[1],'mark')).toBe('B')
    })

    done()
  })




  it('tax values simple  insert values', async (done) => {
    mutationInsert = renderHook(useInsertTaxValueMutation)
    const [mutationCall] = mutationInsert
    const currDate =  new Date().toISOString()
    const taxData = {
      date:currDate,
      values: [
        {
          taxId: 1,
          value: 36.00
        },
        {
          taxId: 2,
          value: 15.00
        },
        {
          taxId: 3,
          value: 0.00
        }
      ]
    }

    await act(async () =>{
      let result;
      try {
        result = await mutationCall({
          variables: {
            data: taxData
          }
        })
      } catch (e) {}
      const taxes = _.get(result, 'data.tax')
      expect(taxes).toBeArray()
      expect(taxes).toBeArrayOfSize(3)
      expect(taxes[0]).toHaveProperty('mark','A')
      expect(taxes[1]).toHaveProperty('mark','B')
      expect(taxes[2]).toHaveProperty('mark','C')
      expect(taxes[0]).toHaveProperty('values')
      expect(taxes[0].values).toBeArray()
      expect(taxes[0].values[0]).toHaveProperty('value',36)
    })
    done()
  })

  it('get last valid tax',async (done)=>{
    let query = renderHookQuery(useGetValidTaxQuery, {
      variables: {
        date: new Date()
      }
    })
    let result
    await act(async () => {
      result = await query
    })
    const vats = _.get(result, 'validTax')
    expect(vats).toBeArray()
    expect(vats).toBeArrayOfSize(3)
    done()
  })



})
