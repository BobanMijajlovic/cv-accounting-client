import React, {
  useEffect,
  useState
}                                 from 'react'
import InputTextWithValidation    from '../../../../components/withValidation/InputTextWithValidation'
import {
  IFieldsRefs,
  required,
  useValidation
}                                 from '../../../../validation'
import { CategoryType }           from '../../../../graphql/graphql'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'
import TextAreaWithValidation     from '../../../../components/withValidation/TextAreaWithValidation'
import DialogButtonsSaveUpdate    from '../../_common/DialogButtonsSaveUpdate'
import * as _                     from 'lodash'
import { get as _get }            from 'lodash'
import { useCategory }            from '../../../../store/category/useCategory'
import { TCategory }              from '../../../../graphql/type_logic/types'
import { FOCUS_ID }               from '../../../constants/FocusElementIDs'
import { _focusElementAfter }     from '../../../../components/EasyModel/EasyModal'

interface ICategoryFormProps {
  cancelFun ?: ()=> void
  successFunc : (data:any)=> Promise<any>
  category?: TCategory
  reset ?: boolean
}

const CategoryForm = ({category, cancelFun, successFunc, reset}:  ICategoryFormProps) => {
    
  const {treeView } = useCategory()
  const {checked} = treeView  

  const { translate } = useTranslationFunction()
  const validation = useValidation<CategoryType>()
  const {INPUT_NAME} = FOCUS_ID.SETTINGS.CATEGORY
  const { resetValidations, setFieldValue } = validation
    
  const handlerCancelFunction = () => {
    resetValidations( true )
    cancelFun  && cancelFun()
  }

  useEffect(() => {
    if (!category) {
      reset  && resetValidations( true )
      return
    }
    
    ['name', 'slug', 'description'].forEach((s: string) => _.get(category, s) ? setFieldValue(s, _.get(category, s).toString(), false) : null)
    _focusElementAfter(INPUT_NAME)
  },[category, setFieldValue, _focusElementAfter, INPUT_NAME, reset])

  const handlerSubmit = async () => {
    const { data, error, validations, refs } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    const _data = {
      ...data,
      parentId: Number(checked),
    }
    await successFunc(_data)
    await resetValidations(true)
    cancelFun  && cancelFun()
  }

  return (
    <div className={ 'hw-settings-category-form' }>
      <div className={ 'd-flex flex-row align-items-center pb-3 color-primary font-smaller-2' }> 
        {category ? 'Update category ' : 'Add new category' }
      </div>
      <InputTextWithValidation
                required
                selectOnFocus
                label={ 'Name' }
                focusId={INPUT_NAME}
                fullWidth
                helperText={ 'enter category name' }
                validation={ {
                  useValidation : validation,
                  model : 'name',
                  rule : {
                    required : required( { message : translate( 'REQUIRED_FIELD' ) } )
                  }
                } }
      />

      <InputTextWithValidation
                selectOnFocus
                label={ 'Slug' }
                fullWidth
                helperText={ 'enter slug' }
                validation={ {
                  useValidation : validation,
                  model : 'slug'
                } }
      />

      <TextAreaWithValidation
                label={ 'Description' }
                helperText={ '' }
                fullWidth
                rows={ 6 }
                useHelpText={ false }
                validation={ {
                  useValidation : validation,
                  model : 'description'
                } }
      />

      <DialogButtonsSaveUpdate
                submitBtnLabel={ 'Add new' }
                cancelBtnLabel={ 'Clear' }
                update={!!category}
                cancelFun={ handlerCancelFunction }
                submitFun={ handlerSubmit }
      />

    </div>
  )
}

export default CategoryForm