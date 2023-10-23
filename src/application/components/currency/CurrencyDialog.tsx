import React               from 'react'
import CurrencyList        from './CurrencyList'
import { formatDateLong }  from '../../utils/Utils'
import { useCurrency }     from './useCurrency'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                          from '../../../components/EasyModel/EasyModal'
import { CenteredDialog }  from '../../../components/Dialog/DialogBasic'
import ConvertCurrencyForm from './ConvertCurrencyForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt }   from '@fortawesome/free-solid-svg-icons'

const CurrencyDialog = () => {

  const {activeCurrencies} = useCurrency(true)
    
  return (
    <div className={'d-flex flex-column hw-currency-dialog-root p-2'}>
      <div className={'font-smaller-1 d-flex justify-content-end pb-2'}>Date : {formatDateLong(new Date().toString())}</div>
      <CurrencyList currencies={activeCurrencies} noDeleteButton/>
    </div>
  )
    
}

export default CurrencyDialog

const CurrencyConverter = ({currencies} : {currencies : any}) => {
  
  return (
    <div>
      <div className={'d-flex font-smaller-2 align-items-center color-primary letter-spacing'}>
        <div className={'pr-2'}><FontAwesomeIcon icon={faExchangeAlt}/></div>
        <div>CONVERT CURRENCY</div>
      </div>
      <div className={'d-flex justify-content-between align-items-center border-top-double pt-2'}>
        <ConvertCurrencyForm currencies={currencies} />
      </div>
    </div>
  )
    
}

export const openDialogCurrency = () => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-calculation-save-45387400212'} closeFn={closeDialog}>
      <CenteredDialog
                title={'Currency'}
                closeAction={closeDialog}
                Component={CurrencyDialog}
      />
    </DialogModalRootComponent>)
  })
}