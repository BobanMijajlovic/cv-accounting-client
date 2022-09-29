import React, { useState }           from 'react'
import { Paper }                     from '../../../components/Paper'
import {
  IFieldsRefs,
  required,
  useValidation
}                                    from '../../../validation'
import InputTextWithValidation       from '../../../components/withValidation/InputTextWithValidation'
import {
  TCustomer,
  TReceiptItem
}                                    from '../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../components/Dialog/DialogBasic'
import DialogButtonsSaveUpdate       from '../_common/DialogButtonsSaveUpdate'
import {
  faTicketAlt,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut                from '../../../components/Button/ButtonShortcut'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../components/hooks/useExternalKeybaord'
import CustomerViewShort             from '../customer/views/CustomerViewShort'
import { openDialogAddEditCustomer } from '../customer/modal/CustomerSearch'
import {
  IPdfTableProps,
  resizeColumns
}                                    from '../../../components/Pdf/Pdf'
import {
  formatPrice,
  formatQuantity
}                                    from '../../utils/Utils'
import { RenderCalculationItemData } from '../calculation/pdf/_common/RenderColumns'
import {
  RenderCalculationVatData,
  RenderVatDataTHead
}                                    from '../calculation/pdf/_common/VatRender'
import { useReceiptsQuery }          from '../../../graphql/graphql'
import {
  queryVariablesFindLastReceipt,
  queryVariablesFindReceiptByNumber
}                                    from '../../../graphql/variablesQ'
import CashReceiptPdf                from './pdf/CashReceiptPdf'
import _                             from 'lodash'
import { SpinnerLoadingCenter }      from '../../../components/Spinner/SpinnerLoading'

interface ICashReceiptModel {
  receiptNumber : string
  customer ?: TCustomer
}

interface IErrorState {
  customer ?: boolean | string
}

const CashReceiptForm = ({cancelFunction} : { cancelFunction : () => void }) => {

  const validation = useValidation<ICashReceiptModel>()
  const [stateError, setError] : [IErrorState, (r : IErrorState) => void] = useState({} as IErrorState)

  const {state, setFieldValue} = validation

  const {loading: lastReceiptLoading} = useReceiptsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesFindLastReceipt(),
    onCompleted: (data) => {
      if (data && data.data && data.data.items && data.data.items.length !== 0) {
        setFieldValue('receiptNumber', `${data.data.items[0].receiptNumber}`, false)
        return
      }
    },
    skip: !!state.receiptNumber
  })

  const setCustomer = React.useCallback((customer : TCustomer) => {
    setFieldValue('customer', customer as any, false)
  }, [setFieldValue])

  const handlerChooseCustomer = () => {
    setError({})
    openDialogAddEditCustomer(setCustomer)
  }

  const {setRef} = useExternalKeyboard((event : KeyboardEvent) => {
    switch (event.key) {
      case KeyboardEventCodes.F2:
        handlerChooseCustomer()
        break
      case KeyboardEventCodes.F12:
        handlerOnSubmit().then()
        break
      case KeyboardEventCodes.Esc:
        cancelFunction && cancelFunction()
        break
      default:
        break
    }
  }, true, [], 'dialog-cash-register-form')

  const handlerOnSubmit = async () => {
    const {data: _data, error, validations, refs} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if (!_data.customer || !_data.customer.id) {
      setError({customer: 'Customer is required!'})
      return
    }

    openDialogCashReceiptPdf({
      receiptNumber: _data.receiptNumber,
      customer: _data.customer
    })
    cancelFunction()
  }

  return (
    <div ref={setRef}>
      {lastReceiptLoading ? <SpinnerLoadingCenter/> : null}
      <Paper className={'d-flex flex-column hw-paper'} header={'Generate Cash Receipt'}>
        <div className={'d-flex flex-column hw-cash-receipt-dialog-root'} >
          <div className={'container px-0 pt-3'}>
            <div className={'col-5'}>
              <InputTextWithValidation
                                required
                                align={'align-right'}
                                focusOnMount
                                selectOnFocus
                                label={'Receipt number'}
                                lined
                                helperText={'enter receipt #'}
                                fullWidth
                                validation={{
                                  useValidation: validation,
                                  model: 'receiptNumber',
                                  rule: {
                                    required
                                  }
                                }}
              />
            </div>
            <div className={'col-7 pr-0'}>
              <div className={'d-flex justify-content-end align-items-center'}>
                <div className={'cash-receipt-customer-part'}>
                  <CustomerViewShort customer={state.customer as TCustomer} error={stateError.customer}/>
                </div>

                <ButtonShortcut
                                    icon={faUserTie}
                                    label={'Customer'}
                                    shortcut={KeyboardEventCodes.F2}
                                    classNames={'hw-shortcut-button-white-version hw-button-border-color mr-3 sm modern'}
                                    onClick={handlerChooseCustomer}
                />
              </div>
            </div>
            <DialogButtonsSaveUpdate
                            cancelFun={cancelFunction}
                            submitBtnLabel={'GENERATE'}
                            submitFun={handlerOnSubmit}
                            icon={faTicketAlt}
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default CashReceiptForm

export const openDialogCashReceipt = () => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-cash-receipt-form-7837767687737'} closeFn={closeDialog}>
      <CenteredDialog
                closeAction={closeDialog}
                Component={CashReceiptForm}
                componentRenderProps={{
                  cancelFunction: closeDialog,
                }}
      />
    </DialogModalRootComponent>)
  })
}

export const openDialogCashReceiptPdf = ({receiptNumber, customer} : { receiptNumber : string, customer ?: TCustomer }) => {
  const tableData : IPdfTableProps = {
    columns: [
      {
        label: 'Rb',
        alignment: 'left',
        format: (value : any, index : any) => `${((Number(index) || 0) + 1).toString()}`
      },
      {
        field: 'item.shortName',
        label: 'Article',
        alignment: 'left',
        sizeType: 1,
        minSize: 30,
        format: (value : any) => `${value.item.barCode}`,
        render: RenderCalculationItemData,
        renderProps: {
          field: 'item'
        }
      },
      {
        label: 'QTY',
        field: 'quantity',
        alignment: 'right',
        format: (value : any) => formatQuantity(value.quantity as number)
      },
      {
        label: 'Price',
        field: 'price',
        alignment: 'right',
        format: (value : any) => formatPrice(value.price as number)
      },
      {
        label: 'Finance',
        field: 'financeFinalVP',
        alignment: 'right',
        sizeType: 4,
        format: (value : any) => formatPrice(value.financeFinalVP),
      },
      {
        label: 'Tax finance',
        field: 'tax',
        alignment: 'right',
        sizeType: 4,
        minSize: 15,
        format: (value : any) => formatPrice(' '),
        renderHeader: RenderVatDataTHead,
        renderHeaderProps: {
          field: 'tax'
        },
        render: RenderCalculationVatData,
        renderProps: {
          field: 'tax'
        },
        style: {
          padding: 0
        }
      },
      {
        label: 'Invoice finance',
        field: 'financeMP',
        sizeType: 4,
        alignment: 'right',
        format: (value : any) => formatPrice(value.financeMP)
      },
    ],
  }

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (component : any) => any) => {
    const Component = () => {

      const queryVariablesCashReg = React.useMemo(() => queryVariablesFindReceiptByNumber(receiptNumber), [])

      const {loading, data} = useReceiptsQuery({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: queryVariablesCashReg,
        skip: !receiptNumber
      })

      if (loading) {
        return <SpinnerLoadingCenter/>
      }

      const _data = data?.data?.items[0] || []
      console.log(_data)
      const _tableData = {
        ...tableData,
        data: (_data as any).items.map((x : TReceiptItem) => {
          return {
            ...x,
            tax: {
              taxPercent: x.taxPercent,
              taxFinance: x.taxFinance
            },
            financeMP: _.round(_.add(Number(x.financeFinalVP), Number(x.taxFinance)), 2)
          }
        })
      }

      resizeColumns(_tableData)

      return (
        <>
          <CenteredDialog
                        title={'Cash Receipt Pdf'}
                        closeAction={closeDialog}
                        Component={CashReceiptPdf}
                        componentRenderProps={{
                          tableData: _tableData,
                          customer,
                          receipt: _data,
                          cancelFunction: closeDialog
                        }}
          />
        </>
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-cash-receipt-pdf-0205612051041516'} closeFn={closeDialog}>
      <Component/>
    </DialogModalRootComponent>)
  })
}
