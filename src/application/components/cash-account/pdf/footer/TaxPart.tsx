import React         from 'react'
import {
  StyleSheet,
  Text,
  View
}                    from '@react-pdf/renderer'
import {formatPrice} from '../../../../utils/Utils'

const styles = StyleSheet.create({
  root: {
    padding: 5
  },
  title: {
    fontWeight: 'bold',
    padding: '0px 5px 5px 5px',
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dddddd'
  },
  table: {
    padding: 0,
    flex: 1
  },
  tableRow: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flex: 1
  },
  tableCell: {
    padding: '2px 4px',
    flex: 1,
    textAlign: 'right'
  },
  borderTopDoted: {
    borderTop: 1,
    borderTopStyle: 'dotted',
    borderTopColor: '#dddddd'
  }
})

const TaxPart = ({data} : {data : any}) => {
  return (
    <View style={styles.root}>
      <View style={styles.title}><Text>Recapitulation according to VAT</Text></View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <TaxTableCell value={'Tax %'} />
          <TaxTableCell value={'Finance no tax'} />
          <TaxTableCell value={'Finance tax'} />
          <TaxTableCell value={'Finance with tax'} />
        </View>
        {data.map((data : any,key : number) => {
          return <TaxTableRow key={key} data={data}/>
        })}
      </View>
    </View>
  )
}

export default TaxPart

const TaxTableRow = ({data} : {data : any}) => {
  const style = React.useMemo(() => data.summary ? {...styles.tableRow,...styles.borderTopDoted} : styles.tableRow,[data])
  return (
    <View style={style}>
      <TaxTableCell value={data.summary ? '' : formatPrice(data.taxPercent)} />
      <TaxTableCell value={formatPrice(data.financeVP)} />
      <TaxTableCell value={formatPrice(data.taxFinance)} />
      <TaxTableCell value={formatPrice(data.financeMP)} />
    </View>
  )
}

const TaxTableCell = ({value} : {value : string}) => {
  return (
    <View style={styles.tableCell}>
      <Text>{value}</Text>
    </View>
  )
}