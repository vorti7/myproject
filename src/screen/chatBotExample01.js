import React, { useState,
    useCallback,
    useEffect,
    useRef
} from 'react';
import {
Platform,
View,
Button,
FlatList,
Text,
TextInput,
Picker,
TouchableOpacity,
Alert,
Animated
} from 'react-native';

import LoadingChat from './loadingChat'


// question List Input
const qList = [
    {
        question : [
            "question : 00\nHello, This is first question.\nWhat's your name?",
        ],
        answerType : 0,
        nextQuestion : 1
    },
    {
        question : 'question : 01\nWhere do you wanna go?',
        answerType : 1,
        select: ['aa', 'bb', 'cc', 'no'],
        nextQuestion : [2, 2, 2, 3]
    },
    {
        question : 'question : 02\nPut extra Location Information.',
        answerType : 0,
        nextQuestion : 3
    },
    {
        question : 'question : 03\nWhen do you wanna go?',
        answerType : 2,
        nextQuestion : -1
    }
]

export default () => {
    const flatListRef = useRef(null);

    const [ question, setQuestion ] = useState(0)
    const [ answerBoxTrigger, setAnswerBoxTrigger ] = useState(false)

    const [ loadingTrigger, setLoadingTrigger ] = useState(false)

    const [ chatList, setChatList ] = useState([])

    const [ animValue, setAnimValue] = useState(new Animated.Value(0))
    const listHeight = animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['100%', '85%', '70%']
    })
    const bottomHeight = animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0%', '15%', '30%']
    })
    
    if (!answerBoxTrigger && !loadingTrigger) {
        console.log('question Input')
        // setChatList(chatList.pop()) // setState used twice how to solve?
        if(chatList.length==0){
            setChatList(chatList.concat([{type:'q', qIndex:question, chat: qList[question].question}, {type:'loadingA'}]))
        }else{
            const changeChatList =[...chatList]
            changeChatList[chatList.length - 1] = {type:'q', qIndex:question, chat: qList[question].question}
            changeChatList.push({type:'loadingA'})
            setChatList(changeChatList)
        }
        setAnswerBoxTrigger(true)
        setLoadingTrigger(true)
    }

    changeInputBoxHeight = (index) => {
        if(index == 0){
            Animated.timing(
                animValue,
            {
                toValue: 0,
                duration: 1000,
            }
            ).start();
        }else if(index == 1){
            Animated.timing(
                animValue,
            {
                toValue: 0.5,
                duration: 1000,
            }
            ).start();
        }else if(index == 2){
            Animated.timing(
                animValue,
            {
                toValue: 1,
                duration: 1000,
            }
            ).start();
        }
    }

    answerInput = (answerData) => {
        console.log('answer Input')
        // setChatList(chatList.pop())
        // setChatList(chatList.concat([{type:'a', qIndex:question, chat:answerData.answer},{type:'loadingQ'}]))
        const changeChatList =[...chatList]
        changeChatList[chatList.length - 1] = {type:'a', qIndex:question, chat:answerData.answer}
        changeChatList.push({type:'loadingQ'})
        setChatList(changeChatList)
        setQuestion(answerData.nextQuestion)
        setAnswerBoxTrigger(false)
        setTimeout(()=>{
            setLoadingTrigger(false)
        }, 3000)
    }

    scrollTo = (index) => {
        flatListRef.current.scrollToIndex(index)
    }

    fixAnswer = (index) => {
        Alert.alert(
            'Fix answer',
            'Do you want to fix this answer?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => {
                    setChatList(chatList.slice(0,index))
                    setQuestion(chatList[index-1].qIndex)
                }},
            ]
        )
    }

    return(
        <View style={{flex:1}}>
            <Animated.View style={{height:listHeight}}>
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
                    ListFooterComponent = {() => {
                        // let chatPosition = chatList.length%2 == 1 ? 'flex-end' : 'flex-start' 
                        // let chatColor = chatList.length%2 == 1 ? 'blue' : 'red'
                        return (
                            <View style={{
                                width:'100%',
                                padding:5,
                                // alignItems:chatPosition
                            }}>
                                {/* <View style={{minHeight:40, minWidth:60, padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                                    <LoadingChat/>
                                </View> */}
                                <View style={{height:200}}/>
                            </View>
                        )
                    }}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                    keyExtractor = {(item, index) => index.toString()}
                />
            </Animated.View>
            <Animated.View style={{height:bottomHeight, borderTopWidth:5, borderColor:'black', backgroundColor:'yellow'}}>
                <InputContainer
                    changeInputBoxHeight = {(index) => changeInputBoxHeight(index)}
                    data = {qList[question]}
                    showTrigger = {answerBoxTrigger}
                    answerInput={(answerData) => answerInput(answerData)}
                />
            </Animated.View>
        </View>
    )
}

function AChat(props){
    chatColor = 'white'
    chatPosition = ''
    chatTouchable = true
    if (props.data.type=='q' || props.data.type == 'loadingQ'){
        // chatColor = 'red'
        chatColor = '#6ca2e6'
        chatPosition = 'flex-start'
    }else if(props.data.type == 'a' || props.data.type == 'loadingA'){
        // chatColor = 'blue'
        chatColor = "#6cd4e6"
        chatPosition = 'flex-end'
        chatTouchable = false
    }

    const [animValue] = useState(new Animated.Value(0))
    
    useEffect(() => {
        if(props.data.type=='q' || props.data.type=='a'){
            // console.log(props.data.type,'---------------')
            Animated.timing(
                animValue,
                {
                    toValue: 1,
                    duration: 1000,
                }
            ).start();
        } else if(props.data.type=='loadingQ' || props.data.type=='loadingA'){
            // console.log(props.data.type,'---------------')
            Animated.timing(
                animValue,
                {
                    toValue: 0.5,
                    duration: 500,
                    delay:1000
                }
            ).start();
        }
    }, [props.data.type])


    // const chatWidth = animValue.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [0, 60, 120]
    // })
    const chatText = animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 10, 20]
    })
    // const chatSize = animValue.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [0, 100, 200]
    // })
    const chatOpacity = animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 2]
    })
    if(props.data.type == 'q' || props.data.type == 'a'){
        return(
            <View>
                <View
                    style={{width:'100%', padding:5, alignItems:chatPosition}}
                >
                    {/* <View style={{backgroundColor:'green', width:50, height:50}}>

                    </View> */}
                    <Animated.View style={{
                        // opacity: animValue,
                        // left: animValue
                        minHeight:40,
                        // minWidth: chatWidth,
                        minWidth: 60,
                        maxWidth:'70%',
                        padding:10,
                        backgroundColor:chatColor,
                        borderColor:chatColor,
                        borderWidth:5,
                        borderRadius:5,
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity
                            disabled={chatTouchable}
                            onPress = {() => props.fixAnswer()}
                        >
                            {/* <Text style={{color:'white'}}>{props.data.chat}</Text> */}
                            <Animated.Text style = {{fontSize:chatText}}>{props.data.chat}</Animated.Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        )
    }else if (props.data.type == 'loadingQ' || props.data.type == 'loadingA'){
        return(
            <View
                    style={{width:'100%', padding:5, alignItems:chatPosition}}
            >
                <Animated.View style={{
                    // width: chatSize,
                    // maxHeight: chatSize,
                    opacity:chatOpacity,
                    padding:10,
                    borderColor:chatColor,
                    backgroundColor:chatColor,
                    borderWidth:5,
                    borderRadius:5,
                    justifyContent:'center'
                }}>
                    <LoadingChat/>
                </Animated.View>
            </View>
        )
    }else{
        return (
            <View></View>
        )
    }

}

function InputContainer(props){
    const [ inputText, setInputText ] = useState('')
    // const [ pickerValue, setPickerValue ] = useState('')

    inputBox = () => {
        if(props.data.answerType<0 || !props.showTrigger){
            return <View></View>
        }else if(props.data.answerType==0){
            console.log('Show Text Input')
            props.changeInputBoxHeight(1)
            return (
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style = {{flex:5, fontSize:20, backgroundColor:'red', padding:'1%'}}
                        onChangeText = {inputText => setInputText(inputText)}
                        value = {inputText}
                    />
                    <View style={{flex:1, justifyContent:'center', paddingLeft:'1%'}}>
                        {/* <Button
                            color = 'white'
                            title="INPUT"
                            onPress={() => {
                                props.answerInput({answer: inputText, nextQuestion: props.data.nextQuestion})
                                setInputText('')
                                props.changeInputBoxHeight(0)
                            }}
                        /> */}
                        <TouchableOpacity
                            style={{
                                flex:1,
                                padding:0,
                                backgroundColor:'green',
                                alignItems:'center',
                                justifyContent:'center',
                                padding:'1%'
                            }}
                            onPress={() => {
                                props.answerInput({answer: inputText, nextQuestion: props.data.nextQuestion})
                                setInputText('')
                                props.changeInputBoxHeight(0)
                            }}
                        >
                            <Text numberOfLines={1}>Input</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else if(props.data.answerType==1){
            console.log('Show Select Input')
            props.changeInputBoxHeight(2)
            return (
                <View>
                    {props.data.select.map((contact, i) => {
                        return (
                            <Button
                                key = {i}
                                title={contact}
                                onPress={() => {
                                    props.answerInput({answer: contact, nextQuestion: props.data.nextQuestion[i]})
                                    props.changeInputBoxHeight(0)
                                }}
                            />
                        )
                    })}
                </View>
            )
        }else if (props.data.answerType==2){
            return (
                <View>
                    {/* <Picker
                        selectedValue={pickerValue}
                        style={{height: 50, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                            setPickerValue(itemValue)
                        }
                    >
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker> */}
                </View>
            )
        }
    }
    return(
    <View style={{width:'100%', borderColor:'black', bodrderWidth:0.5}}>
        <View
            style={{width:'100%', backgroundColor:'blue'}}
        >
            {inputBox()}
        </View>
        {/* <View
            style={{backgroundColor:'green', height:Platform.OS === 'ios' ? '5%' : 0}}
        /> */}
    </View>
    )
}