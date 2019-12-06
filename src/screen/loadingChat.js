import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    Alert,
    Animated
  } from 'react-native';
  import { Navigation } from "react-native-navigation";

export default (props) => {
    const [ dotCount, setDotCount ] = useState(1)

    useEffect(() => {
        dotChange()
        return () => {
            // console.log('loadingChat off!')
            clearTimeout(timer)
        }
      }, []);

    dotChange = () => {
        // console.log(dotCount)
        if (dotCount<3){
            setDotCount(dotCount + 1)
        }else{
            setDotCount(1)
        }
        return timer = setTimeout(() => {
            dotChange()
        }, 1000);
    }

    return(
        <View style={{borderRadius:20, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:10, fontWeight:'bold'}}>{' ● ' .repeat(dotCount)}</Text>
        </View>
    )
}