import React, { useRef }               from 'react'
import {
  TCalculation,
  TCalculationItem
}                                      from '../../../../graphql/type_logic/types'
import Table                           from '../../../../components/Table/Table'
import { calculationItemsTableHeader } from '../views/InstanceView/items/Table'
import * as _                          from 'lodash'
import {
  CALCULATION_ITEMS_TABLE_NAME,
  TABLE_SETTINGS_PREFIX
}                                      from '../../../constants'
import { LocalStorage }                from '../../../utils/LocalStorage'

export interface ICalculationPreviewBodyProps {
  calculation : TCalculation
  headerState : boolean
}
const summarize = {
  fields: ['financeVP', 'financeMP', 'expensesFinanceInternalMP', 'taxFinance', 'financeExpInternalVP', 'taxFinanceExp', 'financeExpInternalMP', 'financeFinalVP','financeFinalMP']
}

const Body = ({calculation,headerState} : ICalculationPreviewBodyProps) => {
  
  const tableRoot = useRef(null)
  const tableSettings = React.useMemo(() => LocalStorage.getData(`${TABLE_SETTINGS_PREFIX}${CALCULATION_ITEMS_TABLE_NAME}`),[])
  const items : TCalculationItem[] = (calculation as any).items

  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((_item : TCalculationItem) => {
      const item = _item as any
      return {
        ...item,
        uom: `${item.item.uom}`,
        expensesFinanceInternalMP: item.financeExpInternalMP !== 0 && _.round(_.subtract(item.financeExpInternalMP, item.financeMP),2),
        taxFinance: _.round(_.subtract(Number(item.financeMP), Number(item.financeVP)), 2),
        taxFinanceExp: item.financeExpInternalMP !== 0 &&  _.round(_.subtract(Number(item.financeExpInternalMP), Number(item.financeExpInternalVP)), 2),
        priceDifferenceVP: 0,
        priceDifferenceMP: 0,
        calculation: calculation
      }
    })
  }, [items, calculation])

  const tableHeader = React.useMemo(() => {
    const index : any = calculationItemsTableHeader.findIndex(x => x.field === 'act')
    if (index === -1 ) {
      return calculationItemsTableHeader
    }

    const header = [...calculationItemsTableHeader].map(x => {
      return {
        ...x,
        notResize: true,
        cell: {
          ...x.cell,
          editor: void(0)
        }
      }
    })
    header[index]  = {
      ...header[index],
      notVisible : true
    } as any
    header.splice(index, 1)
    return tableSettings ? header.filter(x => {
      const f : any = tableSettings.find((y : any) => y.field === x.field)
      if (!f) {
        return true
      }
      return !f.notVisible
    }) as any : header
  },[tableSettings])
  
  return (
    <div  ref={tableRoot} className={'d-flex flex-2 w-100 calculation-items-table-root mb-1'}>
      <Table
            modelFields={['taxPercent', 'taxId']}
            additionalData={calculation}
            header={tableHeader}
            separator={'cell'}
            data={tableData}
            scrollable
            tableName={'temp-calculation-table-deal-47932874583927'}
            summarize={summarize}
      />
    </div>
  )
}
export default Body
