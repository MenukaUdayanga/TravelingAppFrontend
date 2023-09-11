import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const ButtonEdit = (props) => {
    return (
        <View>
            <Button
                icon={props.icon}
                mode="contained"
                onPress={props.onPress}
                label={props.label}
            

                style={{
                    width:'90%',
                    marginLeft:'5%',
                    marginRight:'5%',
                    marginTop:props.marginTop,
                    backgroundColor:props.backgroundColor
                }}
            >

                {props.children}

            </Button>
        </View>
    )
}

export default ButtonEdit