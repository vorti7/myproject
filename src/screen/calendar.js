import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Button,
    Text
  } from 'react-native';
  import { Navigation } from "react-native-navigation";

export default (props) => {

    return (
        <View style={{flex:1}}>
            <Calendar

            />
        </View>
    )
}

export function Calendar () {
    let date = new Date()
    const [ month, setMonth ] = useState(date.getMonth())
    const monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    return (
        <View style={{flex:1, flexDirection:'column'}}>
            <View style={{flex:1, backgroundColor:'green', justifyContent:'center', alignItems:'center'}}>
                <Text>{monthString[month]}</Text>
            </View>
            <View style={{flex:5, backgroundColor:'red', flexDirection:'row'}}>
                {num.map((contact,i) =>{
                    return (
                        <View style={{width:'10%',height:'10%', backgroundColor:'yellow', borderColor:'black', borderWidth:1}}>
                            <Text>{contact}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}