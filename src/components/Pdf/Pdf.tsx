import React, { PropsWithChildren } from 'react'
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
}                                   from '@react-pdf/renderer'
import _                            from 'lodash'
import {
  ISummarizeRow,
  TABLE_INDEX_SUMMARIZE_COLUMN
}                                   from '../Table'

export interface IPdfProps extends PropsWithChildren<any> {
  title: string
  pageSize?: 'A4' | 'Letter'
  orientation?: 'landscape' | 'portrait'
  styles?: any
  header?: IPageHeaderProps
  showFooter?: boolean
}

export interface IPdfTableColumnProps {
  label: string
  alignment?: 'left' | 'right' | 'center'
  alignmentHeader?: 'left' | 'right' | 'center',
  field?: string,
  sizeType?: number,
  /** column with same sizeType will be same size */
  minSize?: number,
  /** min size in percent */
  size?: number
  /** percent */
  format: (value: any, index?: number, data?: any)=> string
  /** data are total data not just row data */
  render?: React.ComponentType<any>
  renderProps?: any
  renderHeader?: React.ComponentType<any>
  renderHeaderProps?: any,
  summarizedRow?: boolean,
  isSummarized?: boolean,
  style?: any
}

export interface IPdfTableProps {
  columns: IPdfTableColumnProps[]
  data?: any,
  noHeader ?: boolean
  orientation?: 'portrait' | 'landscape'
  summarize?: ISummarizeRow
}

interface IPageHeaderPartProps {
  Component?: React.ComponentType<any>
  props?: any
  text?: string
}

interface IPageHeaderProps {
  leftPart?: IPageHeaderPartProps
  rightPart?: IPageHeaderPartProps
  title?: string
  fixed?: boolean
}

export const PageHeader = ({ title, leftPart, rightPart, fixed }: IPageHeaderProps) => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      textAlign: 'center',
      borderBottomColor: '#f1f1f1',
      borderBottomStyle: 'solid',
      borderBottom: 1,
      paddingBottom: 2,
      marginBottom: 2
    },
    div: {
      flex: 1,
      width: '30%'
    }
  })
  return (
    <View style={styles.header} fixed={fixed}>
      <View style={{...styles.div, width: title ? '30%' : '48%'}}>{leftPart ? leftPart.Component ? <leftPart.Component {...leftPart.props} /> : <Text>{leftPart.text}</Text> : null}</View>
      {title && <View style={styles.div}><Text>{title}</Text></View> }
      <View style={{...styles.div, width: title ? '30%' : '48%'}}>{rightPart ? rightPart.Component ? <rightPart.Component {...rightPart.props} /> : <Text>{rightPart.text}</Text> : null}</View>
    </View>
  )
}
PageHeader.defaultProps = {
  fixed: true
}

const Pdf = ({ children, styles: _styles, title, pageSize, orientation, showFooter, header }: IPdfProps) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 8,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 26,
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      ..._styles
    },
    footer: {
      position: 'absolute',
      right: 5,
      left: 0,
      bottom: 5,
      fontSize: 7,
      textAlign: 'right',
      color: 'grey',
      paddingVertical: 10
    },

  })

  return (
    <PDFViewer style={{ width: '95vh', height: '90vh' }}>
      <Document title={title}>
        <Page size={pageSize} style={styles.page} orientation={orientation} wrap>
          {header ? <PageHeader {...header}/> : null}
          {
            children
          }
          {showFooter ? <Text
            style={styles.footer}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed
            break
          /> : null}
        </Page>
      </Document>
    </PDFViewer>
  )

}

Pdf.defaultProps = {
  orientation: 'portrait',
  pageSize: 'A4'
}

export default Pdf

export interface ITablePdfTRProps extends PropsWithChildren<any> {
  styles?: any
}

export const TR = ({ children, styles = {} }: ITablePdfTRProps) => {
  const style = StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      alignContent: 'center',
      borderBottomStyle: 'solid',
      borderBottom: 1,
      paddingBottom: 2,
      paddingTop: 2,
      borderBottomColor: '#eee',
     // height: 50
    }
  })

  return (
    <View style={{ ...style.root, ...styles }}>{children}</View>
  )
}

export interface ITablePdfTDProps extends PropsWithChildren<any> {
  styles?: any
}

export const TD = ({ children, styles = {} }: ITablePdfTDProps) => {
  const style = StyleSheet.create({
    root: {
      flexWrap: 'wrap',
      textAlign: 'center',
      flex: 1,
      padding: 4,
      borderLeft: 1,
      borderLeftStyle: 'dotted',
      borderLeftColor: '#dddddd',
    }
  })

  return (
    <View style={{ ...style.root, ...styles }}>{children}</View>
  )
}

export interface ITablePdfTHProps extends PropsWithChildren<any> {
  styles?: any
}

export const TH = ({ children, styles = {} }: ITablePdfTHProps) => {
  const style = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      flex: 1,
      marginBottom: 4,
      backgroundColor: '#eeeeee'
    }
  })

  return (
    <View style={{ ...style.root, ...styles }}>{children}</View>
  )
}

export interface ITablePdfTHRProps extends PropsWithChildren<any> {
  styles?: any
}

export const THR = ({ children, styles = {} }: ITablePdfTHRProps) => {
  const style = StyleSheet.create({
    root: {
      flexWrap: 'wrap',
      textAlign: 'center',
      flex: 1,
      padding: 4,
    }
  })

  return (
    <View style={{...style.root,...styles }}>{children}</View>
  )
}

export interface ITablePdfTBODYProps extends PropsWithChildren<any> {
  styles?: any
}

export const TBODY = ({ children, styles = {} }: ITablePdfTBODYProps) => {
  const style = StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'column',
    }
  })

  return (
    <View style={{ ...style.root, ...styles }}>{children}</View>
  )
}

export interface ITablePdfTABLEProps extends PropsWithChildren<any> {
  styles?: any
}

export const TABLE = ({ children, styles = {} }: ITablePdfTABLEProps) => {
  const style = StyleSheet.create({
    root: {
      padding: 2
    }
  })

  return (
    <View style={{ ...style.root, ...styles }}>{children}</View>
  )
}

export const TRD = ({ columns, data, index, items }: { columns: IPdfTableColumnProps[], data: any, index: number, items?: any[] }) => {
  return (
    <TR>
      {columns.map((val: IPdfTableColumnProps, _index) => {

        if (val.render && val.renderProps) {
          const Component = val.render
          const value = _.get(data, val.renderProps.field, '')
          const styles = StyleSheet.create({
            style: {
              // padding: 0,
              flex: _.get(val, 'size', 1),
              ...val.style
            }
          })
          
          let tdStyle = Object.assign(styles.style, columns.length - 1 === _index ? {
            borderRight: 1,
            borderRightStyle: 'dotted',
            borderRightColor: '#dddddd'
          } : {})

          tdStyle = (_index !== 0 && val.summarizedRow && !val.isSummarized) ? Object.assign(tdStyle, {
            borderLeft: 1,
            borderLeftStyle: 'solid',
            borderLeftColor: '#fff',
          }) : tdStyle

          if (val.summarizedRow && !val.isSummarized) {
            return <TD key={+data.id + _index} styles={tdStyle}></TD>
          }
          return <TD key={+data.id + _index} styles={tdStyle}><Component {...val.renderProps} styles={styles} data={data} index={index} value={value} key={+data.id + _index} items={items} /></TD>
        } else {

          const styles = StyleSheet.create({
            style: {
              textAlign: _.get(val, 'alignment', 'center'),
              flex: _.get(val, 'size', 1),
            }
          })

          let tdStyle = Object.assign(styles.style, columns.length - 1 === _index ? {
            borderRight: 1,
            borderRightStyle: 'dotted',
            borderRightColor: '#dddddd'
          } : {})

          tdStyle = (_index !== 0 && val.summarizedRow && !val.isSummarized) ? Object.assign(tdStyle, {
            borderLeft: 1,
            borderLeftStyle: 'solid',
            borderLeftColor: '#fff',
          }) : tdStyle

          const styleView = StyleSheet.create({
            style: {
              flex: 1,
              justifyContent: 'center'
            }
          })
          return <TD key={+data.id + _index} styles={tdStyle}>
            <View style={styleView.style}>
              <Text style={{textAlign: _.get(val, 'alignment', 'center')}}>{(val.summarizedRow && !val.isSummarized) ? '' : val.format(data, index)}</Text>
            </View>
          </TD>
        }

      })}
    </TR>
  )
}

export const HEADER = ({ columns, style }: { columns: IPdfTableColumnProps[], style?: any }) => {

  return (
    <TH styles={style}>
      {columns.map((val: IPdfTableColumnProps, index) => {
        if (val.renderHeader && val.renderHeaderProps) {
          const Component = val.renderHeader
          const styles = StyleSheet.create({
            style: {
              padding: 0,
              flex: _.get(val, 'size', 1),
              justifyContent: 'center',
            }
          })
          return <THR key={index} styles={styles.style}><Component {...val.renderHeaderProps} styles={styles} index={index} key={index}/></THR>
        } else {
          const styles = StyleSheet.create({
            style: {
              textAlign: _.get(val, 'alignmentHeader', 'center'),
              flex: _.get(val, 'size', 1),
              justifyContent: 'center',
            }
          })
          return (
            <THR key={index} styles={styles.style}>
              <View>
                <Text>{val.label}</Text>
              </View>
            </THR>
          )
        }
      })}
    </TH>
  )
}

export const Table = ({ tableData }: { tableData: IPdfTableProps }) => {

  const { data = [], columns, summarize, noHeader } = tableData

  const modelSummarize = React.useMemo(() => {
    if (!summarize?.fields || !data || data.length < 2) {
      return null
    }
    const _data = summarize.fields.reduce((acc: any, field: string,index: number) => {
      const value = data.reduce((a: any, n: any) => {
        return _.add(a, Number(_.get(n, field, 0)))
      }, 0)

      return {
        ...acc,
        id: index + 99999,
        [field]: value
      }
    }, {})

    const header = columns.map(x => {
      const isSummarized = !!summarize.fields.find(s => s === x.field)
      return {
        ...x,
        summarizedRow: true,
        isSummarized
      }
    })
    return {
      model: _data,
      header,
    }
  }, [data, summarize, columns])

  return (
    <TABLE>
      {!noHeader && <HEADER columns={columns}/> }
      <TBODY>
        {data.map((x: any, index: number) => <TRD data={x} columns={columns} key={x.id} index={index}/>)}
        {modelSummarize && <TRD data={modelSummarize.model}  columns={modelSummarize.header} key={data.length} index={TABLE_INDEX_SUMMARIZE_COLUMN} items={data}/>}
      </TBODY>
    </TABLE>
  )
}

export const resizeColumns = (tableData: IPdfTableProps) => {

  tableData.columns = tableData.columns.map(x => ({
    ...x,
    size: x.label.length + 2
  }))

  tableData.columns = tableData.columns.map(x => {
    const maxSize = tableData.data.reduce((acc: number, value: string) => {
      if (!value) {
        return acc
      }
      const len = (x.format(value) || '').length
      return len > acc ? len : acc
    }, 1)
    return {
      ...x,
      size: maxSize
    }
  })

  const sizeTypes = _.uniq(tableData.columns.filter(x => !!x.sizeType).map(x => x.sizeType)).map(x => ({
    sizeType: x as number,
    size: 1
  }))
    .map(x => ({
      ...x,
      size: tableData.columns.reduce((acc: number, y: any) => {
        if (Number(y.sizeType) !== Number(x.sizeType)) {
          return acc
        }
        return Number(y.size) > acc ? y.size : acc
      }, x.size)
    }))

  if (sizeTypes.length > 0) {
    tableData.columns = tableData.columns.map(x => {
      const type = sizeTypes.find(y => x.sizeType && x.sizeType === y.sizeType)
      const size = type && type.size > Number(x.size) ? type.size : x.size
      const isSummarized = !!(tableData.summarize?.fields || []).find(ss => ss === x.field)
      return {
        ...x,
        size: isSummarized ? Number(size) + 1 : size
      }
    })
  }

  const totalSize = tableData.columns.reduce((acc, x) => {
    return acc + Number(x.size)
  }, 0)

  tableData.columns = tableData.columns.map(x => {
    let size = Math.floor(_.divide(_.multiply(x.size as number, 100), totalSize))
    if (x.minSize && x.minSize > size) {
      size = x.minSize
    }
    return {
      ...x,
      size
    }
  })
  return 'portrait'
}

