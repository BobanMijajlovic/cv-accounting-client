import React                    from 'react'
import EmptyTag                 from '../../../../components/Util/EmptyTag'
import {get as _get}            from 'lodash'
import {FontAwesomeIcon}        from '@fortawesome/react-fontawesome'
import ConditionalRendering     from '../../../../components/Util/ConditionalRender'
import {CONSTANT_CUSTOMER}      from '../../../constants'
import ButtonShortcut           from '../../../../components/Button/ButtonShortcut'
import {KeyboardEventCodes}     from '../../../../components/hooks/useExternalKeybaord'
import {faAddressCard}          from '@fortawesome/free-solid-svg-icons'
import {useTranslationFunction} from '../../../../components/Translation/useTranslation'
import {
  useCustomer,
  useCustomerDashboard
} from '../../../../store/customer/useCustomer'

interface IGeneralDetailsProps {
  notShowEditButton?: boolean
}

const GeneralDetails = ({notShowEditButton}: IGeneralDetailsProps) => {

  const {data} = useCustomerDashboard()

  const {translate: $translate} = useTranslationFunction()

  const customer = React.useMemo(() => _get(data, 'selected'), [data])

  return (
    <div className={'d-flex flex-column w-100 justify-content-start align-items-start mt-2'}>
      <div className={'d-flex justify-content-between mb-1 color-primary w-100'}>
        <div className={'d-flex font-smaller-2 align-items-center '}>
          <div className={'pr-2'}><FontAwesomeIcon icon={faAddressCard}/></div>
          <div className={'text-upper'}> {$translate('GENERAL_DETAILS')}</div>
        </div>
        <ConditionalRendering condition={!notShowEditButton}>
          <div
            data-action={CONSTANT_CUSTOMER.EVENTS.EDIT}
            data-action-id={_get(customer, 'id')}
          >
            <ButtonShortcut
                icon={faAddressCard}
                label={'Edit'}
                shortcut={KeyboardEventCodes.F4}
                classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={'w-50'}>

      </div>
      <div className={'font-bigger-2 font-weight-300 line-height-11 color-primary font-weight-600 pb-2'}>
        <EmptyTag model={customer} field={'shortName'} placeholder={'SHORT NAME'}/>
      </div>
      <div className={'font-smaller-4 text-center'}>
        <EmptyTag model={customer} field={'fullName'} placeholder={'FULL NAME'}/>
      </div>
      <div className={'d-flex flex-row justify-content-start align-items-center color-primary'}>
        <sub className={'text-left opacity-6 min-width-120'}>Tax Number&nbsp;:</sub>
        <div className={'px-1'}>
          <EmptyTag model={customer} field={'taxNumber'} placeholder={'#########'}/>
        </div>
      </div>
      <div className={'d-flex flex-row align-items-center color-primary'}>
        <sub className={'text-left opacity-6 min-width-120'}>Company #Num&nbsp;:</sub>
        <div className={'px-1'}>
          <EmptyTag model={customer} field={'uniqueCompanyNumber'} placeholder={'#########'}/>
        </div>
      </div>
      <div className={'d-flex flex-row align-items-center color-primary'}>
        <sub className={'text-left opacity-6 min-width-120'}>Description&nbsp;:</sub>
        <div className={'px-1'}>
          <EmptyTag model={customer} field={'description'} placeholder={'####'}/>
        </div>
      </div>
    </div>
  )

}

export default GeneralDetails
