import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Button,
    FlatList,
    Text,
    TextInput,
    Picker
} from 'react-native';

const qList = [
    {
        question : [
            'question : 00',
            'Hello,',
            'This is first question.',
            "What's your name?"
        ],
        answerType : 0,
        nextQuestion : 1
    },
    {
        question : [
            'question : 01',
            'Where do you wanna go?'
        ],
        answerType : 1,
        select: ['aa', 'bb', 'cc', 'no'],
        nextQuestion : [2, 2, 2, 3]
    },
    {
        question : [
            'question : 02',
            'Put extra Location Information.'
        ],
        answerType : 0,
        nextQuestion : 3
    },
    {
        question : [
            'question : 03',
            'When do you wanna go?'
        ],
        answerType : 2,
        nextQuestion : -1
    }
]

export default () => {
    const [ question, setQuestion ] = useState(0)
    const [ answerBoxTrigger, setAnswerBoxTrigger] = useState(false)
    const [ chatList, setChatList ] = useState([])

    if (!answerBoxTrigger) {
        setChatList(chatList.concat([{type:'q', chats: qList[question].question}]))
        // setChatList(chatList.push({type:'q', chats: qList[question].question}))
        setAnswerBoxTrigger(true)
    }

    answerInput = (answerData) =>{
        setQuestion(answerData.nextQuestion)
        setChatList(chatList.concat([{type:'a', chats:[answerData.answer]}]))
        setAnswerBoxTrigger(false)
    }

    return(
        <View style={{flex:1}}>
            <FlatList
                data={chatList}
                renderItem = {({item}) => <AChat data = {item} />}
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
    if (props.data.type=='q'){
        chatColor = 'red'
        chatPosition = 'flex-start'
    }else if(props.data.type == 'a'){
        chatColor = 'blue'
        chatPosition = 'flex-end'
    }
    console.log(props)
    return(
        <View>
            {props.data.chats.map((contact, i) => {
                return(
                    <View style={{width:'100%', padding:5, alignItems:chatPosition}}>
                        <View style={{minHeight:40, minWidth:60, padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                            <Text style={{color:'white'}}>{contact}</Text>
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
                        style = {{width:'80%', height:40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText = {inputText => setInputText(inputText)}
                        value = {inputText}
                    />
                    <View style={{width:'20%', justifyContent:'center'}}>
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
            {inputBox()}
        </View>
    )
}