import React, { useState }      from 'react'
import ButtonsForm              from '../../../../components/Button/ButtonsForm'
import { useCalculationQuery }  from '../../../../graphql/graphql'
import Header                   from '../views/InstanceView/header/Header'
import Body                     from './Body'
import { SpinnerLoadingCenter } from '../../../../components/Spinner/SpinnerLoading'
import { easyDialogError }      from '../../../../components/EasyModel/EasyModal'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                               from '../../../../components/hooks/useExternalKeybaord'

interface ICalculationPreviewProps {
  closeDialog ?: () => void
  calculationId : string
  actionConfirm ?: () => void
}

const Preview = ({actionConfirm, closeDialog, calculationId} : ICalculationPreviewProps) => {

  const [headerState, setHeaderState] : [boolean, (r : boolean) => void] = useState(true as boolean)

  const {data, loading} = useCalculationQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: Number(calculationId)
    },
    skip: !calculationId
  })
  const calculation = React.useMemo(() => !data || !data.calculation ? {} as any : data.calculation, [data])

  const handlerOnSave =  () => {
    const financeDifference = 0
    if (financeDifference !== 0) {
      easyDialogError('The calculation cannot be booked. The financial calculation is not valid.')
      return
    }
    actionConfirm && actionConfirm()
    closeDialog && closeDialog()
  }

  const handlerOpenCloseHeader = () => {
    setHeaderState(!headerState)
  }

  const { setRef } = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc: closeDialog && closeDialog();break
    }
  }, true, [KeyboardEventCodes.Esc],'calculation-preview-dialog')

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'calculation-preview-root relative d-flex flex-column p-3 font-smaller-2'} ref={setRef}>
        {
          calculation || calculation.items ?
            (
              <>
                <div className={'mb-4 border-bottom border-light-0 pt-1'}>
                  <Header calculation={calculation} state={headerState} handlerOpenCloseHeader={handlerOpenCloseHeader}/>
                </div>

                {
                  calculation.items ?
                    <Body calculation={calculation} headerState={headerState}/>
                    : <></>

                }
                <div className={`d-flex w-100${actionConfirm ? ' justify-content-between' : ' justify-content-end'} pt-3`}>
                  {actionConfirm ? <div className={'col-md-3'}>
                    <ButtonsForm
                                                buttonsCancel={{
                                                  label: 'CANCEL',
                                                  color: 'danger',
                                                  action: closeDialog
                                                }}
                                                buttonSubmit={{
                                                  label: 'SAVE',
                                                  color: 'primary',
                                                  action: handlerOnSave
                                                }}
                                                term={{
                                                  label: 'Accept to finish this calculation.',
                                                  labelSize: 1,
                                                  labelColor: 'grey'
                                                }}
                    />
                  </div>
                    : <></>}
                </div>

              </>
            )
            : (<div>Calculation not exists in system. Try again.</div>)
        }
      </div>
    </>
  )
}

export default Preview
