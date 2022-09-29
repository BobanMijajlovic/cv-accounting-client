import React                from 'react'
import EmptyTag             from '../../../../../components/Util/EmptyTag'
import {get as _get}        from 'lodash'
import {FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import ConditionalRendering from '../../../../../components/Util/ConditionalRender'
import ButtonShortcut       from '../../../../../components/Button/ButtonShortcut'
import {KeyboardEventCodes} from '../../../../../components/hooks/useExternalKeybaord'
import {faInfoCircle}       from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import {CONSTANT_WAREHOUSE} from '../../../../constants'
import {useWarehouse}       from '../../../../../store/warehouse/useWarehouse'

interface IGeneralDetailsProps {
  notShowEditButton ?: boolean,
  warehouseId : string
}

const GeneralDetails = ({notShowEditButton, warehouseId} : IGeneralDetailsProps) => {
  const {data} = useWarehouse(warehouseId)
  const warehouse = React.useMemo(() => _get(data, 'warehouse'), [data])

  return (
    <div className={'d-flex flex-column w-100 justify-content-start align-items-start  relative'}>
      <div className={'d-flex justify-content-between  color-primary w-100 '}>
        <div className={'d-flex font-smaller-4 align-items-center absolute-top-minus' }>
          <div className={'pr-2'}>
            <FontAwesomeIcon icon={faInfoCircle}/>
          </div>
          <div className={'font-smaller-5'}>GENERAL DETAILS</div>
        </div>
        <ConditionalRendering condition={!notShowEditButton}>
          <div
                        data-action={CONSTANT_WAREHOUSE.EVENTS.EDIT}
                        data-action-id={_get(warehouse, 'id')}
          >
            <div className={'absolute-right-top'}>
              <ButtonShortcut
                  icon={faInfoCircle}
                  style={{minWidth: '50px'}}
                  label={'Edit'}
                  shortcut={KeyboardEventCodes.F4}
                  classNames={'hw-shortcut-button-white-version  hw-button-border-color mr-3'}
              />
            </div>
          </div>
        </ConditionalRendering>
      </div>
      <div className={'line-height-11 font-smaller-1 color-primary font-weight-600 pb-1 mt-1'}
      >
        <EmptyTag model={warehouse} field={'name'} placeholder={'Name'}/>
      </div>
      <div className={'d-flex flex-row flex-fill font-smaller-1  justify-content-start align-items-center color-primary w-100'}>
        <EmptyTag
                    model={warehouse}
                    field={'description'}
                    placeholder={'DESCRIPTION'}
        />
      </div>
    </div>
  )
}

export default GeneralDetails
