import React, {
  useEffect,
  useState
}                                          from 'react'
import {
  faFileInvoice,
  faInfoCircle
}                                          from '@fortawesome/free-solid-svg-icons'
import { openDialogPreviewCalculation }    from '../InstanceView/Form'
import { useAppBar }                       from '../../../../hooks/useAppBar'
import { KeyboardEventCodes }              from '../../../../../components/hooks/useExternalKeybaord'
import {
  formatDateLong,
  formatPrice
}                                          from '../../../../utils/Utils'
import { TableHeaderRenderManageColumns }  from '../../../../../components/Table/render/HeaderRender'
import Table                               from '../../../../../components/Table/Table'
import {
  useCalculationsQuery,
  useInsertCalculationMutation
}                                          from '../../../../../graphql/graphql'
import { queryVariablesForCalculations }   from '../../../../../graphql/variablesQ'
import { FontAwesomeIcon }                 from '@fortawesome/react-fontawesome'
import { SpinnerLoadingCenter }            from '../../../../../components/Spinner/SpinnerLoading'
import { openDialogCalculationHeaderForm } from '../../modal/DocumentHeaderForm'
import {
  useCalculation,
  useCalculationTabs
}                                          from '../../../../hooks/useCalculation'
import StatusRender                        from '../../_common/StatusRender'
import CalculationTableActionCell          from '../../_common/TableActionRender'
import { openDialogCalculationPrint }      from '../../pdf/Pdf'
import { usePagination }                   from '../../../../../components/Pagination/usePagination'
import CalculationTableSearch              from './Filter'
import DivExternalKeyboardRoot             from '../../../../../components/hooks/DivParentExternalKeybardRoot'

const CalculationTable = () => {
  const {calculation} = useCalculation()
  const {dateFrom, dateTo, supplier, status} = calculation || {}
  const {data: pagData, setBackendPaginationData, handlerEvent: handlerEventPagination} = usePagination()
  const {perPage: pagPerPage, page: pagPage, numItems: pagNumItems} = pagData
  const [mutationInsertCalculation] = useInsertCalculationMutation()
  const [tableSettings, setTableSettings] = useState({})

  const {setButtonsForPage, clearButtonsForPage} = useAppBar()

  const {addTab,activeTab} = useCalculationTabs()

  const queryVariablesCalculations = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    const options = Object.assign({
      dateFrom: dateFrom ? dateFrom : date,
      dateTo: dateTo ? dateTo : new Date(),
      status: status ? status : undefined
    }, supplier ? {supplierId: supplier.id} : {})

    const offset = ((pagPage || 1) - 1) * (pagPerPage || 20)
    return queryVariablesForCalculations(offset, pagPerPage || 20, options)
  }, [pagPerPage, pagPage, supplier, dateFrom, dateTo, status])

  const {data, loading, refetch: refetchCaclculation} = useCalculationsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesCalculations,
    onCompleted: (data) => {
      if (!data || !data.data || !data.data.items) {
        return
      }
      const {page, count} = data.data
      setBackendPaginationData(page || 1, count)
    }
  })
  
  useEffect(() => {
    if (!activeTab) {
      return 
    }
    refetchCaclculation().then()
  },[activeTab, refetchCaclculation])

  const paginationData = React.useMemo(() => {
    return {
      perPage: pagPerPage || 20,
      page: pagPage || 1,
      totalItems: pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems])

  const calculations = React.useMemo(() => !data || !data.data.items || data.data.items.length === 0 ? [] :
    data.data.items.map((item : any, index : number) => {
      return {
        ...item,
        position: index + 1
      }
    })
  , [data])

  const handlerCreateCalculation = React.useCallback(async (calculation : any) => {
    await mutationInsertCalculation({
      variables: {
        data: calculation
      }
    }).then((v) => {
      if (v.data && v.data.calculation.id) {
        addTab(v.data.calculation.id)
      }
      refetchCaclculation().then()
    })
  }, [addTab, mutationInsertCalculation, refetchCaclculation])

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'New Calc',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogCalculationHeaderForm({
          handlerSuccess: handlerCreateCalculation
        })
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage, handlerCreateCalculation])

  const header = [
    {
      label: '#',
      field: 'position',
      cell: {
        classes: ['hw-table-cell-center'],
      }
    },
    {
      field: 'supplier',
      label: 'Supplier',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          minWidth: 250
        },
        format: (value: any) => value?.shortName?.length > 0 ? value?.shortName : value?.fullName
      }
    },
    {
      label: 'Calculation number',
      field: 'number',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          maxWidth: 150
        }
      }
    },
    {
      label: 'Invoice number',
      field: 'invoiceNumber',
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          maxWidth: 150
        }
      }
    },
    {
      label: 'Calculation date',
      field: 'date',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatDateLong(value)
        },
        style: {
          maxWidth: 150
        }
      }
    },

    {
      label: 'Date of entry',
      field: 'dates',
      cell: {
        classes: ['hw-table-cell-center'],
        format: (value : string) => {
          return formatDateLong(value)
        },
        style: {
          maxWidth: 150
        }
      }
    },
    {
      label: 'Inv. Finance',
      field: 'totalFinanceVP',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value : string) => {
          return formatPrice(value)
        }
      }
    },
    {
      label: 'Finance Tax',
      field: 'financeTax',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value : string) => {
          return formatPrice(value)
        }
      }
    },
    {
      label: 'Total Finance',
      field: 'totalFinanceMP',
      cell: {
        classes: ['hw-table-cell-right'],
        format: (value : string) => {
          return formatPrice(value)
        }
      }
    },
    {
      label: 'Status',
      field: 'status',
      cell: {
        classes: ['hw-table-cell-right'],
        render: StatusRender,
      }
    },
    {
      field: 'act',
      notHide: true,
      notResize: true,
      cell: {
        classes: ['hw-table-cell-center'],
        style: {
          width: '90px'
        },
        render: CalculationTableActionCell
      },
      width: '50px',
      render: TableHeaderRenderManageColumns
    }
  ]

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {
    if (action === 'preview') {
      if (!id) {
        return
      }
      openDialogPreviewCalculation({
        calculationId: id
      })
    }
    if (action === 'edit') {
      if (!id) {
        return
      }
      addTab(id as string)
    }
    if (action === 'print') {
      if (!id) {
        return
      }
      openDialogCalculationPrint({calculationId: id, tableSettings})
    }
  }

  const handlerTableSettingsChanged = React.useCallback((settings : any) => {
    setTableSettings({...settings})
  }, [setTableSettings])

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <DivExternalKeyboardRoot className={'d-flex flex-column flex-fill  letter-spacing hw-find-item-root h-100 px-2 '}>
        <div className={'d-flex flex-row align-items-center pb-1'}>
          <div className={'color-primary pt-1'}><FontAwesomeIcon className={'pr-2 font-smaller-5 '} style={{fontSize: 20}} icon={faInfoCircle}/></div>
          <div className={'color-primary font-smaller-5'}>CALCULATIONS INFO</div>
        </div>
        <CalculationTableSearch/>
        <div className={'pt-3 m-0 hw-calculation-table-preview h-100'}>
          <Table
                        tableName={'calculation-table-84932jm4k32j42j4h324'}
                        header={header}
                        handlerEventPagination={handlerEventPagination}
                        data={calculations}
                        separator={'cell'}
                        handlerEventDataClick={handlerDataEventClick}
                        handlerEventSettingsChanged={handlerTableSettingsChanged}
                        paginationData={paginationData}
                        scrollable
          />
        </div>
      </DivExternalKeyboardRoot>
    </>

  )
}

export default CalculationTable

