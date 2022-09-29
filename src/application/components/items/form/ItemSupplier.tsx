import React, {
  useEffect,
  useState
}                                 from 'react'
import {
  TCustomer,
  TItem,
  TItemSupplier
}                                 from '../../../../graphql/type_logic/types'
import {
  IFieldsRefs,
  required,
  useValidation
}                                 from '../../../../validation'
import {
  get as _get,
  isEmpty as _isEmpty
}                                 from 'lodash'
import InputTextWithValidation    from '../../../../components/withValidation/InputTextWithValidation'
import { faBarcode }              from '@fortawesome/free-solid-svg-icons'
import DialogButtonsSaveUpdate    from '../../_common/DialogButtonsSaveUpdate'
import { CONSTANT_MODEL }         from '../../../constants'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                 from '../../../../components/Dialog/DialogBasic'
import AutoCompleteFindCustomer   from '../../autocomplete/AutoCompleteFindCustomer'
import CustomerViewShort          from '../../customer/views/CustomerViewShort'
import ItemShortView              from '../view/ItemShortView'
import { processErrorGraphQL }    from '../../../../apollo'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'
import { useItemDashboard }       from '../../../../store/items/useItem'

interface IItemSupplierFormProps {
  itemSupplier ?: TItemSupplier
  item : TItem
  submitFun : (itemSupplier : TItemSupplier) => Promise<any>
  cancelFun : () => void
  focus ?: any
}

const ItemSupplierForm = ({item, itemSupplier, submitFun, cancelFun} : IItemSupplierFormProps) => {
  const {translate} = useTranslationFunction()
  const validation = useValidation<TItemSupplier>({
    initialData: {
      supplierId: Number(_get(itemSupplier, 'supplierId', '')),
      code: Number(_get(itemSupplier, 'code', '')),
    }
  })

  const { getFieldRef } = validation

  const [state, setState] : [TCustomer, (r : TCustomer) => void] = useState({} as TCustomer)
  const [focusElement, setFocusElement] : [IFieldsRefs, (r : IFieldsRefs) => void] = useState({} as IFieldsRefs)
  const [supplierError, setSupplierError] : [boolean, (r : boolean) => void] = useState(false as boolean)

  const handlerSetFocus = (field : string) => {
    const refData = getFieldRef(field)
    if (refData && refData.ref) {
      setFocusElement(refData)
    }
  }

  useEffect(() => {
    if (!itemSupplier) {
      return
    }
    setState(itemSupplier.supplier as TCustomer)
    handlerSetFocus('code')
  }, [itemSupplier, handlerSetFocus])

  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
    }
  }, [focusElement])

  const setCustomer = (data : TCustomer) => {
    if (_isEmpty(data)) {
      return
    }
    setState(data)
    setSupplierError(false)
    handlerSetFocus('code')
  }

  const _item = React.useMemo(() => item ? item : {}, [item])

  const handlerOnSubmit = async () => {

    const {error, data, validations, refs} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field} : any) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    setSupplierError(false)
    if (_isEmpty(state) || Number(state.id) === 0) {
      setSupplierError(true)
      return
    }
    try {
      const obj = Object.assign({}, {
        code: Number(data.code),
        supplierId: Number(_get(state, 'id')),
        itemId: Number(_item.id)
      }, (itemSupplier && itemSupplier.id) ? {id: +itemSupplier.id} : {})
      await submitFun(obj as TItemSupplier)
      cancelFun()
    } catch (e) {
            /** process the error */
      console.log(e)
      processErrorGraphQL(e, validation)
    }
  }

  return (
    <>
      <div className={'d-flex d-flex hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-md-6'}>
            <AutoCompleteFindCustomer
                            focus={state}
                            processSelected={setCustomer}
                            label={translate('LABEL_SUPPLIER')}
                            helperText={translate('HELPER_TEXT_CHOOSE_SUPPLIER')}
                            focusOnMount
                            disabled={!!itemSupplier}
            />
          </div>
          <div className={'col-md-6'}>
            <CustomerViewShort customer={state} error={supplierError}/>
          </div>
          <div className={'col-md-6'}>
            <ItemShortView item={_item}/>
          </div>
          <div className={'col-md-6'}>
            <InputTextWithValidation
                            align={'align-center'}
                            label={translate('CODE')}
                            selectOnFocus
                            helperText={translate('HELPER_TEXT_ENTER_CODE')}
                            validation={{
                              useValidation: validation,
                              model: 'code',
                              rule: {
                                required
                              }
                            }}
            />
          </div>
          <DialogButtonsSaveUpdate
                        cancelFun={cancelFun}
                        submitFun={handlerOnSubmit}
                        update={!!itemSupplier}
                        icon={faBarcode}
          />
        </div>
      </div>
    </>
  )

}

export default ItemSupplierForm

export interface IOpenDialogItemSupplier {
  itemSupplier ?: TItemSupplier
  item : TItem
  submitFun : (itemSupplier : TItemSupplier) => Promise<any> | void
}

export const openDialogSupplierCode = ({item, itemSupplier, submitFun} : IOpenDialogItemSupplier) => {
  
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const {translate} = useTranslationFunction()
      return (
        <CenteredDialog
              title={itemSupplier ? translate('ITEM_SUPPLIER_DIALOG_TITLE_UPDATE') : translate('ITEM_SUPPLIER_DIALOG_TITLE_INSERT')}
              closeAction={closeDialog}
              Component={ItemSupplierForm}
              componentRenderProps={{
                cancelFun: closeDialog,
                itemSupplier,
                item,
                submitFun
              }}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-items-supplier-code-add-edit-4598745748465156874'} closeFn={closeDialog}><Component/></DialogModalRootComponent>)
  })
}

export interface IDialogSupplierCodeDelete {
  itemSupplier : TItemSupplier
  actionOnDelete ?: () => void
}

export const openDialogSupplierCodeDelete = ({itemSupplier, actionOnDelete} : IDialogSupplierCodeDelete) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const {translate} = useTranslationFunction()
      const handlerConfirm = async () => {
        actionOnDelete && await actionOnDelete()
        closeDialog()
      }

      console.log(itemSupplier)
      const supplier = _get(itemSupplier, 'supplier')
      const supplierName = supplier && (supplier.shortName as string).length > 0 ? supplier.shortName : supplier?.fullName
      const messages : string[] = React.useMemo(() => [
        translate('ITEM_SUPPLIER_DELETE_DIALOG_MESSAGE'),
        `${translate('LABEL_SUPPLIER')} : ${supplierName}`,
        `${translate('CODE')} : ${_get(itemSupplier, 'code', '')}`
      ], [supplier])

      return (
        <DialogComponentQuestions
                    closeFun={closeDialog}
                    confirmFun={handlerConfirm}
                    messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-supplier-code-delete-5634859674561564658485694'} closeFn={closeDialog}>
      <CenteredDialog
                title={'ITEM_SUPPLIER_DELETE_DIALOG_TITLE'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

