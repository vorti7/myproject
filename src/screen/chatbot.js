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
    Alert
} from 'react-native';


// question List Input
const qList = [
    {
        question : [
            'question : 00',
            'Hello,',
            'This is first question.',
            "What's your name?",
            '',
            '',
            '',
            ''
        ],
        answerType : 0,
        nextQuestion : 1
    },
    {
        question : [
            'question : 01',
            'Where do you wanna go?',
            '',
            '',
            '',
            ''
        ],
        answerType : 1,
        select: ['aa', 'bb', 'cc', 'no'],
        nextQuestion : [2, 2, 2, 3]
    },
    {
        question : [
            'question : 02',
            'Put extra Location Information.',
            '',
            '',
            '',
            ''
        ],
        answerType : 0,
        nextQuestion : 3
    },
    {
        question : [
            'question : 03',
            'When do you wanna go?',
            '',
            '',
            '',
            ''
        ],
        answerType : 2,
        nextQuestion : -1
    }
]

export default () => {
    const flatListRef = useRef(null);

    const [ question, setQuestion ] = useState(0)
    const [ answerBoxTrigger, setAnswerBoxTrigger ] = useState(false)
    const [ chatList, setChatList ] = useState([])

    if (!answerBoxTrigger) {
        setChatList(chatList.concat([{type:'q', qIndex:question, chats: qList[question].question}]))
        setAnswerBoxTrigger(true)
    }

    answerInput = (answerData) => {
        setChatList(chatList.concat([{type:'a', qIndex:question, chats:[answerData.answer]}]))
        setQuestion(answerData.nextQuestion)
        setAnswerBoxTrigger(false)
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
                                <Text style={{color:'white'}}>loading</Text>
                            </View>
                        </View>
                    )
                }}
                onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                keyExtractor = {(item, index) => index.toString()}
            />
            <InputContainer
                data = {qList[question]}
                answerInput={(answerData) => answerInput(answerData)}
            />
        </View>
    )
}

function AChat(props){
    chatColor = 'white'
    chatPosition = ''
    chatTouchable = true
    if (props.data.type=='q'){
        chatColor = 'red'
        chatPosition = 'flex-start'
    }else if(props.data.type == 'a'){
        chatColor = 'blue'
        chatPosition = 'flex-end'
        chatTouchable = false
    }

    return(
        <View>
            {props.data.chats.map((contact, i) => {
                return(
                    <View
                        key = {i}
                        style={{width:'100%', padding:5, alignItems:chatPosition}}
                    >
                        <View style={{minHeight:40, minWidth:60, padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                            <TouchableOpacity
                                disabled={chatTouchable}
                                onPress = {() => props.fixAnswer()}
                            >
                                <Text style={{color:'white'}}>{contact}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

function InputContainer(props){
    const [ inputText, setInputText ] = useState('')
    // const [ pickerValue, setPickerValue ] = useState('')

    inputBox = () => {
        if(props.data.answerType<0){
            return <View></View>
        }else if(props.data.answerType==0){
            return (
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style = {{width:'80%', height:40, fontSize:20}}
                        onChangeText = {inputText => setInputText(inputText)}
                        value = {inputText}
                    />
                    <View style={{width:'20%', justifyContent:'center', paddingLeft:'1%'}}>
                        <Button
                            title="INPUT"
                            onPress={() => props.answerInput({answer: inputText, nextQuestion: props.data.nextQuestion})}
                        />
                    </View>
                </View>
            )
        }else if(props.data.answerType==1){
            return (
                <View>
                    {props.data.select.map((contact, i) => {
                        return (
                            <Button
                                key = {i}
                                title={contact}
                                onPress={() => props.answerInput({answer: contact, nextQuestion: props.data.nextQuestion[i]})}
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