import React                  from 'react'
import EmptyTag               from '../../../../../components/Util/EmptyTag'
import { get as _get }        from 'lodash'
import { FontAwesomeIcon }    from '@fortawesome/react-fontawesome'
import ConditionalRendering   from '../../../../../components/Util/ConditionalRender'
import ButtonShortcut         from '../../../../../components/Button/ButtonShortcut'
import { KeyboardEventCodes } from '../../../../../components/hooks/useExternalKeybaord'
import { faInfoCircle }       from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import { useUser }            from '../../../../hooks/useUser'
import { CONSTANT_USERS }     from '../../../../constants'
import { faKey }              from '@fortawesome/free-solid-svg-icons'

interface IGeneralDetailsProps {
  notShowEditButton?: boolean
}

const GeneralDetails = ({notShowEditButton}: IGeneralDetailsProps) => {

  const {data} = useUser()

  const user = React.useMemo(() => _get(data, 'selected'), [data])

  return (
    <div className={'d-flex flex-column w-100 justify-content-start align-items-start mt-2'}>
      <div
                className={'absolute-right-top'}
                data-action={CONSTANT_USERS.EVENTS.RESET_PASSWORD}
                data-action-id={_get(user, 'id')}
      >
        <ButtonShortcut
                    icon={faKey}
                    label={'RESET'}
                    classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
        />
      </div>
      <div className={'d-flex justify-content-between mb-1 color-primary w-100'}>
        <div className={'d-flex font-smaller-2 align-items-center '}>
          <div className={'pr-2'}><FontAwesomeIcon icon={faInfoCircle}/></div>
          <div>GENERAL DETAILS</div>
        </div>
        <ConditionalRendering condition={!notShowEditButton}>
          <div
                        data-action={CONSTANT_USERS.EVENTS.EDIT}
                        data-action-id={_get(user, 'id')}
          >
            <ButtonShortcut
                            icon={faInfoCircle}
                            label={'Edit'}
                            shortcut={KeyboardEventCodes.F4}
                            classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={'font-bigger-2 font-weight-300 line-height-11 color-primary font-weight-600 pb-2 w-100'}>
        <EmptyTag model={user} field={'firstName'} placeholder={'FIRST '}/>
                &nbsp; <EmptyTag model={user} field={'lastName'} placeholder={'LAST NAME'}/>
      </div>
      <div className={'d-flex flex-row flex-fill justify-content-start align-items-center color-primary w-100'}>
        <div className={'text-left font-smaller-4 opacity-6 min-width-120'}>EMAIL&nbsp;:</div>
        <div className={'px-1'}>
          <EmptyTag model={user} field={'email'} placeholder={'#########'}/>
        </div>
      </div>
      <div className={'d-flex flex-row justify-content-start align-items-center color-primary w-100'}>
        <div className={'text-left font-smaller-4 opacity-6 min-width-120'}>USERNAME&nbsp;:</div>
        <div className={'px-1'}>
          <EmptyTag model={user} field={'userName'} placeholder={'#########'}/>
        </div>
      </div>
    </div>
  )

}

export default GeneralDetails
