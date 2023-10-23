import React  from 'react'
import { StyleSheet, View, Image} from '@react-pdf/renderer'
import _image                     from '../../../../../assets/images/logo-placeholder.png'

const LogoPdfComponent = ({image} : {image ?: string}) => {
   
  const styles = StyleSheet.create({
    root: {
      maxWidth: 80,
      maxHeight: 70
    }
  })
    
  return (
    <View style={styles.root}>
      <Image src={image ? image : _image} />
    </View>
  )
}

export default LogoPdfComponent