import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
}                                              from 'react'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                              from '../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                              from '../../../../components/Dialog/DialogBasic'
import BankHeaderTransaction                   from './header/Header'
import { TBankHeaderTransactionType }          from '../../../../graphql/type_logic/types'
import { useClient }                           from '../../../../store/client/useClient'
import BankTransactionForm                     from './items/form/BankTransactionForm'
import TransactionTable                        from './items/TransactionTable'
import { useAppBar }                           from '../../../hooks/useAppBar'
import {
  faBook,
  faSearch,
  faUniversity,
  faUpload
}                                              from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                  from '../../../../components/hooks/useExternalKeybaord'
import { useTranslationFunction }              from '../../../../components/Translation/useTranslation'
import { openDialogBankHeaderTransactionForm } from './header/Form'
import {
  useUpdateBankHeaderTransactionsMutation,
  useUploadBankReportMutation
}                                              from '../../../../graphql/graphql'
import { processErrorGraphQL }                 from '../../../../apollo'
import {
  useBankTransactionForm,
  useBankTransactionTabs
}                                              from '../../../../store/bank-transaction/useBankTransaction'
import AccountBalance                          from './header/AccountBalance'
import { openDialogPreviewBankTransaction }    from '../preview/Preview'
import { guid }                                from '../../../utils/Utils'
import { SpinnerLoadingCenter }                from '../../../../components/Spinner/SpinnerLoading'
import ButtonUpload                            from '../../../../components/Button/ButtonUpload'

const MainFormBankTransaction = ( { bankHeaderTransactionId } : { bankHeaderTransactionId : string } ) => {

  const { translate } = useTranslationFunction()
  const { removeTab } = useBankTransactionTabs()
  const { bankTransaction, refetchBankTransaction, finishBankTransaction } = useBankTransactionForm( bankHeaderTransactionId )
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()
  const [mutationUpdateBankTransaction] = useUpdateBankHeaderTransactionsMutation()
  const [file, setFile] : [ any, ( f : any ) => void ] = useState()
  const [uploadBankReport, { loading : fileUploadLoading }] = useUploadBankReportMutation()
  const { banks } = useClient()

  const handlerUpdateBankHeaderTransaction = useCallback( async ( bankHeaderTransaction : TBankHeaderTransactionType ) => {
    await mutationUpdateBankTransaction( {
      variables : {
        data : bankHeaderTransaction,
        id : Number( bankHeaderTransactionId )
      }
    } )
      .then( ( v ) => {
        if ( v.data && v.data.bankHeaderTransaction.id ) {
          refetchBankTransaction().then()
        }
      } )
      .catch( e => {
        processErrorGraphQL( e )
      } )
  }, [bankHeaderTransactionId] )

  const handlerFinishBankTransaction = async () => {
    await finishBankTransaction()
      .then( ( v ) => {
        removeTab( bankHeaderTransactionId )
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const appBarButtons = useMemo( () => {
    const arr = [
      {
        label : translate( 'LABEL_HEADER' ),
        icon : faUniversity,
        shortcut : KeyboardEventCodes.F4,
        onClick : () => openDialogBankHeaderTransactionForm( {
          handlerSuccess : handlerUpdateBankHeaderTransaction,
          bankHeaderTransactionId
        } )
      }
    ]
    return [
      ...arr,
      {
        label : translate( 'LABEL_PREVIEW' ),
        icon : faSearch,
        shortcut : KeyboardEventCodes.F9,
        onClick : () => openDialogPreviewBankTransaction( {
          bankHeaderTransactionId
        } )
      },
      {
        label : translate( 'LABEL_FINISH' ),
        color : 'success',
        icon : faBook,
        classNames : 'ml-5',
        shortcut : KeyboardEventCodes.F12,
        onClick : () => openDialogSaveBankTransaction( {
          actionConfirm : handlerFinishBankTransaction
        } )
      }
    ]

  }, [bankTransaction, bankHeaderTransactionId] )

  useEffect( () => {
    const id = setButtonsForPage( appBarButtons as any )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, translate, bankTransaction] )

  useEffect( () => {
    if ( !file ) {
      return
    }
    file && uploadBankReport( { variables : { file, id : Number( bankHeaderTransactionId ) } } )
      .then( ( data ) => {
        refetchBankTransaction().then()
        setFile( void( 0 ) )
      } )
      .catch( ( e ) => {
        processErrorGraphQL( e, {} )
        setFile( void( 0 ) )
      } )
  }, [file] )

  const handlerParsePdf = ( e : any ) => {
    const {
      target : {
        validity,
        files : [file]
      }
    } = e
    if ( !file ) {
      return
    }
    validity.valid && setFile( file )
  }

  return (
    <>
      { fileUploadLoading ? <SpinnerLoadingCenter/> : null }
      <div className={ 'd-flex flex-column w-100' }>
        <BankHeaderTransaction bankHeaderTransactionId={ bankHeaderTransactionId }/>
        <div className={ 'd-flex relative justify-content-between align-items-center w-100 border bg-light mt-2' }>
          <div className={ 'flex-2' }><BankTransactionForm bankHeaderTransactionId={ bankHeaderTransactionId }/></div>
          <AccountBalance bankHeaderTransactionId={ bankHeaderTransactionId }/>
          <div className={ 'hw-bank-transaction-upload-file-button' }>
            <ButtonUpload
                  label={ 'Upload' }
                  onChange={ handlerParsePdf }
                  icon={ faUpload }
                  value={file && file.filename ? file.filename : ''}
                  size={ 'sm' }
            />
          </div>
        </div>

        <div className={ 'flex-2 pt-3' }>
          <TransactionTable bankHeaderTransactionId={ bankHeaderTransactionId }/>
        </div>
      </div>
    </>
  )
}

export default MainFormBankTransaction

export interface IOpenDialogBankAccount {
  submitFun : ( bankTransaction : TBankHeaderTransactionType ) => Promise<any>
}

export const openDialogSaveBankTransaction = ( { actionConfirm } : { actionConfirm : () => Promise<any> } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const Component = () => {
      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to finish this transaction? '
      ], [] )

      const handlerConfirm = async () => {
        await actionConfirm()
        closeDialog()
      }

      return (
        <DialogComponentQuestions
              closeFun={ closeDialog }
              confirmFun={ handlerConfirm }
              messages={ messages }
        />
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-bank-transaction-save-5618590540500815' } closeFn={ closeDialog }>
      <CenteredDialog
          title={ 'FINISH BANK TRANSACTION' }
          closeAction={ closeDialog }
          Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}

