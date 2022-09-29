import React, {
  useEffect,
  useMemo
}                                 from 'react'
import InputTextWithValidation    from '../../../components/withValidation/InputTextWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                 from '../../../validation'
import {
  NormativeType,
  useNormativeQuery
}                                 from '../../../graphql/graphql'
import { useTranslationFunction } from '../../../components/Translation/useTranslation'
import { useNormativeDashboard }  from '../../../store/normative/useNormative'
import ItemShortView              from '../items/view/ItemShortView'
import DialogButtonsSaveUpdate    from '../_common/DialogButtonsSaveUpdate'
import { toNumberFixed }          from '../../utils/Utils'
import * as _                     from 'lodash'
import { processErrorGraphQL }    from '../../../apollo'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../components/EasyModel/EasyModal'
import { CenteredDialog }         from '../../../components/Dialog/DialogBasic'

interface INormativeFormProps {
  normativeId? : string
  cancelFun : () => void
  submitFun : ( item : NormativeType ) => Promise<any> | void
}

const NormativeForm = ( { cancelFun, submitFun, normativeId } : INormativeFormProps ) => {
  const { translate } = useTranslationFunction()
  const { selected } = useNormativeDashboard()
  const validation = useValidation<NormativeType>()
  const { setFieldValue } = validation

  const { data : _normative } = useNormativeQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( normativeId )
    },
    skip : !normativeId
  } )

  const normative = useMemo( () => !_normative || !_normative.normative ? void( 0 ) : _normative.normative, [_normative] )

  useEffect( () => {
    if (!normative) {
      setFieldValue('financeVP',`${selected.vp}`, true)
      return
    }
    if ( normative ) {
      normative.description && setFieldValue( 'description', `${ normative.description }`, false )
    }
  }, [normative, selected, setFieldValue] )

  const handlerOnSubmit = async () => {
    const { error, data, validations, refs } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    try {
      const obj = Object.assign( {
        description : data.description,
        financeVP : toNumberFixed( data.financeVP as any ),
        itemId : Number( selected.id )
      }, normativeId ? { id : normativeId } : {} )
      await submitFun( obj )
      cancelFun()
    } catch ( e ) {
      /** process the error */
      processErrorGraphQL( e, validation )
    }
  }

  return (
    <div className={ 'd-flex flex-column p-2' }>
      <div className={ 'd-flex flex-row justify-content-between align-items-center' }>
        <div className={ 'font-smaller-2 flex-2' }>
          <ItemShortView item={ selected }/>
        </div>
        <div className={ 'ml-2 hw-input-discount' }>
          <InputTextWithValidation
                validation={ {
                  useValidation : validation,
                  model : 'financeVP',
                  format : {
                    rule : FORMAT_CURRENCY_STANDARD,
                    validationMessage : 'Enter valid finance vp'
                  }
                } }
                readOnly
                align={ 'align-right' }
                label={ 'Finance VP' }
          />
        </div>
      </div>
      <div className={ 'w-100 pt-2' }>
        <InputTextWithValidation
              focusOnMount
              validation={ {
                useValidation : validation,
                model : 'description',
                rule : {
                  required : required( { message : translate( 'REQUIRED_FIELD' ) } )
                },
              } }
              selectOnFocus={ false }
              align={ 'align-left' }
              label={ translate( 'LABEL_DESCRIPTION' ) }
        />
      </div>
      <DialogButtonsSaveUpdate
            cancelFun={ cancelFun }
            submitFun={ handlerOnSubmit }
            update={ !!normative }
      />
    </div>
  )
}

export default NormativeForm

export const openDialogNormativeForm = ( { normativeId, submitFun } : { normativeId? : string, submitFun : ( data : any ) => Promise<any> } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const handlerCloseFunction = () => {
      closeDialog()
    }

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <NormativeForm
                cancelFun={ handlerCloseFunction }
                submitFun={ submitFun }
                normativeId={ normativeId }
          />
        )
      }
      return (
        <DialogModalRootComponent name={ 'dialog-normative-form-70807750740404' } closeFn={ handlerCloseFunction }>
          <CenteredDialog
                title={ normativeId ? 'Edit normative' : 'Define new normative' }
                closeAction={ handlerCloseFunction }
                Component={ ComponentToRender }
          />
        </DialogModalRootComponent>
      )
    }
    openDialog( <Component/> )
  } )
}