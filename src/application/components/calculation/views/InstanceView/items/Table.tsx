import React, {
  useEffect,
  useRef,
  useState
}                                       from 'react'
import {
  NumberCellColumnSmall,
  TableActionCell
}                                       from '../../../../../../components/Table/render/CellRender'
import {TableHeaderRenderManageColumns} from '../../../../../../components/Table/render/HeaderRender'
import {
  EVENT_TYPE_CHANGE_MODEL_FIELD,
  InputTextEditorCurrency,
  InputTextEditorQuantity
}                                       from '../../../../../../components/Table/editors/InputTextEditor'
import {
  ITableModelCellChanged,
  TABLE_INDEX_SUMMARIZE_COLUMN
}                                       from '../../../../../../components/Table'
import Table                            from '../../../../../../components/Table/Table'
import {
  TCalculation,
  TCalculationItem
}                                       from '../../../../../../graphql/type_logic/types'
import {
  CALCULATION_ITEMS_TABLE_NAME,
  CONSTANT_CALCULATION
}                                       from '../../../../../constants'
import _                                from 'lodash'
import {
  formatPrice,
  formatQuantity,
  getUnit,
  toNumberFixed
}                                       from '../../../../../utils/Utils'
import {openDialogItemPriceTaxForm}     from '../../../../items/form/ItemPriceTax'
import {useUpdateItemMutation}          from '../../../../../../graphql/graphql'
import {useCalculationForm}             from '../../../../../hooks/useCalculation'
import {
  PriceDifferenceMP,
  PriceDifferenceVP
}                                       from '../../../_common/PriceDifference'
import {
  SummarizeCellExpense,
  SummarizeCellFinance,
  SummarizeCellFinanceExp,
  SummarizeCellTax,
  SummarizeCellTaxFinanceExp
}                                       from '../../../_common/SummarizeCell'
import {processErrorGraphQL}            from '../../../../../../apollo'

const _RenderCalculationNameBody = ({value} : any) => {
  return (
    <div className={'d-flex justify-content-between flex-fill'}
    >
      <div className={'font-smaller-1'}>{value.shortName}</div>
      <div className={'d-flex justify-content-between align-items-center font-smaller-4'}>
        <div className={'pr-2'}>{getUnit(value.uom)}</div>
        <div>{value.barCode}</div>
      </div>

    </div>
  )
}

export const RenderCalculationNameBody = React.memo(_RenderCalculationNameBody,
    (prevProps, nextProps) => {
      return (nextProps.value.barCode === prevProps.value.barCode) && (nextProps.value.shortName === prevProps.value.shortName) && (nextProps.value.uom === prevProps.value.uom)
    })

export const calculationItemsTableHeader = [
  {
    label: '#',
    notHide: true,
    field: 'posNumber',
    cell: {
      classes: ['text-center'],
      render: NumberCellColumnSmall
    }
  },
  {
    label: 'Name',
    field: 'item',
    cell: {
      classes: ['text-left'],
      render: RenderCalculationNameBody
    }
  },
  {
    label: 'Qty',
    field: 'quantity',
    width: 150,
    cell: {
      editor: {
        render: InputTextEditorQuantity
      },
      classes: ['text-right'],
      format: (value : string) => {
        return formatQuantity(value)
      }
    }
  },
  {
    label: 'Base Finance',
    field: 'financeVP',
    cell: {
      editor: {
        render: InputTextEditorCurrency
      },
      classes: ['text-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  },
  {
    label: 'Tax (base)',
    field: 'taxFinance',
    width: 100,
    cell: {
      classes: ['text-right'],
      render: SummarizeCellTax
            // render: TaxFinanceRender,
    }
  },
  {
    label: 'Finance (Tax)',
    field: 'financeMP',
    cell: {
      editor: {
        render: InputTextEditorCurrency
      },
      classes: ['text-right'],
      render: SummarizeCellFinance
    }
  },
  {
    label: 'Expense (internal)',
    field: 'expensesFinanceInternalMP',
    cell: {
      classes: ['text-right'],
      render: SummarizeCellExpense,
    }
  },
  {
    label: 'Base finance exp ',
    field: 'financeExpInternalVP',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  },
  {
    label: 'Tax exp (base)',
    field: 'taxFinanceExp',
    width: 100,
    cell: {
      classes: ['text-right'],
      render: SummarizeCellTaxFinanceExp
    }
  },
  {
    label: 'Finance exp (Tax)',
    field: 'financeExpInternalMP',
    cell: {
      classes: ['text-right'],
      render: SummarizeCellFinanceExp
    }
  },

    /* {
        label: 'Expense (external)',
        field: 'expensesFinanceExternalMP',
        cell: {
          classes: ['text-right'],
                // render: RenderCalculationExpenseFinance
        }
      }*/

  {
    label: 'Price VP',
    field: 'priceDifferenceVP',
    cell: {
      render: PriceDifferenceVP
    }
  },

  {
    label: 'Price MP',
    field: 'priceDifferenceMP',
    cell: {
      render: PriceDifferenceMP
    }
  },

  {
    label: 'Final (not tax)',
    field: 'financeFinalVP',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return formatPrice(value)
      },
    }
  },

  {
    label: 'Final',
    field: 'financeFinalMP',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return formatPrice(value)
      },
    }
  },
  {
    field: 'act',
    notHide: true,
    notVisible: false,
    notResize: true,
    cell: {
      classes: ['hw-table-cell-center'],
      style: {
        width: '50px'
      },
      render: TableActionCell,
      renderProps: {
        preventEdit: true,
        preventPreview: true
      }
    },
    width: '50px',
    render: TableHeaderRenderManageColumns
  }
]

const summarize = {
  fields: ['financeVP', 'financeMP', 'expensesFinanceInternalMP', 'taxFinance', 'financeExpInternalVP', 'taxFinanceExp', 'financeExpInternalMP', 'financeFinalVP', 'financeFinalMP']
}

interface IItemsTableProps {
  calculation : TCalculation
  updateItem ?: (value : number | string, field : string, model : any) => void | Promise<any>
  deleteItem ?: (id : string) => void
  headerState : boolean
}

const ItemsTable = ({calculation, updateItem, deleteItem, headerState} : IItemsTableProps) => {
  const [mutationUpdateItemDefinition] = useUpdateItemMutation()
  const [tableStyle, setTableStyle] = useState({} as any)
  const items : TCalculationItem[] = (calculation as any).items
  const tableRoot = useRef(null)
  const {refetchCaclculation} = useCalculationForm(`${calculation.id}`)

  const {FINANCE_NO_VAT, FINANCE_WITH_VAT} = CONSTANT_CALCULATION.TYPES.ITEM_FORM
  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((_item : TCalculationItem) => {
      const item = _item as any
      return {
        ...item,
        uom: `${item.item.uom}`,
        expensesFinanceInternalMP: item.financeExpInternalMP !== 0 && _.round(_.subtract(item.financeExpInternalMP, item.financeMP), 2),
        taxFinance: _.round(_.subtract(Number(item.financeMP), Number(item.financeVP)), 2),
        taxFinanceExp: item.financeExpInternalMP !== 0 && _.round(_.subtract(Number(item.financeExpInternalMP), Number(item.financeExpInternalVP)), 2),
        priceDifferenceVP: 0,
        priceDifferenceMP: 0,
        calculation: calculation
      }
    })
  }, [items])

  useEffect(() => {
    if (tableRoot && tableRoot.current) {
      const root = document.getElementsByClassName('hw-calculation-form-div')[0]
      const footer = root.children[root.children.length - 1].getBoundingClientRect()
      const maxHeight = window.innerHeight - ((tableRoot.current as any).getBoundingClientRect().top) - footer.height - 20
      setTableStyle({
        minHeight: maxHeight,
        maxHeight: maxHeight
      })
    }
  }, [tableRoot, items, headerState])

  const calculationItemChangeItemDefinition = (model : any) => {
    mutationUpdateItemDefinition({
      variables: {
        id: Number(model.id),
        data: {
          vp: toNumberFixed(model.vp),
          mp: toNumberFixed(model.mp),
          taxId: Number(model.taxId)
        }
      }
    }).then(() => {
      refetchCaclculation().then()
    })
      .catch((e) => {
        processErrorGraphQL(e)
      })
  }

  const calculationUpdateField = (value : any, field : string, model : any) => {
    updateItem && updateItem(value, field, model)
  }

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {

    if (!event.detail || event.detail !== 1) {
      return
    }

    if (action === 'delete') {
      id && deleteItem && deleteItem(id)
    }
    if (action === 'table-cell-edit' && param === 'item') {
      if (Number(calculation.status) === CONSTANT_CALCULATION.STATUS.OPENED) {
        const item = tableData.find(x => `${x.id}` === id)
        openDialogItemPriceTaxForm({
          item: _.get(item, 'item'),
          submitFun: calculationItemChangeItemDefinition,
          warehouseType: (calculation.warehouse as any).flag
        })
      }
    }

    if (Number(id) === TABLE_INDEX_SUMMARIZE_COLUMN && action === 'table-cell-edit') {

    }
  }

  const handlerModelFieldChanged = (data : ITableModelCellChanged) => {
    if (data.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
      calculationUpdateField(data.value, data.field, data.model)
      return
    }
  }

  const tableHeader = React.useMemo(() => {
    if (Number(calculation.status) !== CONSTANT_CALCULATION.STATUS.OPENED) {
      return calculationItemsTableHeader.map(x => {
        return {
          ...x,
          cell: {
            ...x.cell,
            editor: void(0)
          }
        }
      })
    }
    return calculationItemsTableHeader.map(x => {
      let field = ''
      switch (calculation.itemInputType) {
        case FINANCE_NO_VAT:
          field = 'financeMP'
          break
        case FINANCE_WITH_VAT:
          field = 'financeVP'
          break
      }
      if (x.field === field) {
        return {
          ...x,
          cell: {
            ...x.cell,
            editor: void(0)
          }
        }
      }
      return x
    })
  }, [calculation])

  return (
    <div ref={tableRoot} className={'d-flex flex-1 calculation-items-table-root mb-1'}>
      <Table
                modelFields={['taxPercent', 'taxId']}
                additionalData={calculation}
                handlerEventDataClick={handlerDataEventClick}
                header={tableHeader}
                separator={'cell'}
                data={tableData}
                handlerEventModelFieldChanged={handlerModelFieldChanged}
                tableName={CALCULATION_ITEMS_TABLE_NAME}
                summarize={summarize}
      />
    </div>
  )
}

export default ItemsTable
