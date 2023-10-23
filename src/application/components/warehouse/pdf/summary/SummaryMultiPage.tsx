import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
}                       from '@react-pdf/renderer'
import React            from 'react'
import {
  IPdfProps,
  IPdfTableProps,
  PageHeader,
  resizeColumns
} from '../../../../../components/Pdf/Pdf';
import {
  formatDate,
  formatDateShort,
  formatPrice
}                       from '../../../../utils/Utils';
import { FORMAT_DATES } from '../../../../constants';
import SummaryTable     from './SummaryTable';

interface IPdfMultiPageProps {
  data: any
  title: string
}

const SummaryMultiPage = ({data, title }: IPdfMultiPageProps) => {
  const _styles = StyleSheet.create( {
    root : {
      flexDirection : 'row',
      justifyContent : 'flex-start',
      alignItems : 'center',
      padding : '5px 0px 5px',
      borderTopColor : '#dddddd',
      borderTopWidth : 1,
      borderTopStyle : 'solid',
      borderBottom : 1,
      borderBottomColor : '#dddddd',
      borderBottomStyle : 'dotted'
    }
  } )
  const findData = ( value : any, field : string ) => {
    return value.calculationId ? ( value.calculation as any )[field] : value.invoiceId ? ( value.invoice as any )[field] : value.returnInvoiceId ? ( value.returnInvoice as any )[field] : ''
  }
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        alignment : 'left',
        format : ( value : any ) => findData( value, 'number' )
      },
      {
        label : 'date',
        format : ( value : any ) => value.date ? formatDateShort( value.date ) : ''
      },
      {
        label : 'description',
        format : ( value : any ) => findData( value, 'number' ) || (value.summary && 'TOTAL' )
      },
      {
        label : 'owes',
        minSize : 10,
        alignmentHeader : 'right',
        sizeType : 2,
        alignment : 'right',
        format : ( value : any ) => value.calculationId || value.returnInvoiceId ||  value.summary ? formatPrice( value.owes as number ) : ''
      },
      {
        label : 'claims',
        minSize : 10,
        alignmentHeader : 'right',
        sizeType : 2,
        alignment : 'right',
        format : ( value : any ) => value.invoiceId || value.summary ? formatPrice( value.claims as number ) : ''
      },

      {
        label : 'balance',
        alignmentHeader : 'right',
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.balance as number )
      }
    ]
  }

  return (
    <PDFViewer style={ { width : '95vh', height : '90vh' } }>
      <Document title={ title }>
        {data.map((x:any,key:number) => {
          const _tableData =  {
            ...tableData,
            data: x
          }
          resizeColumns( _tableData )
          return (<OnePage title={'title'} key={key}>
            {
              x.length !== 0 ? (
                <View style={ _styles.root }>
                  <Text> { formatDate(  new Date(x[0].date).toString(), FORMAT_DATES.formatMonthLongYear ) } </Text>
                </View>
              ) : null
            }
            <SummaryTable tableData={_tableData} />
          </OnePage>
          )
        })}
      </Document>
    </PDFViewer>

  )
}

export default SummaryMultiPage

const OnePage = ({ children, pageSize = 'Letter', orientation = 'portrait', showFooter, header }: IPdfProps) => {
  const styles = StyleSheet.create( {
    page : {
      fontFamily : 'Helvetica',
      fontSize : 8,
      paddingTop : 10,
      paddingLeft : 10,
      paddingRight : 10,
      paddingBottom : 26,
      display : 'flex',
      flexDirection : 'column',
      flex : 1
    },
    footer : {
      position : 'absolute',
      right : 5,
      left : 0,
      bottom : 5,
      fontSize : 7,
      textAlign : 'right',
      color : 'grey',
      paddingVertical : 10
    },

  } )
  return (
    <Page size={ pageSize } style={ styles.page } orientation={ orientation }>
      { header ? <PageHeader { ...header }/> : null }
      {
        children
      }
      { showFooter ? <Text
                style={ styles.footer }
                render={ ( { pageNumber, totalPages } ) => `${ pageNumber } / ${ totalPages }` }
                fixed
                break
      /> : null }
    </Page>
  )
}