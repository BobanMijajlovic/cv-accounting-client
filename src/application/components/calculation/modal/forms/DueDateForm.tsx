import React, { useEffect }      from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                                from '../../../../../validation'
import {
  formatPrice,
  toNumberFixed
}                                from '../../../../utils/Utils'
import { Paper }                 from '../../../../../components/Paper'
import DatePickerWithValidation  from '../../../../../components/withValidation/DatePickerWithValidation'
import InputTextWithValidation   from '../../../../../components/withValidation/InputTextWithValidation'
import DialogButtonsSaveUpdate   from '../../../_common/DialogButtonsSaveUpdate'
import { faCalendarAlt, }        from '@fortawesome/free-solid-svg-icons'
import {
  IDueDateRecord,
  IHeaderDocumentState
}                                from '../DocumentHeaderForm'
import _                         from 'lodash'
import { TDueDates }   from '../../../../../graphql/type_logic/types'
import { getTotalAddedDueDates } from '../../util'

interface IInvoiceDudeDateAddEditRenderProps {
  closeDialog ?: () => void
  successFunction : (dueDate : TDueDates) => void
  state : IHeaderDocumentState
}

const DueDateForm = ({closeDialog, state, successFunction} : IInvoiceDudeDateAddEditRenderProps) => {
  const validation = useValidation<IDueDateRecord>()
    
  const { setFieldValue } = validation   
    
  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }
  
  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const _data = {
      ...data,
      finance: `${toNumberFixed(data.finance as string)}`
    }
    successFunction(_data as any)
    closeDialog && closeDialog()
  }

  const totalToAdd = React.useMemo(() => {
    if (!state || !state.totalFinanceMP) {
      return 0
    }
    return _.round(_.subtract(toNumberFixed(state.totalFinanceMP), getTotalAddedDueDates(state)), 2)
  }, [state])

  useEffect(() => {
    setFieldValue('finance',`${formatPrice(totalToAdd)}`,false)
  },[totalToAdd, setFieldValue])

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Due Date'}>
      <div className={'d-flex justify-content-start align-items-center'}>
        <div className={'font-smaller-5 color-primary text-upper'}>
                    Total to add :
        </div>
        <div className={'font-smaller-2 color-primary text-upper ml-2'}>
          {formatPrice(totalToAdd)}
        </div>
      </div>
      <div className={'d-flex flex-column hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-6'}>
            <DatePickerWithValidation
                            required
                            label={'Date'}
                            format={'dd-MM-yyyy'}
                            lined
                            helperText={'choose date'}
                            fullWidth
                            min-date={ new Date(state.date)}
                            validation={{
                              useValidation: validation,
                              model: 'date',
                              rule: {
                                required
                              }
                            }}
            />
          </div>
          <div className={'col-6'}>
            <InputTextWithValidation
                            required
                            align={'align-right'}
                            focusOnMount={true}
                            label={'Finance'}
                            lined
                            selectOnFocus
                            helperText={'enter finance'}
                            fullWidth
                            validation={{
                              useValidation: validation,
                              model: 'finance',
                              rule: {
                                required
                              },
                              format: {
                                rule: {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace: 2
                                  }
                                }
                              }
                            }}
            />
          </div>
          <div className={'col-md-12 '}>
            <InputTextWithValidation
                            label={'Description'}
                            lined
                            fullWidth
                            validation={{
                              useValidation: validation,
                              model: 'description'
                            }}
                            maxLength={32}
            />
          </div>

          <DialogButtonsSaveUpdate
                        cancelFun={handlerCancelDialog}
                        submitFun={handlerOnSubmit}
                        icon={faCalendarAlt}
          />
        </div>
      </div>
    </Paper>
  )
}

export default DueDateForm
