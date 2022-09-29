import React, {
  useEffect,
  useState
}                                          from 'react'
import { FontAwesomeIcon }                 from '@fortawesome/react-fontawesome'
import { faCalendarAlt }                   from '@fortawesome/free-solid-svg-icons'
import {
  Radio,
  RadioGroup
}                                          from '../../../../components/Radio'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                                          from '../../../utils/LocalStorage'
import { APPLICATION_DEFAULT_DATE_FORMAT } from '../../../constants'

const DateFormat = () => {
  const [state, setState]: [string, (r: string)=> void] = useState(() => {
    const data = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
    if (data && data.dateFormat) {
      return data.dateFormat
    }
    return APPLICATION_DEFAULT_DATE_FORMAT
  })

  useEffect(() => {
    if (state.length !== 0) {
      const storageData = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
      LocalStorage.saveData({
        ...storageData,
        dateFormat: state
      }, STORAGE_APPLICATION_SETTINGS)
      return
    }
  }, [state])

  const handlerOnChange = (e: any) => {
    setState(e.target.value)
  }
  return (
    <div className={'d-flex flex-column hw-settings-date-format'}>
      <div className={'d-flex font-smaller-2 align-items-center color-primary'}>
        <div className={'pr-2'}><FontAwesomeIcon icon={faCalendarAlt}/></div>
        <div>Date Format</div>
      </div>
      <RadioGroup
                    value={state}
                    onChange={handlerOnChange}
                    component-direction={'column'}
      >
        <Radio label={'2020-02-21'} value={'sv-SE'}/>
        <Radio label={'02/21/2020'} value={'us-EN'}/>
        <Radio label={'21/02/2020'} value={'fr-FR'}/>
        <Radio label={'21.02.2020'} value={'sr-Latn-RS'}/>
      </RadioGroup>
    </div>
  )
}

export default DateFormat
