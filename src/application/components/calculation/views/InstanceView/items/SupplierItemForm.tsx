import React, {useEffect}           from 'react'
import EmptyTag                     from '../../../../../../components/Util/EmptyTag'
import {
  required,
  useValidation
}                                   from '../../../../../../validation'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../../../components/hooks/useExternalKeybaord'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import {
  TCustomer,
  TItem
}                                   from '../../../../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                   from '../../../../../../components/EasyModel/EasyModal'
import InputTextWithValidation      from '../../../../../../components/withValidation/InputTextWithValidation'
import ButtonsForm                  from '../../../../../../components/Button/ButtonsForm'
import {CenteredDialog}             from '../../../../../../components/Dialog/DialogBasic'
import {useUpdateItemMutation}      from '../../../../../../graphql/graphql'
import {processErrorGraphQL}        from '../../../../../../apollo'

export interface ISupplierItemFormProps {
  supplier : TCustomer
  item : TItem
  closeDialog ?: () => void
  successFunction ?: (item : TItem) => void
}

interface ISupplierSkuModel {
  code : string
}

const SupplierItemForm = ({supplier, item, closeDialog, successFunction} : ISupplierItemFormProps) => {

  const validation = useValidation<ISupplierSkuModel>()
  const { setFieldValue } = validation

  useEffect(() => {
    if (item && item.itemSuppliers) {
      const itemSupplier = (item.itemSuppliers as any).find((x : any) => Number(x.supplier.id) === Number(supplier.id))
      if (itemSupplier) {
        setFieldValue('code', itemSupplier.code as string, true)
        return
      }
    }
  }, [item, supplier, setFieldValue])

  const [mutationInsertSupplierSku] = useUpdateItemMutation()

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error || !supplier || !item.id) {
      return
    }
    const _data = {
      variables: {
        data: {
          itemSuppliers: [
            {
              code: Number(data.code),
              itemId: Number(item.id),
              supplierId: Number(supplier.id)
            }
          ]
        },
        id: Number(item.id)
      }
    } as any
    await mutationInsertSupplierSku(_data).then(v => {
      const result = v.data as any
      successFunction && successFunction(result.item)
      handlerCancelDialog()
    })
      .catch((e) => {
        processErrorGraphQL(e, validation)
      })
  }

  useExternalKeyboard((e : KeyboardEvent) => {
    handlerOnSubmit()
  }, true, [KeyboardEventCodes.Enter], 'calc-supplier-form')

  return (
    <div className={'d-flex flex-fill flex-wrap hw-supplier-sku-root'}>
      <div className={'col-md-6 d-flex flex-column justify-content-start font-smaller-2 text-left'}>
        <div className={'px-1 font-bold text-upper'}><EmptyTag model={supplier} field={'shortName'} placeholder={'SUPPLIER NAME'}/></div>
        <small className={'px-1'}><EmptyTag model={supplier} field={'fullName'} placeholder={'Supplier full name'}/> </small>
        <div className={'d-flex  flex-row justify-content-between p-1'}>
          <div className={'d-flex flex-column align-items-left pr-1'}>
            <div className={'opacity-4'}>Tax ID&nbsp;:</div>
            <div className={''}><EmptyTag model={supplier} field={'taxNumber'} placeholder={'#########'}/>
            </div>
          </div>
          <div className={'d-flex flex-column align-items-center px-1'}>
            <div className={'opacity-4'}>Company #Num&nbsp;:</div>
            <div className={''}><EmptyTag model={supplier} field={'uniqueCompanyNumber'} placeholder={'#########'}/>
            </div>
          </div>
        </div>
      </div>
      <div className={'col-md-6'}>
        <InputTextWithValidation
                    label={'Supplier SKU'}
                    helperText={'enter sku'}
                    align={'align-right'}
                    focusOnMount
                    selectOnFocus
                    validation={{
                      useValidation: validation,
                      model: 'code',
                      rule: {
                        required
                      },
                      format: {
                        rule: {
                          format: '########',
                          validSize: 1
                        },
                        validationMessage: 'Enter valid SKU'
                      }
                    }}
        />
      </div>
      <div className={'col-md-12 d-flex flex-column font-smaller-2'}>
        <AutoCompleteResultRenderItem data={item}/>
      </div>

      <div className={'container pt-4'}>
        <ButtonsForm
                    buttonsCancel={{
                      label: 'CANCEL',
                      action: handlerCancelDialog
                    }}
                    buttonSubmit={{
                      label: 'SAVE',
                      action: handlerOnSubmit
                    }}
        />
      </div>

    </div>
  )
}

export default SupplierItemForm

interface IDialogAddSupplierSkuProps {
  supplier : TCustomer
  item : TItem
  successFunction ?: (item : TItem) => void
}

export const openDialogAddSupplierSku = ({...rest} : IDialogAddSupplierSkuProps) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-supplier-sku-46135251'} closeFn={closeDialog}>
      <CenteredDialog
                title={'Define supplier sku'}
                closeAction={closeDialog}
                Component={SupplierItemForm}
                componentRenderProps={{
                  closeDialog: closeDialog,
                  ...rest
                }}
      />
    </DialogModalRootComponent>)
  })
}

