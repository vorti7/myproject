import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Animated,
    Button,
    Text,
    Alert
  } from 'react-native';
  import { Navigation } from "react-native-navigation";
  import LoadingChat from './loadingChat'

export default (props) => {
    const [ animValue, setAnimValue] = useState(new Animated.Value(0))
    const backColor = animValue.interpolate({
        inputRange: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
        outputRange: ['#ffffff', '#ff4d4d', '#ffa366', '#ffa366', '#66ff66', '#6666ff', '#000080', '#6600cc', '#000000']
    })
    const changeColor = () => {
        console.log(animValue)
        const goVal = 0
        if (animValue == 0){
            goVal = 1
        }

        Animated.timing(
            animValue,
            {
                toValue: 1,
                duration: 10000,
            }
        ).start();
    }
    return(
        <Animated.View
            style={{
                flex:1,
                backgroundColor:backColor
            }}
        >
            <Button
                title = "Click"
                onPress = {() => changeColor()}
            />
        </Animated.View>
    )
}