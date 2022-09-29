import React          from 'react'
import TotalComponent from './components/TotalComponent'

export interface IShowSellingItemProps {
  line1 : string,
  line2 : string
}
const ShowSummary = ({line1, line2} : IShowSellingItemProps) => {

  return (
    <div style={{borderRadius: '6px'}}
             className={'d-flex  flex-row justify-content-between border  ml-2 mr-2 font-weight-600 font-bigger-2 '}>
      <div className={'d-flex flex-column pl-2 '}>
        <div>{line1}</div>
        <div>{line2 ? line2 : (<span>&nbsp;</span>)}</div>
      </div>
      <TotalComponent />
    </div>
  )
}

export default ShowSummary