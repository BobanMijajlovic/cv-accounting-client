import React, {
  useEffect,
  useState
}                                    from 'react'
import { FontAwesomeIcon }           from '@fortawesome/react-fontawesome'
import { faBalanceScaleLeft }        from '@fortawesome/free-solid-svg-icons'
import {
  Radio,
  RadioGroup
}                                    from '../../../../components/Radio'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                                    from '../../../utils/LocalStorage'
import {
  APPLICATION_DEFAULT_UNITS,
  CONSTANT_UNITS
} from '../../../constants'
import { useTranslationFunction }    from '../../../../components/Translation/useTranslation'

type TUnitsType = string[] | number[]

const Units = () => {

  const { translate } = useTranslationFunction()

  const {KILOGRAM,LITER,PIECE,METER} = CONSTANT_UNITS

  const [state, setState] : [TUnitsType, (r : TUnitsType) => void] = useState(() => {
    const data = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
    if (data && data.units) {
      return data.units
    }
    return APPLICATION_DEFAULT_UNITS
  })

  const handlerOnChange = (e : any) => {
    let _state = [...state] as TUnitsType
    const value = e.target.value as string
        // @ts-ignore
    const index = state.indexOf(value)
    if (index > -1) {
      _state.splice(index, 1)
    } else {
      _state = [
        ..._state,
        value
      ] as TUnitsType
    }
    setState(_state)
  }

  useEffect(() => {
    if (state.length !== 0) {
      const storageData = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
      LocalStorage.saveData({
        ...storageData,
        units : state
      }, STORAGE_APPLICATION_SETTINGS)
      return
    }
  }, [state])

  return (
    <div className={ 'd-flex flex-column hw-settings-measure-of-units' }>
      <div className={ 'd-flex font-smaller-2 align-items-center color-primary' }>
        <div className={ 'pr-2' }><FontAwesomeIcon icon={ faBalanceScaleLeft }/></div>
        <div>Measure of units</div>
      </div>
      <RadioGroup
                value={ state }
                onChange={ handlerOnChange }
                component-direction={ 'column' }
      >
        <Radio label={translate('UNITS_KG')} value={ KILOGRAM }/>
        <Radio label={translate('UNITS_PIECE')} value={ PIECE }/>
        <Radio label={translate('UNITS_L')} value={ LITER }/>
        <Radio label={translate('UNITS_M')} value={ METER }/>
      </RadioGroup>
    </div>
  )
}

export default Units