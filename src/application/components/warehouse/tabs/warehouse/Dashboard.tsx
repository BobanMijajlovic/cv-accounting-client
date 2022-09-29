import React, {
  useEffect,
  useRef,
  useState
}                     from 'react'
import GeneralDetails from '../oneArticle/GeneralDetails'
import FinancePart    from '../oneArticle/FinancePart'
import TableSearch    from './TableSearch'
import Table          from './Table'

const WarehouseSummaryDashboard = ({warehouseId} : { warehouseId : string }) => {
  const [tableStyle, setTableStyle] = useState({} as any)
  const refTable = useRef(null)

  useEffect(() => {
    if (refTable && refTable.current) {
      const divRoot = (refTable.current as any).parentElement
      if (!divRoot) {
        return
      }
      const maxHeight = window.innerHeight - ((divRoot).getBoundingClientRect().top) - 20
      setTableStyle({
        minHeight: maxHeight,
        maxHeight: maxHeight
      })
    }
  }, [refTable,setTableStyle])
    
  return (
    <div ref={refTable} style={tableStyle} className={'d-flex flex-column w-100 mr-2 pt-2 w-100 px-4 hw-scrollable-div'}>
      <div className={'d-flex flex-row justify-content-between align-items-center pt-2'}>
        <div className={'general-details mr-5'}>
          <GeneralDetails warehouseId={warehouseId} notShowEditButton/>
        </div>
        <div className={'d-flex warehouse-item-finance-part ml-5'}>
          <FinancePart warehouseId={warehouseId}/>
        </div>
        <div>
          <TableSearch warehouseId={warehouseId}/>
        </div>
      </div>
      <div className={'d-flex flex-column'}>
        <Table warehouseId={warehouseId} />
      </div>
    </div>
  )
}

export default WarehouseSummaryDashboard

