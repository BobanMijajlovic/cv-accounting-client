import React, { useMemo }                            from 'react'
import { useProductionOrderQuery }                   from '../../../../graphql/graphql'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                                    from '../../../../components/hooks/useExternalKeybaord'
import { SpinnerLoadingCenter }                      from '../../../../components/Spinner/SpinnerLoading'
import ProductionOrderHeader                         from '../views/instance/header/Header'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                                    from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                            from '../../../../components/Dialog/DialogBasic'
import Table                                         from '../../../../components/Table/Table'
import { PRODUCTION_ORDER_ITEMS_PREVIEW_TABLE_NAME } from '../../../constants'
import {
  NOT_FOUND_TRANSLATION,
  useTranslationFunction
}                                                    from '../../../../components/Translation/useTranslation'
import { productionOrderItemsTable }                 from '../views/instance/items/Table'
import { invoiceItemsTableHeader }                   from '../../invoice/form/items/Table'
import { TItem }                                     from '../../../../graphql/type_logic/types'
import {
  round as _round,
  multiply as _multiply
}                                         from 'lodash'

const summarize = {
  fields: ['finance']
}

const ProductionOrderPreview = ( { productionOrderId, closeDialog } : { productionOrderId : string, closeDialog? : () => void } ) => {

  const { translate } = useTranslationFunction()
  const { data, loading } = useProductionOrderQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( productionOrderId )
    },
    skip : !productionOrderId
  } )

  const productionOrder = useMemo( () => !data || !data.productionOrder ? {} as any : data.productionOrder, [data] )

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'production-order-preview-dialog' )

  const tableHeader = React.useMemo( () => {
    if ( !productionOrderItemsTable ) {
      return []
    }
    const header = [...productionOrderItemsTable].map( x => {
      return {
        ...x,
        notResize : true,
        cell : {
          ...x.cell,
          editor : void( 0 )
        }
      }
    } )
    const index : any = invoiceItemsTableHeader.findIndex( x => x.field === 'act' )
    if ( index === -1 ) {
      return header
    }
    header[index] = {
      ...header[index],
      notResize : true
    } as any
    header.splice( index, 1 )
    return header.map( ( x : any ) => {
      const translated = x.label && x.label !== '#' ? translate( x.label ) : NOT_FOUND_TRANSLATION
      return {
        ...x,
        label : translated !== NOT_FOUND_TRANSLATION ? translated : x.label
      }
    } )
  }, [translate] )

  const tableData = useMemo(() => {
    if (!productionOrder.items) {
      return []
    }

    return productionOrder.items.map((x:any) => {
      const item = x.item as TItem
      return {
        ...x,
        price : item.vp,
        finance : _round( _multiply( Number( x.quantity ), Number( item.vp ) ), 2 )
      }
    })
  },[productionOrder])

  return (
    <>
      { loading ? <SpinnerLoadingCenter/> : null }
      <div className={ 'hw-production-order-preview-root relative d-flex flex-column font-smaller-2' } ref={ setRef }>
        {
          productionOrder || productionOrder.items ? (
            <>
              <div className={ 'mb-4 border-bottom border-light-0 pt-2' }>
                <ProductionOrderHeader productionOrder={ productionOrder } isPreview/>
              </div>
              <Table
                                header={ tableHeader }
                                separator={ 'cell' }
                                data={ tableData }
                                tableName={ PRODUCTION_ORDER_ITEMS_PREVIEW_TABLE_NAME }
                                additionalData={ productionOrder }
                                summarize={summarize}
              />
            </>
          ) : ( <div>Production not exists in system.</div> )
        }
      </div>
    </>
  )
}

export default ProductionOrderPreview

export interface IDialogPreviewProductionOrder {
  productionOrderId : string
}

export const openDialogPreviewProductionOrder = ( props : IDialogPreviewProductionOrder ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-production-order-preview-4570740707' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Production order preview' }
                closeAction={ closeDialog }
                Component={ ProductionOrderPreview }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  ...props
                } }
      />
    </DialogModalRootComponent> )
  } )
}

