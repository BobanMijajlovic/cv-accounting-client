import React, {
  useEffect,
  useMemo,
  useState
}                                  from 'react'
import {
  TBankAccount,
  TBankTransactionItemType
}                                  from '../../../../../../graphql/type_logic/types'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                  from '../../../../../../validation'
import BankAccountViewShort        from '../../../../banks/view/BankAccountView'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                  from '../../../../../../components/hooks/useExternalKeybaord'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }          from '../../../../../../components/Dialog/DialogBasic'
import InputTextWithValidation     from '../../../../../../components/withValidation/InputTextWithValidation'
import DatePickerWithValidation    from '../../../../../../components/withValidation/DatePickerWithValidation'
import _                           from 'lodash'
import {
  formatPrice,
  toNumberFixed
}                                  from '../../../../../utils/Utils'
import { FOCUS_ID }                from '../../../../../constants/FocusElementIDs'
import AutoCompleteFindBankAccount from '../../../../autocomplete/AutoCompleteFindBankAccount'
import { useBankTransactionForm }  from '../../../../../../store/bank-transaction/useBankTransaction'
import { FontAwesomeIcon }         from '@fortawesome/react-fontawesome'
import {
  faLevelDownAlt,
  faTimes,
  faUniversity
}                                  from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut              from '../../../../../../components/Button/ButtonShortcut'
import ConditionalRendering        from '../../../../../../components/Util/ConditionalRender'
import Switch                      from '../../../../../../components/Switch/Switch'

const BankTransactionForm = ( { bankHeaderTransactionId } : { bankHeaderTransactionId : string } ) => {

  const { bankTransaction, insertBankTransactionItem, updateBankTransactionItem, selectedBankTransactionItemId, setSelectBankTransactionItem } = useBankTransactionForm( bankHeaderTransactionId )

  const validation = useValidation<TBankTransactionItemType>( {} )
  const [check, setCheck] : [ boolean, ( b : boolean ) => void ] = useState( false as boolean )

  const [resetValidation, setResetValidation] = useState( { reset : false } )
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )
  const [focusAutocomplete, setFocusAutoComplete] : [ boolean, ( b : boolean ) => void ] = useState( false as boolean )

  const { state, setFieldValue, getFieldRef, resetValidations } = validation

  const bankTransactions = useMemo( () => bankTransaction && bankTransaction.bankTransactions ? bankTransaction.bankTransactions : [], [bankTransaction] )

  const lastDateProcessed = useMemo( () => bankTransactions.length !== 0 ? bankTransactions[bankTransactions.length - 1].dateProcessed : new Date().toISOString(), [bankTransactions] )
  const lastDatePaid = useMemo( () => bankTransactions.length !== 0 ? bankTransactions[bankTransactions.length - 1].datePaid : new Date().toISOString(), [bankTransactions] )


  
  useEffect(() => {
    if (!selectedBankTransactionItemId) {
      return 
    }
    const fieldRef = getFieldRef('finance')
    fieldRef && fieldRef.ref && fieldRef.ref.current && fieldRef.ref.current.focus()
  }, [selectedBankTransactionItemId])

  useEffect( () => {
    if ( !selectedBankTransactionItemId ) {
      resetValidations(true)
      if (bankTransactions.length !== 0) {
        setFieldValue( 'dateProcessed', `${ _.get(bankTransactions[bankTransactions.length - 1],'dateProcessed', new Date().toISOString()) }`, true )
        setFieldValue( 'datePaid', `${ _.get(bankTransactions[bankTransactions.length - 1],'datePaid', new Date().toISOString()) }`, true )
      }
      return
    }
    const bankTransaction = bankTransactions.find( x => x.id === selectedBankTransactionItemId )

    if ( !bankTransaction ) {
      setFieldValue( 'dateProcessed', new Date().toISOString() , true )
      setFieldValue( 'datePaid',  new Date().toISOString(), true )
      return
    }
    if ( bankTransaction.bankAccount ) {
      setFieldValue( 'bankAccount', bankTransaction.bankAccount as any, false )
    }
    if (bankTransaction.transactionAdditionalData) {
      ['code', 'modelString', 'description', 'transactionKey'].forEach( ( s : string ) => _.get( bankTransaction, `transactionAdditionalData.${s}` ) ? setFieldValue( `additionalData.${s}`, _.get( bankTransaction, `transactionAdditionalData.${s}` ).toString(), false ) : null )
    }
    if ( bankTransaction.finance ) {
      setFieldValue( 'finance', `${ formatPrice( bankTransaction.finance ) }`, true )
    }
    
    if (typeof bankTransaction.flag === 'number') {
      setCheck( !!bankTransaction.flag )
    }

    ['bankAccountId', 'dateProcessed', 'datePaid', 'expenses'].forEach( ( s : string ) => _.get( bankTransaction, s ) ? setFieldValue( s, _.get( bankTransaction, s ).toString(), false ) : null )

    setFocusAutoComplete( true )
  }, [selectedBankTransactionItemId, setCheck, setFieldValue] )

  useEffect( () => {
    setResetValidation( { reset : false } )
    setFocusAutoComplete( false )
    if ( bankTransactions.length !== 0 ) {
      setFieldValue( 'dateProcessed', `${ bankTransactions[bankTransactions.length - 1].dateProcessed }`, true )
      setFieldValue( 'datePaid', `${ _.get(bankTransactions[bankTransactions.length - 1],'datePaid', new Date().toISOString()) }`, true )
      return
    }
    setFieldValue( 'dateProcessed', new Date().toISOString() , true )
    setFieldValue( 'datePaid',  new Date().toISOString(), true )
  }, [bankTransactions, setFieldValue, setResetValidation, setFocusAutoComplete, selectedBankTransactionItemId, resetValidations] )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )

  const handlerSetFocus = React.useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }, [getFieldRef] )

  const handlerOwesClaims = ( e : any ) => {
    setCheck( e.target.value )
    handlerSetFocus( 'value' )
  }

  /* const handlerOwesClaims = () => {
    setCheck( !check )
    handlerSetFocus( 'value' )
  }*/
  const handlerInsertItem = async () => {
    const { error, data, validations, refs } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if ( !data.bankAccount ) {
      return
    }

    const additionalData = data.additionalData as any

    const _data = {
      ..._.omit( data, ['accountSearch', 'bankAccount'] ),
      bankAccountId : Number( ( data.bankAccount as any ).id ),
      customerId : Number( _.get( data.bankAccount, 'customer.id' ) ),
      finance : toNumberFixed( data.finance as number ),
      flag : Number( !check ),
      expenses : data.expenses ? toNumberFixed( data.expenses ) : void( 0 ),
      additionalData :  additionalData && (additionalData.code || additionalData.modelString || additionalData.transactionKey || additionalData.description ||  !Number(( data.bankAccount as any ).id)) ?
        Object.assign( data.additionalData, !Number( ( data.bankAccount as any ).id ) ? { accountNumber : data.accountSearch } : {} ) 
        : void(0)
    } as any


    if (selectedBankTransactionItemId) {
      await updateBankTransactionItem(_data)
      setSelectBankTransactionItem(void(0))
    } else {
      await insertBankTransactionItem( _data )
    }
    setFocusAutoComplete( true )
    setResetValidation( { reset : true } )
    await resetValidations( true )
  }

  const processSelected = ( object : TBankAccount | string ) => {
    if ( typeof object !== 'object' ) {
      setFieldValue( 'additionalData.accountNumber', object, false )
    } else {
      setFieldValue( 'bankAccount', object as any, false )
    }
    handlerSetFocus( 'finance' )
  }

  const handlerCancelEditForm = async () => {
    setSelectBankTransactionItem(void(0))
    await resetValidations(true)
    setResetValidation( { reset : true } )
    setFocusAutoComplete( true )
  }
  
  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      /* case KeyboardEventCodes.F2:
        handlerOwesClaims()
        return*/
      case KeyboardEventCodes.Enter:
        e.preventDefault()
        handlerInsertItem().then()
        break
      case KeyboardEventCodes.Esc:
        e.preventDefault()
        if (selectedBankTransactionItemId) {
          handlerCancelEditForm().then()
        }
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.Enter, KeyboardEventCodes.Esc], 'bank-transaction-item-form' )

  return (
    <div className={ 'relative px-3 py-2 w-100 hw-bank-transaction-items-root' } ref={ setRef }>
      <div className={ 'd-flex flex-row justify-content-between align-items-center pb-2' }>
        <div className={ 'd-flex align-items-center' }>
          <div className={ 'color-primary pt-1' }><FontAwesomeIcon className={ 'pr-2 font-smaller-2 ' } style={ { fontSize : 20 } } icon={ faUniversity }/></div>
          <div className={ 'color-primary font-smaller-5' }>BANK TRANSACTION</div>
        </div>
        <div className={'d-flex'}>
          <ButtonShortcut
              icon={ faLevelDownAlt }
              label={ !selectedBankTransactionItemId ? 'add' : 'save' }
              onClick={ handlerInsertItem }/*
           style={ { minWidth : '40px' } }*/
              classNames={ 'hw-shortcut-button primary sm hw-button-border-color hw-shortcut-button-rotate-icon' }
          />
          <ConditionalRendering condition={!!selectedBankTransactionItemId} >
            <ButtonShortcut
                icon={ faTimes }
                label={ 'cancel' }
                onClick={ handlerCancelEditForm }/*
                style={ { minWidth : '40px' } }*/
                classNames={ 'hw-shortcut-button danger sm hw-button-border-color hw-shortcut-button-rotate-icon ml-2' }
            />
          </ConditionalRendering>
        </div>
       
      </div>
      <div className={ 'd-flex justify-content-between align-items-center w-100' }>
        <div className={ 'd-flex flex-column flex-1 customer-bank-account-part' }>
          <AutoCompleteFindBankAccount focusOnMount focus={ focusAutocomplete } processSelected={ processSelected } resetData={ resetValidation.reset } label={ 'search by account num #' }/>
          <BankAccountViewShort bankAccount={ state?.bankAccount as any } namePlaceholder={ 'BANK ACCOUNT' } classNames={ 'bank-account-short-view-root' }/>
        </div>
        <div className={ 'd-flex flex-column flex-2' }>
          <div className={ 'd-flex justify-content-between w-100 color-primary relative bank-transaction-part' }>

            <DatePickerWithValidation
                            format={ 'dd/MM/yyyy' }
                            helperText={ '' }
                            date={ lastDateProcessed }
                            lined
                            fullWidth
                            label={ 'Date processed' }
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'dateProcessed',
                              rule : {
                                required
                              }
                            } }
            />

            <DatePickerWithValidation
                            date={ lastDatePaid }
                            format={ 'dd/MM/yyyy' }
                            helperText={ '' }
                            lined
                            fullWidth
                            label={ 'Date paid' }
                            align={ 'align-center' }
                            validation={ {
                              useValidation : validation,
                              model : 'datePaid',
                              rule : {
                                required
                              }
                            } }
            />

            <div className={ ' relative' }>
              <div className={ 'hw-bank-transaction-flag font-smaller-5' }>
                <Switch labelOn={'Claims'} size={'sm'} labelOff={'Owes'} value={check} onChange={handlerOwesClaims}/>
              </div>
              <InputTextWithValidation
                                required
                                label={ 'Finance' }
                                helperText={ '' }
                                lined
                                fullWidth
                                selectOnFocus
                                align={ 'align-right' }
                                validation={ {
                                  useValidation : validation,
                                  model : 'finance',
                                  rule : {
                                    required
                                  },
                                  format : {
                                    rule : {
                                      ...FORMAT_CURRENCY_STANDARD,
                                      ...{
                                        decimalPlace : 2
                                      }
                                    }
                                  }
                                } }
              />
            </div>

            <InputTextWithValidation
                            label={ 'Expense' }
                            helperText={ '' }
                            lined
                            fullWidth
                            selectOnFocus
                            align={ 'align-right' }
                            validation={ {
                              useValidation : validation,
                              model : 'expenses',
                              format : {
                                rule : {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace : 2
                                  }
                                }
                              }
                            } }
            />

          </div>
          <div className={ 'd-flex flex-row w-100 justify-content-between align-items-center bank-transaction-part' }>
            <div className={ 'hw-bank-transaction-code-input' }>
              <InputTextWithValidation
                                label={ 'Code' }
                                helperText={ '' }
                                lined
                                fullWidth
                                selectOnFocus
                                maxLength={ 3 }
                                align={ 'align-center' }
                                validation={ {
                                  useValidation : validation,
                                  model : 'additionalData.code'
                                } }
              />
            </div>
            <InputTextWithValidation
                            label={ 'Description' }
                            helperText={ '' }
                            lined
                            fullWidth
                            selectOnFocus
                            validation={ {
                              useValidation : validation,
                              model : 'additionalData.description'
                            } }
            />
            <InputTextWithValidation
                            label={ 'Model' }
                            helperText={ '' }
                            lined
                            fullWidth
                            selectOnFocus
                            validation={ {
                              useValidation : validation,
                              model : 'additionalData.modelString'
                            } }
            />
            <InputTextWithValidation
                            label={ 'Transaction' }
                            helperText={ '' }
                            lined
                            fullWidth
                            selectOnFocus
                            validation={ {
                              useValidation : validation,
                              model : 'additionalData.transactionKey'
                            } }
            />
          </div>
        </div>

        {/* <div className={ 'd-flex justify-content-between flex-column align-items-center w-100' }>
                 <div className={ 'd-flex justify-content-between w-100 color-primary relative' }>
                 <div className={ 'd-flex flex-row flex-2 justify-content-around' }>
                 <div className={ 'hw-input-calendar-input' }>
                 <DatePickerWithValidation
                 format={ 'dd/MM/yyyy' }
                 helperText={ '' }
                 lined
                 fullWidth
                 label={ 'Date processed' }
                 align={ 'align-center' }
                 validation={ {
                 useValidation : validation,
                 model : 'dateProcessed',
                 rule : {
                 required
                 }
                 } }
                 />
                 </div>
                 <div className={ 'hw-input-calendar-input' }>
                 <DatePickerWithValidation
                 format={ 'dd/MM/yyyy' }
                 helperText={ '' }
                 lined
                 fullWidth
                 label={ 'Date paid' }
                 align={ 'align-center' }
                 validation={ {
                 useValidation : validation,
                 model : 'datePaid',
                 rule : {
                 required
                 }
                 } }
                 />
                 </div>
                 <div className={ 'hw-input-calendar-input relative' }>
                 <div className={ 'hw-bank-transaction-flag font-smaller-5' }>
                 <div onClick={ handlerOwes } className={ `${ !check ? 'active' : '' }` }>Owes</div>
                 <div onClick={ handlerClaims } className={ `${ check ? 'active' : '' }` }>Claims</div>
                 </div>
                 <InputTextWithValidation
                 required
                 label={ 'Finance' }
                 helperText={ '' }
                 lined
                 fullWidth
                 selectOnFocus
                 align={ 'align-right' }
                 validation={ {
                 useValidation : validation,
                 model : 'value',
                 rule : {
                 required
                 },
                 format : {
                 rule : {
                 ...FORMAT_CURRENCY_STANDARD,
                 ...{
                 decimalPlace : 2
                 }
                 }
                 }
                 } }
                 />
                 </div>
                 <div className={ 'hw-bank-transaction-expenses-input' }>
                 <InputTextWithValidation
                 label={ 'Expense' }
                 helperText={ '' }
                 lined
                 fullWidth
                 selectOnFocus
                 align={ 'align-right' }
                 validation={ {
                 useValidation : validation,
                 model : 'expenses',
                 format : {
                 rule : {
                 ...FORMAT_CURRENCY_STANDARD,
                 ...{
                 decimalPlace : 2
                 }
                 }
                 }
                 } }
                 />
                 </div>
                 <div className={ 'hw-bank-transaction-code-input' }>
                 <InputTextWithValidation
                 label={ 'Code' }
                 helperText={ '' }
                 lined
                 fullWidth
                 selectOnFocus
                 align={ 'align-center' }
                 validation={ {
                 useValidation : validation,
                 model : 'code'
                 } }
                 />
                 </div>
                 </div>
                 </div>
                 <div className={ 'd-flex flex-row w-100 justify-content-between align-items-center' }>
                 <AutoCompleteFindBankAccount processSelected={ processSelected } classNames={ 'flex-1 pr-2' }/>
                 <div className={ 'flex-1 pr-2' }>
                 <InputTextWithValidation
                 label={ 'Description' }
                 helperText={ '' }
                 lined
                 fullWidth
                 selectOnFocus
                 validation={ {
                 useValidation : validation,
                 model : 'description'
                 } }
                 />
                 </div>
                 <div className={ 'flex-1 pr-2' }>
                 <InputTextWithValidation
                 label={ 'Model' }
                 helperText={ '' }
                 lined
                 fullWidth
                 selectOnFocus
                 validation={ {
                 useValidation : validation,
                 model : 'modelString'
                 } }
                 />
                 </div>
                 <div className={ 'flex-1 pr-2' }>
                 <InputTextWithValidation
                 label={ 'Transaction' }
                 helperText={ '' }
                 lined
                 fullWidth
                 selectOnFocus
                 validation={ {
                 useValidation : validation,
                 model : 'transactionKey'
                 } }
                 />
                 </div>
                 </div>
                 </div>*/ }

      </div>
    </div>
  )
}

export default BankTransactionForm

export interface IDialogBankTransactionFormProps {
  submitFunc : ( bankTransaction : TBankTransactionItemType ) => void
  bankTransaction? : TBankTransactionItemType
  bankTransactions? : TBankTransactionItemType[]
}

export const openDialogBankTransactionForm = ( { submitFunc, bankTransaction, bankTransactions } : IDialogBankTransactionFormProps ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-bank-transaction-insert-form-17651075619207206597074526' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Bank Transaction' }
                closeAction={ closeDialog }
                Component={ BankTransactionForm }
                componentRenderProps={ {
                  submitFunc,
                  bankTransactions,
                  bankTransaction,
                  cancelFunc : closeDialog
                } }
      />
    </DialogModalRootComponent> )
  }, FOCUS_ID.BANK_TRANSACTION.INSERT_FORM.ADD_NEW_BUTTON )
}
