import _              from 'lodash'
import React          from 'react'
import {
  StyleSheet,
  View,
  Text
} from '@react-pdf/renderer'

export const RenderBankTransactionPdfDocumentColumn = ({value,index,model} : any) => {
  const styles = StyleSheet.create({
    root:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:2,
      paddingRight:2,
      flex: 1
    },
  })

 // const _model = additionalData[index]
 // const documentId = _model.documentId ? _.get(_model,'documentId')  : ''
 // const description = _model.description ? _.get(_model,'description') : ''
  return (
    <View style={styles.root}>
      <Text>{'Bank transaction '}</Text>
      <Text></Text>
    </View>
  )
}
