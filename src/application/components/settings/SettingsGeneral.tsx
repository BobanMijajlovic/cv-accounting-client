import React, {
  useEffect,
  useMemo,
  useState
} from 'react'
import { Select }                       from '../../../components/basic/withState'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                                       from '../../utils/LocalStorage'
import { translationGetLanguage }       from '../../../components/Translation/useTranslation'
import DateFormat                       from './general/DateFormat'
import { APPLICATION_DEFAULT_LANGUAGE } from '../../constants'
import ClientInfoDetails                from './general/client/ClientInfoDetails'
import Units                            from './general/Units'
import {toBoolean}                      from 'validator'
import ConditionalRendering             from '../../../components/Util/ConditionalRender'

const SettingsGeneral = () => {
  const [language, setLanguage] = useState(() => {
    const data = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
    if (data && data.lang) {
      return data.lang
    }
    return APPLICATION_DEFAULT_LANGUAGE
  })

  useEffect(() => {
    if (language.length !== 0) {
      const storageData = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
      LocalStorage.saveData({
        ...storageData,
        lang:language
      }, STORAGE_APPLICATION_SETTINGS)
    }
  }, [language])

  const handlerChange = (e: any) => {
    const language = e.target.value
    translationGetLanguage(language).then()
    setLanguage(e.target.value)
  }
 
  return (
    <div className={'d-flex flex-row hw-settings-general'}>
      <ClientInfoDetails/>
      <div className={'d-flex justify-content-start align-center flex-1 py-2'}>
        <div className={'hw-select-input pr-3'}>
          <Select
                  label={'Languages'}
                  options={[
                    {
                      label:'Choose language',
                      value:''
                    },
                    {
                      label:'English',
                      value:'en'
                    },
                    {
                      label:'Serbian',
                      value:'sr'
                    }
                  ]}
                  value={language}
                  onChange={handlerChange}
          />
        </div>
        <DateFormat/>
        <Units />
      </div>
    </div>
  )
}
export default SettingsGeneral
