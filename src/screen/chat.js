import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    Button,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default () => {
    const flatListRef = useRef(null);

    const [ chatList, setChatList ] = useState([])

    chatInput = (chatData) => {
        setChatList(chatList.concat([{writer: '', chat:chatData}]))
    }

    return(
        <View style={{flex:1}}>
            <FlatList
                ref = {flatListRef}
                data={chatList}
                renderItem = {({item, index}) =>
                                <AChat
                                    chatIndex = {index}
                                    data = {item}
                                    fixAnswer = {() => fixAnswer(index)}
                                />
                            }
                // ListFooterComponent = {() => {
                //     let chatPosition = chatList.length%2 == 1 ? 'flex-end' : 'flex-start' 
                //     let chatColor = chatList.length%2 == 1 ? 'blue' : 'red'
                //     return (
                //         <View style={{width:'100%', padding:5, alignItems:chatPosition}}>
                //             <View style={{minHeight:40, minWidth:60, padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                //                 <Text style={{color:'white'}}>loading</Text>
                //             </View>
                //         </View>
                //     )
                // }}
                onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                keyExtractor = {(item, index) => index.toString()}
            />
            <InputContainer
                chatInput={(chatData) => chatInput(chatData)}
            />
        </View>
    )
}

function AChat(props){
    chatColor = 'white'
    chatPosition = ''
    chatTouchable = true
    if (props.data.writer==''){ // recognize chat writer.
        chatColor = 'blue'
        chatPosition = 'flex-end'
        // chatTouchable = false
    }else{
        chatColor = 'red'
        chatPosition = 'flex-start'
    }

    return(
        <View
            style={{width:'100%', padding:5, alignItems:chatPosition}}
        >
            <View style={{minHeight:40, minWidth:60, maxWidth:'70%', padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                    <Text style={{color:'white'}}>{props.data.chat}</Text>
            </View>
        </View>
    )
}

function InputContainer(props){
    const [ inputText, setInputText ] = useState('')

    return(
        <View style={{width:'100%', borderColor:'black', bodrderWidth:1}}>
            <View
                style={{width:'100%', paddingLeft:'1%', paddingRight:'1%'}}
            >
                <View style={{flexDirection:'row'}}>
                    <View style={{width:'12%', justifyContent:'center', padding:4}}>
                        <View style={{flex:1, borderRadius:5, borderWidth:3, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:25}}>+</Text>
                        </View>
                    </View>
                    <TextInput
                        style = {{width:'65%', height:40, paddingLeft:'1%', fontSize:20}}
                        onChangeText = {inputText => setInputText(inputText)}
                        value = {inputText}
                    />
                    <View style={{width:'23%', justifyContent:'center', paddingLeft:'1%'}}>
                        <Button
                            title="INPUT"
                            onPress={() => {
                                props.chatInput(inputText)
                                setInputText('')
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{height:Platform.OS === 'ios' ? '2%' : 0}}
            />
        </View>
    )
}