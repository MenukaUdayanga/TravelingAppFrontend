import { View,Text,StyleSheet} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'


export default function InputFileds(props) {
  return (
    <View>
     <TextInput
      label={props.label}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      onBlur={props.onBlur}
      style={{
        backgroundColor:'#e4eded',
        width:'90%',
        marginRight:'5%',
        marginLeft:'5%',
        marginTop:30,
      }}
    />
    </View>
  )
}



