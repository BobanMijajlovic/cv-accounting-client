import React, {useEffect}       from 'react'
import {
  IFieldsRefs,
  required,
  useValidation
}                               from '../../../../validation'
import {TWarehouse}             from '../../../../graphql/type_logic/types'
import DialogButtonsSaveUpdate  from '../../_common/DialogButtonsSaveUpdate'
import {faWarehouse}            from '@fortawesome/free-solid-svg-icons'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}         from '../../../../components/Dialog/DialogBasic'
import InputTextWithValidation  from '../../../../components/withValidation/InputTextWithValidation'
import {
  CONSTANT_WAREHOUSE,
  WAREHOUSE_TYPES
}                               from '../../../constants'
import SelectTextWithValidation from '../../../../components/withValidation/SelectTextWithValidation'
import { useWarehouse }         from '../../../../store/warehouse/useWarehouse'
import {get as _get} from 'lodash'

export interface IWarehouseFormProps {
  warehouseId : string,
  cancelFun : () => void
  submitFun : (warehouse : TWarehouse) => Promise<any>
}

const WarehouseForm = ({cancelFun, submitFun, warehouseId} : IWarehouseFormProps) => {
  const {data: warehouses} = useWarehouse(warehouseId)
    
  const warehouse = React.useMemo(() => _get(warehouses,['warehouse']),[warehouses])
  const validation = useValidation<TWarehouse>()
  const {setFieldValue} = validation
  useEffect(() => {
    if (!warehouse) {
      setFieldValue('flag',`${WAREHOUSE_TYPES.WHOLESALE}`,false)
      return
    }
    setFieldValue('name',`${warehouse.name}`,false)
    setFieldValue('description',`${warehouse.description}`,false)
    setFieldValue('flag',`${warehouse.flag}`,false)
  },[warehouse,setFieldValue])

  const handlerOnSubmit = async () => {
    const {error, data,refs,validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    const obj = Object.assign({}, {
      ...data,
      flag: Number(data.flag)
    })
    await submitFun(obj)
    cancelFun()
  }
  
  return (
    <div className={'d-flex warehouse-form-root'}>
      <div className={'container'}>
        <div className={'col-6 pt-2'}>
          <InputTextWithValidation
                        required
                        label={'Name'}
                        helperText={'enter name'}
                        validation={{
                          useValidation: validation,
                          model: 'name',
                          rule: {
                            required
                          }
                        }}
          />
        </div>
        <div className={'col-6 pt-2'}>
          <SelectTextWithValidation
                required
                label={'Type'}
                helperText={'choose type'}
                options={CONSTANT_WAREHOUSE.TYPES_SELECT}
                validation={{
                  useValidation: validation,
                  model: 'flag',
                  rule: {
                    required,
                  }
                }}
          />
        </div>
        <div className={'col-12 pt-2'}>
          <InputTextWithValidation
                        label={'Description'}
                        helperText={'enter description'}
                        validation={{
                          useValidation: validation,
                          model: 'description',
                        }}
          />
        </div>
        <DialogButtonsSaveUpdate
                    cancelFun={cancelFun}
                    submitFun={handlerOnSubmit}
                    update={!!warehouse}
                    icon={faWarehouse}
        />
      </div>
    </div>
  )
}

export default WarehouseForm

export interface IDialogWarehouseForm {
  warehouseId ?: string
  submitFun : (warehouse : TWarehouse) => Promise<any>
}

export const openDialogWarehouseForm = ({warehouseId, submitFun} : IDialogWarehouseForm) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-warehouse-form-add-edit-56456465156489'} closeFn={closeDialog}>
      <CenteredDialog
          title={warehouseId ? 'Edit warehouse' : 'Define new warehouse'}
          closeAction={closeDialog}
          Component={WarehouseForm}
          componentRenderProps={{
            cancelFun:closeDialog,
            submitFun,
            warehouseId
          }}
      />
    </DialogModalRootComponent>)
  })
}

