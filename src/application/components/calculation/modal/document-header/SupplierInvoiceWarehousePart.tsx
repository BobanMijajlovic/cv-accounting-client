import React, {
  ChangeEvent,
  useCallback
}                                 from 'react'
import {
  IUseValidation,
  required
}                                 from '../../../../../validation'
import CustomerViewShort          from '../../../customer/views/CustomerViewShort'
import { TCustomer }              from '../../../../../graphql/type_logic/types'
import InputTextWithValidation    from '../../../../../components/withValidation/InputTextWithValidation'
import { IHeaderDocumentState }   from '../DocumentHeaderForm'
import DatePickerWithValidation   from '../../../../../components/withValidation/DatePickerWithValidation'
import ButtonShortcut             from '../../../../../components/Button/ButtonShortcut'
import { faUserTie }              from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }     from '../../../../../components/hooks/useExternalKeybaord'
import SelectTextWithValidation   from '../../../../../components/withValidation/SelectTextWithValidation'
import { useWarehousesQuery }     from '../../../../../graphql/graphql'
import { FOCUS_ID }               from '../../../../constants/FocusElementIDs'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

interface ISupplierInvoiceWarehousePartProps<T> {
  validation : IUseValidation<T>
  setSupplier : () => void
  error? : boolean | string
}

const SupplierInvoiceWarehousePart = <T extends any>( { validation, setSupplier, error } : ISupplierInvoiceWarehousePartProps<T> ) => {
  const { translate } = useTranslationFunction()
  const { state, getFieldRef } = validation as IUseValidation<IHeaderDocumentState>
  const supplierError = React.useMemo( () => error ? error : void( 0 ), [error] )
  const { data } = useWarehousesQuery()
  const warehousesOptions = React.useMemo( () => {
    let warehouses : any = []
    if ( data && data.data.items ) {
      warehouses = data.data.items.map( ( warehouse : any ) => {
        return {
          label : warehouse.name,
          description : warehouse.description,
          value : warehouse.id
        }
      } )
    }
    return [
      ...warehouses
    ]
  }, [data] )

  const onChangeWarehouseHandler = useCallback( ( e : ChangeEvent<HTMLSelectElement> ) => {
    const fieldRef = getFieldRef( 'date' )
    fieldRef && fieldRef.ref && fieldRef.ref.current && fieldRef.ref.current.focus()
  }, [getFieldRef] )

  return (
    <div className={ 'd-flex  w-100  pt-0 mb-3 border-bottom ' }>

      <div className={ 'd-flex flex-row justify-content-between align-items-start flex-1 color-primary relative mt-4 ' }>
        <CustomerViewShort supplier customer={ state.supplier as TCustomer } error={ supplierError } namePlaceholder={ translate( 'CALCULATION_HEADER_SUPPLEIR_NAME_PLACEHOLDER' ) }/>
        <ButtonShortcut
                    icon={ faUserTie }
                    style={ { width : '70px' } }
                    onClick={ setSupplier }
                    label={ translate( 'LABEL_SUPPLIER' ) }
                    shortcut={ KeyboardEventCodes.F2 }
                    classNames={ 'hw-shortcut-button primary sm hw-button-border-color mb-2' }
        />
      </div>

      <div className={ 'd-flex flex-column flex-1' }>
        <div className={ 'd-flex flex-row justify-content-around ' }>
          <div className={ 'hw-input-calendar-input ml-3' }>
            <InputTextWithValidation
                            focusId={ FOCUS_ID.CALCULATION.DOCUMENT_FORM.INVOICE_NUM_INPUT_FIELD }
                            required
                            label={ translate( 'CALCULATION_HEADER_INPUT_INVOICE_NUMBER_LABEL' ) }
                            helperText={ '' }
                            lined
                            fullWidth
                            selectOnFocus
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'invoiceNumber',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
          <div className={ 'hw-input-calendar-input ml-3' }>
            <DatePickerWithValidation
                            format={ 'dd/MM/yyyy' }
                            helperText={ '' }
                            lined
                            fullWidth
                            selectOnFocus
                            label={ translate( 'CALCULATION_HEADER_INPUT_DATE_OF_INVOICE_LABEL' ) }
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'invoiceDate',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
        </div>
        <div className={ 'd-flex flex-row justify-content-around ' }>
          <div className={ 'hw-select-input ml-3' }>
            <SelectTextWithValidation
                            label={ translate( 'CALCULATION_HEADER_SELECT_WAREHOUSE_LABEL' ) }
                            helperText={ '' }
                            lined
                            options={ warehousesOptions }
                            onChange={ onChangeWarehouseHandler }
                            validation={ {
                              useValidation : validation,
                              model : 'warehouseId',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
          <div className={ 'hw-input-calendar-input ml-3' }>
            <DatePickerWithValidation
                            format={ 'dd/MM/yyyy' }
                            helperText={ '' }
                            classNames={ 'lined-version' }
                            fullWidth
                            selectOnFocus
                            label={ translate( 'CALCULATION_HEADER_INPUT_DATE_OF_CALCULATION_LABEL' ) }
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'date',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
        </div>
      </div>

    </div>
  )

}

export default SupplierInvoiceWarehousePart
