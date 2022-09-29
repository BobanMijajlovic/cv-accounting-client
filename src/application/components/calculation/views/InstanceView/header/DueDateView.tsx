import React, { useEffect }       from 'react'
import DueDateRow                 from '../common/DueDateRow'
import { IDueDateRecord }         from '../../../modal/DocumentHeaderForm'
import { useTranslationFunction } from '../../../../../../components/Translation/useTranslation'
import _                          from 'lodash'
import { formatPrice }            from '../../../../../utils/Utils'
import ConditionalRendering       from '../../../../../../components/Util/ConditionalRender'

const DueDateView = ({ dueDate = [], total = 0 }: { dueDate: any, total?: number }) => {
  const { translate } = useTranslationFunction()

  const totalByDueDate = React.useMemo(() => {
    return _.round(dueDate.reduce((acc: number, x: any) => _.add(acc, x.finance), 0), 2)
  }, [dueDate])

  const needWarning = React.useMemo(() => {
    return totalByDueDate && total && totalByDueDate !== total
  }, [totalByDueDate, total])

  if (!dueDate || dueDate.length === 0) {
    return (<div className={'opacity-6 mr-2 text-upper d-flex flex-column font-smaller-2 '}>
      <div className={'text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}> {translate('DUE_DATE_VIEW_TH_DUE_DATE')}:</div>
      <div className={'font-smaller-5'}> {translate('DUE_DATE_VIEW_TEXT_NO_DUE_DATES')} </div>
    </div>)
  }
  return (
    <div className={'d-flex flex-column relative calculation-due-date-preview-root pt-2'} style={{ minWidth: 300, maxWidth: 350 }}>
      <small className={'hw-additional-expenses_label text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>{translate('INVOICE_DUE_DATE_DIALOG_TITLE')}: </small>
      <div className={'d-flex flex-row opacity-4 border-bottom border-width-2 border-color-blue-light pb-1 mb-1 '}>
        <div style={{ width: 80 }} className={'font-smaller-5 due-date-title text-upper'}>{translate('DUE_DATE_VIEW_TH_DUE_DATE')}</div>
        <div className={'font-smaller-5 col-8 text-center text-upper'}>{translate('DUE_DATE_VIEW_TH_FINANCE')}</div>
      </div>
      <div className={'d-flex flex-column'}>
        {
          dueDate.map((dueDate: IDueDateRecord, key: number) => {
            return (
              <DueDateRow dueDate={dueDate} key={key}/>
            )
          })
        }

        <ConditionalRendering condition={dueDate.length > 1}>
          <div className={'d-flex align-items-center justify-content-between background-primary mt-1 px-1'}>
            <div className={'text-left font-smaller-5 font-weight-bold pl-2 text-upper'}>{translate('INVOICE_DUE_DATE_TOTAL')}</div>
            <div className={'text-right px-1 flex-1 font-smaller-2 font-weight-bold'}>
              {formatPrice(totalByDueDate)}
            </div>
          </div>
        </ConditionalRendering>

        <ConditionalRendering condition={!!needWarning}>
          <div className={'d-flex align-items-center justify-content-between error background-danger mt-1 px-1'}>
            <div className={'text-left font-smaller-5 font-weight-bold pl-2 text-upper'}>{translate('INVOICE_DUE_DATE_NEED_MORE_EXC')}</div>
            <div className={'text-right px-1 flex-1 font-smaller-2 font-weight-bold'}>
              {formatPrice(total)}
            </div>
          </div>
        </ConditionalRendering>

      </div>
    </div>

  )
}

export default DueDateView
