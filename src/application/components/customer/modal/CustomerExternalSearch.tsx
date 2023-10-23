import React, {
  useEffect,
  useState
}                                  from 'react'
import { TCustomer }               from '../../../../graphql/type_logic/types'
import ExternalSearchByTin         from './form/ExternalSearchByTin'
import CustomerView                from '../views/CustomerView'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }          from '../../../../components/Dialog/DialogBasic'
import ExternalSearchByName        from './form/ExternalSearchByName'
import DialogButtonsSaveUpdate     from '../../_common/DialogButtonsSaveUpdate'
import { processErrorGraphQL }     from '../../../../apollo'
import {
  useCustomerQuery,
  useInsertExternalCustomerByTinMutation
}                                  from '../../../../graphql/graphql'
import ExternalSearchByBankAccount from './form/ExternalSearchByBankAccount'
import { useTranslationFunction }  from '../../../../components/Translation/useTranslation'

type TErrorState = boolean | string

const CustomerExternalSearch = ({cancelFunction, submitFun} : { cancelFunction : () => void, submitFun? : (customer : TCustomer) => void }) => {
  const { translate } = useTranslationFunction()
  const [mutationInsertExternalCustomer] = useInsertExternalCustomerByTinMutation()
  const [state, setState] : [TCustomer, (c : TCustomer) => void] = useState({} as TCustomer)
  const [error, setError] : [TErrorState, (s : TErrorState) => void] = useState(false as TErrorState)
  const [newID, setId] = useState(0)

  useCustomerQuery({
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    onCompleted : (data) => {
            //  data && data.customer && setSelected(data.customer as TCustomer)
    },
    variables : {
      id : Number(newID)
    },
    skip : !!newID
  })

  const setCustomer = (data : any) => {
    setState(data)
  }

  useEffect(() => {
    if (state) {
      setError(false)
    }
  }, [state])

  const handlerOnSubmit = () => {
    if (!state || !state.taxNumber) {
      setError(translate('CUSTOMER_EXTERNAL_SEARCH_NOT_SET_CRITERIA'))
      return
    }

    mutationInsertExternalCustomer({
      variables : {
        value : `${ state.taxNumber }`
      }
    })
      .then(v => {
        if (!v || !v.data || !v.data.customer || !v.data.customer.id) {
          setError(translate('CUSTOMER_EXTERNAL_SEARCH_ERROR_NOT_ADDED'))
          return
        }
                // setSelected(v.data.customer as TCustomer)
        submitFun && submitFun(v.data.customer as TCustomer)
        setId(+v.data.customer.id)
        cancelFunction()
      })
      .catch(e => {
        processErrorGraphQL(e, {})
      })

  }

  return (
    <div className={ 'd-flex flex-column p-2 relative hw-customer-external-search-root' }>
      <ExternalSearchByBankAccount processSelected={ setCustomer }/>
      <ExternalSearchByTin processSelected={ setCustomer }/>
      <ExternalSearchByName processSelected={ setCustomer } helperText={translate('CUSTOMER_EXTERNAL_SEARCH_BY_NAME_HELPER_TEXT')}/>
      <div className={ 'd-flex flex-column' }>
        <CustomerView customer={ state }/>
      </div>
      {
        error ?
          <div className={ 'error-area' }>
            { error }
          </div>
          :
          <>&nbsp;</>
      }
      <div>
        <DialogButtonsSaveUpdate
                    cancelFun={ cancelFunction }
                    submitFun={ handlerOnSubmit }
        />
      </div>
    </div>
  )

}

export default CustomerExternalSearch

export const openDialogCustomerExternalSearch = ({submitFun} : { submitFun? : (customer : TCustomer) => void }) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    openDialog(<DialogModalRootComponent name={ 'dialog-customer-external-find-000011515155' } closeFn={ closeDialog }>
      <CenteredDialog
                title={'CUSTOMER_EXTERNAL_SEARCH_DIALOG_TITLE'}
                closeAction={ closeDialog }
                Component={ CustomerExternalSearch }
                componentRenderProps={ {
                  cancelFunction : closeDialog,
                  submitFun
                } }
      />
    </DialogModalRootComponent>)
  })
}