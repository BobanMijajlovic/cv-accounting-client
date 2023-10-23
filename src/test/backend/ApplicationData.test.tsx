import 'jest-extended'
import React                              from 'react'
import Enzyme                             from 'enzyme'
import Adapter                            from 'enzyme-adapter-react-16'
import {renderHook}                       from '../TestComponent';
import {act}                              from 'react-dom/test-utils';
import *  as _                            from 'lodash'
import {CONSTANT_MODEL}                   from '../../application/constants';
import {guid}                             from '../../application/utils/Utils';
import {useInsertApplicationDataMutation} from '../../graphql/graphql';

Enzyme.configure({adapter: new Adapter()});


describe('Application data test', () => {
  let mutationInsert: any;

  it('application data insert ', async (done) => {
    mutationInsert = renderHook(useInsertApplicationDataMutation)
    const [mutationCall] = mutationInsert
    const applicationData =[
      {
        key: CONSTANT_MODEL.APPLICATION_KEYS.BANK_DATA,
        valueJSON: {
          id: guid(),
          name: 'RAIFFEISEN BANKA',
        }
      },
      {
        key: CONSTANT_MODEL.APPLICATION_KEYS.BANK_DATA,
        valueJSON: {
          id: guid(),
          name: 'CREDIT AGRICOLE BANKA',
        }
      }
    ]
    for(let i=0;i<applicationData.length;i++) {
      await act(async () => {
        let result;
        try {
          result = await mutationCall({
            variables: {
              data: {
                key: applicationData[i].key,
                value: applicationData[i].valueJSON.name
              }
            }
          })
        } catch (e) {}
        const appData = _.get(result, 'data.applicationData')
        expect(appData).toBeObject()
        expect(appData).toHaveProperty('key',CONSTANT_MODEL.APPLICATION_KEYS.BANK_DATA)
        expect(appData).toHaveProperty('value',applicationData[i].valueJSON.name)
      })
    }
    done()
  })

})
