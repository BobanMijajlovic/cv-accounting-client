import React, {
  useEffect,
  useMemo
}                                              from 'react'
import { useAppBar }                           from '../../../../hooks/useAppBar'
import {
  useProductionOrderForm,
  useProductionOrderTabs
} from '../../../../../store/production-order/useProductionOrder'
import {
  faBook,
  faFileInvoice,
  faPrint,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }                  from '../../../../../components/hooks/useExternalKeybaord'
import { useTranslationFunction }              from '../../../../../components/Translation/useTranslation'
import { SpinnerLoadingCenter }                from '../../../../../components/Spinner/SpinnerLoading'
import DivExternalKeyboardRoot                 from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import ProductionOrderHeader                   from './header/Header'
import ProductionOrderItemsTable               from './items/Table'
import ProductionOrderItemForm                 from './items/InsertForm'
import {
  TExpense,
  TProductionOrder
}                                              from '../../../../../graphql/type_logic/types'
import { openDialogPreviewProductionOrder }    from '../../preview/Preview'
import { openDialogProductionOrderHeaderForm } from './header/Form'
import { openDialogProductionOrderPrint }      from '../../pdf/Pdf'
import AdditionalExpenseView                   from '../../../invoice/form/footer/AdditionalExpenseView'
import { FinanceRow }                          from '../../../calculation/views/InstanceView/header/finance/FinanceRow'
import _                                       from 'lodash'
import {
  formatPrice,
  toNumberFixed
} from '../../../../utils/Utils'
import { openDialogSaveInvoice }               from '../../../invoice/form'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogError
}                              from '../../../../../components/EasyModel/EasyModal'
import { useInvoiceForm }      from '../../../../../store/invoice/useInvoice'
import {
  getInvoiceFinanceMP,
  getInvoiceFooterAdditionalExpenseFinance,
  getInvoiceTotalAddedDueDates
}                              from '../../../invoice/util'
import {
  CenteredDialog,
  DialogComponentQuestions
}                              from '../../../../../components/Dialog/DialogBasic'
import { processErrorGraphQL } from '../../../../../apollo'

const ProductionForm = ( { productionOrderId } : { productionOrderId : string } ) => {
  const { translate } = useTranslationFunction()
  const { productionOrder, productionOrderLoading, updateProductionOrder, finishProductionOrder } = useProductionOrderForm( productionOrderId )
  const { removeTab } = useProductionOrderTabs()
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()

  const appBarButtons = useMemo( () => {
    const arr = [
      {
        label : translate( 'LABEL_HEADER' ),
        icon : faFileInvoice,
        shortcut : KeyboardEventCodes.F4,
        onClick : () => openDialogProductionOrderHeaderForm( {
          handlerSuccess : updateProductionOrder,
          productionOrderId
        } )
      }
    ]
    
    const handlerFinishOrder = async () => {
      await finishProductionOrder()
        .then(() => {
          removeTab(productionOrderId)
        })
        .catch(e => {
          processErrorGraphQL(e, {})
        })
    }
    
    return [
      ...arr,
      {
        label : translate( 'LABEL_PREVIEW' ),
        icon : faSearch,
        shortcut : KeyboardEventCodes.F8,
        onClick : () => openDialogPreviewProductionOrder( {
          productionOrderId
        } )
      },
      {
        label : translate( 'SMALL_BUTTON_PRINT ' ),
        icon : faPrint,
        shortcut : KeyboardEventCodes.F9,
        onClick : () => openDialogProductionOrderPrint( {
          productionOrderId
        } )
      },
      {
        label : translate( 'LABEL_FINISH' ),
        color : 'success',
        icon : faBook,
        classNames : 'ml-5',
        shortcut : KeyboardEventCodes.F12,
        onClick : () => openDialogFinishProductionOrder( {
          actionConfirm : handlerFinishOrder,
          productionOrderId
        } )
      }
    ]
  }, [productionOrder.items, productionOrderId] )

  useEffect( () => {
    const id = setButtonsForPage( appBarButtons as any )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, translate, productionOrder] )

  const externalExpensesData = React.useMemo(() => {
    return (productionOrder as any).expense ? (productionOrder as any).expense.reduce((acc: any, expense: TExpense) => {
      if (!expense.invoiceNumber) {
        return acc
      }

      return {
        financeMP: Number(expense.financeMP)
      }
    }, {financeVP: 0, financeTax: 0, financeMP: 0}) : {financeVP: 0, financeTax: 0, financeMP: 0}
  }, [productionOrder])

  return (
    <>
      { productionOrderLoading ? <SpinnerLoadingCenter/> : <></> }
      <DivExternalKeyboardRoot className={ 'd-flex flex-column calculation-form-root-div flex-1 px-4 py-2' }>
        <div className={ 'border-bottom border-light-0 pt-1 mb-2' }>
          <ProductionOrderHeader productionOrder={ productionOrder as TProductionOrder }/>
        </div>
        <div className={ 'd-flex justify-content-around align-items-center w-100 pb-2 background-grey py-2 px-2 mb-2' }>
          <div className={'flex-2 px-2'}>
            <ProductionOrderItemForm productionOrderId={ productionOrderId }/>
          </div>
          <div className={'hw-production-order-additional-expenses-finance-part w-100 px-2'}>
            <div className={'d-flex justify-content-between align-items-center w-100 pt-1 border-bottom'}>
              <div className={'text-upper font-smaller-5 pr-2 text-left flex-1 px-2'}>AdditionalExpense</div>
              <div className={'font-smaller-2 font-weight-600 flex-1 text-right'}>{formatPrice(externalExpensesData.financeMP)}</div>
            </div>
          </div>

        </div>
        <div className={ 'mb-1 d-flex flex-column flex-2 pt-2' }>
          <ProductionOrderItemsTable productionOrderId={ productionOrderId }/>
        </div>
      </DivExternalKeyboardRoot>
    </>
  )
}

export default ProductionForm

export const openDialogFinishProductionOrder = ( { actionConfirm, productionOrderId } : { actionConfirm: ()=> void,productionOrderId : string } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {

    const Component = () => {
      const { translate } = useTranslationFunction()
      const { productionOrder } = useProductionOrderForm( productionOrderId )

      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to finish production order? '
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
    openDialog( <DialogModalRootComponent name={ 'dialog-production-order-finish-078075407040410' } closeFn={ closeDialog }>
      <CenteredDialog
          title={ 'Production order finish' }
          closeAction={ closeDialog }
          Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}