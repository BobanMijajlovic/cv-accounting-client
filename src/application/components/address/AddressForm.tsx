import React from 'react'
import {
  minLength,
  required,
  useValidation
}            from '../../../validation'

import { CONSTANT_ADDRESS }       from '../../constants'
import { FORMAT_RULE_ZIP }        from 'react-hook-custom-validation'
import { get as _get }            from 'lodash'
import { TAddress }               from '../../../graphql/type_logic/types'
import InputTextWithValidation    from '../../../components/withValidation/InputTextWithValidation'
import SelectTextWithValidation   from '../../../components/withValidation/SelectTextWithValidation'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                 from '../../../components/Dialog/DialogBasic'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../components/EasyModel/EasyModal'
import DialogButtonsSaveUpdate    from '../_common/DialogButtonsSaveUpdate'
import { faHome }                 from '@fortawesome/free-solid-svg-icons'
import { processErrorGraphQL }    from '../../../apollo'
import { useTranslationFunction } from '../../../components/Translation/useTranslation'

interface IAddressFormProps {
  address?: TAddress
  submitFun: (address: TAddress) => Promise<any> | void
  cancelFun: () => void
}

const AddressForm = ({address, cancelFun, submitFun}: IAddressFormProps) => {

  const {translate} = useTranslationFunction()

  const validation = useValidation<TAddress>({
    initialData:{
      street:_get(address, 'street', 'Jasicki put 9A'),
      zipCode:_get(address, 'zipCode', '37000'),
      city:_get(address, 'city', 'Belgrade'),
      state:_get(address, 'state', 'Serbia'),
      type:_get(address, 'type', '0'),
      description:_get(address, 'description', '')
    }
  })

  const handlerOnSubmit = async () => {
    const _data = await validation.validate()
    const {error, data, validations, refs} = _data

    if (error) {
      const object = validations.validations as TAddress
      const field = ['street', 'zipCode', 'city', 'state', 'type', 'description'].find(x => !!_get(object, x))
      if (field) {
        const fieldRef = refs.find(x => x.field === field)
        fieldRef && fieldRef.ref.current.focus()
      }
      return
    }
    try {
      const obj = Object.assign({}, data, (address && address.id) ? {id:address.id} : {})
      await submitFun(obj)
      cancelFun()
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e, validation)
    }

  }

  return (
    <>
      <div className="hw-address-form-root p-4 relative">
        <div className={'container'}>
          <div className={'col-md-9'}>
            <InputTextWithValidation
                            required
                            focusOnMount
                            selectOnFocus
                            label={'Street'}
                            helperText={'enter street'}
                            maxLength={100}
                            validation={{
                              useValidation:validation,
                              model:'street',
                              rule:{
                                required
                              }
                            }}
            />
          </div>
          <div className={'col-md-3'}>
            <InputTextWithValidation
                            align={'align-center'}
                            selectOnFocus
                            label={translate('LABEL_ZIP')}
                            helperText={translate('HELPER_TEXT_ZIP')}
                            validation={{
                              useValidation:validation,
                              model:'zipCode',
                              rule:{
                                minLength:minLength({min:5})
                              },
                              format:{
                                rule:FORMAT_RULE_ZIP,
                                validationMessage: 'Zip is not valid'
                              }
                            }}
            />
          </div>
          <div className={'col-md-6 mt-3 '}>
            <InputTextWithValidation
                            required
                            label={'City'}
                            helperText={'enter city'}
                            maxLength={50}
                            validation={{
                              useValidation:validation,
                              model:'city',
                              rule:{
                                required
                              }
                            }}
            />
          </div>
          <div className={'col-md-6 mt-3 '}>
            <InputTextWithValidation
                            label={'State'}
                            helperText={'enter state'}
                            maxLength={50}
                            validation={{
                              useValidation:validation,
                              model:'state',

                            }}
            />
          </div>
          <div className={'col-md-4  mt-3'}>
            <SelectTextWithValidation
                            required
                            label={'Address type'}
                            helperText={'choose type'}
                            options={CONSTANT_ADDRESS.TYPES_SELECT}
                            validation={{
                              useValidation:validation,
                              model:'type',
                              rule:{
                                required
                              }
                            }}
            />
          </div>
          <div className={'col-md-8  mt-3'}>
            <InputTextWithValidation
                            required
                            label={'Description'}
                            helperText={'enter description'}
                            maxLength={64}
                            validation={{
                              useValidation:validation,
                              model:'description'
                            }}
            />
          </div>

          <DialogButtonsSaveUpdate cancelFun={cancelFun}
                                             submitFun={handlerOnSubmit}
                                             update={!!address}
                                             icon={faHome}/>
        </div>
      </div>
    </>
  )
}

export default AddressForm

export interface IOpenDialogAddress {
  address?: TAddress,
  submitFun: (address: TAddress) => Promise<any> | void
}

export const openDialogAddress = ({address, submitFun, ...rest}: IOpenDialogAddress) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const ComponentToRender = () => {
      return (
        <AddressForm
                    cancelFun={closeDialog}
                    submitFun={submitFun}
                    address={address}
                    {...rest}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-address-add-edit-56456456'} closeFn={closeDialog}>
      <CenteredDialog
                title={address ? 'Edit address' : 'Define new address'}
                closeAction={closeDialog}
                Component={ComponentToRender}
      />
    </DialogModalRootComponent>)
  })
}

export interface IDialogAddressDelete {
  address: TAddress
  actionOnDelete?: (address: TAddress) => void
}

export const openDialogAddressDelete = ({address, actionOnDelete}: IDialogAddressDelete) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {
      const handlerConfirm = async () => {
        actionOnDelete && await actionOnDelete(address)
        closeDialog()
      }

      const messages: string[] = React.useMemo(() => [
        'Are you sure do delete address?',
        `${_get(address, 'street', '')}`,
        `${_get(address, 'zipCode', '')} ${_get(address, 'city', '')}  `
      ], [])

      return (
        <DialogComponentQuestions
                    closeFun={closeDialog}
                    confirmFun={handlerConfirm}
                    messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-address-delete-54156014515015151'} closeFn={closeDialog}>
      <CenteredDialog
                title={'DELETE ADDRESS'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

