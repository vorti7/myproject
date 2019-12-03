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
        setChatList(chatList.concat([{type:'q', qIndex:question, chat: qList[question].question}]))
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
        setChatList(chatList.concat([{type:'a', qIndex:question, chat:answerData.answer}]))
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
            <Animated.View style={{height:listHeight, backgroundColor:'green'}}>
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
                        let chatPosition = chatList.length%2 == 1 ? 'flex-end' : 'flex-start' 
                        let chatColor = chatList.length%2 == 1 ? 'blue' : 'red'
                        return (
                            <View style={{width:'100%', padding:5, alignItems:chatPosition}}>
                                <View style={{minHeight:40, minWidth:60, padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                                    <LoadingChat/>
                                </View>
                                <View style={{height:200}}/>
                            </View>
                        )
                    }}
                    onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                    keyExtractor = {(item, index) => index.toString()}
                />
            </Animated.View>
            <Animated.View style={{height:bottomHeight, backgroundColor:'yellow'}}>
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
        chatColor = 'red'
        chatPosition = 'flex-start'
    }else if(props.data.type == 'a' || props.data.type == 'loadingA'){
        chatColor = 'blue'
        chatPosition = 'flex-end'
        chatTouchable = false
    }

    const [animValue] = useState(new Animated.Value(0))
    useEffect(() => {
        console.log(props.data)
        console.log('Val : ',animValue)
        Animated.timing(
            animValue,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    }, [])


    // const chatWidth = animValue.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [0, 60, 120]
    // })
    const chatText = animValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 10, 20]
    })
    if(props.data.type == 'q' || props.data.type == 'a'){
        return(
            <View>
                <View
                    style={{width:'100%', padding:5, alignItems:chatPosition}}
                >
                    <Animated.View style={{
                        opacity: animValue,
                        // left: animValue
                        minHeight:40,
                        // minWidth: chatWidth,
                        minWidth: 60,
                        maxWidth:'70%',
                        padding:10,
                        backgroundColor:chatColor,
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
        console.log('Val : ',animValue)
        return(
            <Animated.View style={{
                opacity: animValue,
                // left: animValue
            }}>
                <View
                    style={{width:'100%', padding:5, alignItems:chatPosition}}
                >
                    <View style={{minHeight:40, minWidth:60, maxWidth:'70%', padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                        <LoadingChat/>
                    </View>
                </View>
            </Animated.View>
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
                        style = {{flex:5, fontSize:20}}
                        onChangeText = {inputText => setInputText(inputText)}
                        value = {inputText}
                    />
                    <View style={{flex:1, justifyContent:'center', paddingLeft:'1%'}}>
                        <Button
                            title="INPUT"
                            onPress={() => {
                                props.answerInput({answer: inputText, nextQuestion: props.data.nextQuestion})
                                setInputText('')
                                props.changeInputBoxHeight(0)
                            }}
                        />
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
    <View style={{width:'100%', borderColor:'black', bodrderWidth:1}}>
        <View
            style={{width:'100%', padding:'1%'}}
        >
            {inputBox()}
        </View>
        <View
            style={{height:Platform.OS === 'ios' ? '2%' : 0}}
        />
    </View>
    )
}