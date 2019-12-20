import React, {
    useState,
    useCallback,
    useEffect,
    useRef
} from 'react';
import {
    View,
    Animated,
    FlatList,
    Button,
    Text
} from 'react-native';

const chatTypes = {
    "01":{
        text : "Hello {@name}!\nWho are you going to {@location} with?",
        next : "02",
        answerType : 1
    },
    "02":{
        text : "Wow, very nice!\nTell me more about your familly!",
        next : "03",
        answerType : 2
    },
    "03":{
        text : "When are you planning to go?",
        next : "04",
        answerType : 3
    }
}

export default function ChatBotExample00(){

    const [ animValue, setAnimValue] = useState(new Animated.Value(0))
    const [ chatList, setChatList] = useState([])
    const chatListViewHeight = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['100%', '0%']
    })
    const answerViewHeight = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })

    useEffect(() => {
        if(chatList.length==0){
            makeChatItem(chatTypes["01"])
        }
    })

    const setViewHeight = (val) => {
        Animated.timing(
            animValue,
        {
            toValue: val,
            duration: 500,
        }
        ).start();
    }

    const makeChatItem = (val) => {
        setChatList(chatList.concat([{text:val.text}]))
    }

    return (
        <View style={{flex:1}}>
            <Animated.View style={{width:'100%', height:chatListViewHeight, borderBottomWidth:1}}>
                <FlatList
                    data={chatList}
                    renderItem={({item, index}) => 
                            <AChat
                                index = {index}
                                chatData = {item}
                            />
                    }
                />
            </Animated.View>
            <Animated.View style={{width:'100%', height:answerViewHeight, borderTopWidth:1}}>
                <View
                    style={{
                        flex:1,
                    }}
                >

                </View>
            </Animated.View>
        </View>
    )
}

function AChat(props){
    console.log(props.chatData.text)
    const re = /.*.}$/;
    const chatText = re.exec(props.chatData.text)
    console.log('re : ', chatText)
    return (
        <View
            style={{
                width:'100%',
                borderWidth:1,
            }}
        >
            {/* <Text>{chatText}</Text> */}
        </View>
    )
}

function textChanger(text){
    const result = ""
    return result
}