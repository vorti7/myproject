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
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';

const chatTypes = {
    "01":{
        text : "Hello {@name}!\nWho are you going to {@location} with?",
        next : "02",
        answerType : 2,
        select : ["Alone", "Couple", "Friends", "Familly"]
    },
    "02":{
        text : "Wow, very nice!\nTell me more about your familly!",
        next : "03",
        answerType : 3
    },
    "03":{
        text : "When are you planning to go?",
        next : "04",
        answerType : 4
    }
}

export default function ChatBotExample00(){

    const [ animValue, setAnimValue] = useState(new Animated.Value(0))
    const [ chatList, setChatList] = useState([])
    const [ answerContainerTrigger, setAnswerContainerTrigger ] = useState(false)
    const [ question, setQuestion ] = useState(chatTypes["01"])
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
            addQuestion(question)
        }
    })

    const setAnswerContainerHeight = (val) => {
        Animated.timing(
            animValue,
        {
            toValue: val,
            duration: 500,
        }
        ).start();
    }

    const addQuestion = (val) => {
        setChatList(chatList.concat([{type: 'q', text:textChanger(val.text)}]))
        setAnswerContainerTrigger(true)
    }

    const addAnswer = (val) => {
        setChatList(chatList.concat([{type: 'a', text:val}]))
        setAnswerContainerTrigger(false)
    }

    const textChanger = (text) => {
        return text
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
                    <AnswerContainer
                        // answerType = {answerType}
                        question = {question}
                        addAnswer = {(value) => addAnswer(value)}
                        setAnswerContainerHeight = {(value) => setAnswerContainerHeight(value)}
                    />
                </View>
            </Animated.View>
        </View>
    )
}

function AChat(props){
    const chatPosition = props.chatData.type == 'q' ? "flex-start" : "flex-end"
    const chatText = props.chatData.text
    return (
        <View
            style={{
                width:'100%',
                borderBottomWidth:1,
                alignItems:chatPosition
            }}
        >
            <Text>{chatText}</Text>
        </View>
    )
}

function AnswerContainer(props){

    const [ answerData, setAnswerData ] = useState("")

    const answerTypes = () => {
        switch(props.question.answerType){
            case 1:
                props.setAnswerContainerHeight(0.08)
                return (
                    <View
                        style={{
                            flex:1,
                            flexDirection:'row'
                        }}
                    >
                        <TextInput
                            style={{flex:3}}
                            onChangeText={answerData => setAnswerData(answerData)}
                        />
                        <TouchableOpacity
                            style={{flex:1, alignItems:'center', justifyContent:'center'}}
                            onPress={() => props.addAnswer(answerData)}
                        >
                            <Text>Button</Text>
                        </TouchableOpacity>
                    </View>
                )
            case 2:
                props.setAnswerContainerHeight(0.3)
                console.log(props.question.select)
                return (
                    <View
                        style={{
                            flex:1,
                            flexDirection:'column'
                        }}
                    >
                        <View
                            style={{
                                flex:1.5,
                                paddingLeft:'5%',
                                paddingRight:'5%'
                            }}
                        >
                            <ScrollView
                                horizontal={true}
                            >
                                {
                                    props.question.select.map((content, index) => {
                                        return (
                                            <View
                                                style={{
                                                    width:150,
                                                    height:"100%",
                                                    alignItems:'center',
                                                    justifyContent:'center'
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        width:'80%',
                                                        height:'80%',
                                                        padding:5,
                                                        borderWidth:1,
                                                        borderRadius:25,
                                                        borderColor:'#000AFF',
                                                        alignItems:'center',
                                                        justifyContent:'center'
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color:'#000AFF',
                                                            fontSize:20,
                                                        }}
                                                    >
                                                        {content}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                flex:1,
                                paddingLeft:'5%',
                                paddingRight:'5%',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <TextInput
                                style={{
                                    height:'100%',
                                    width:'100%',
                                    borderWidth:1,
                                    borderStyle:'dotted',
                                    borderRadius:5
                                }}
                                onChangeText={answerData => setAnswerData(answerData)}
                            />
                        </View>
                        <View
                            style={{
                                flex:1.5,
                                paddingLeft:'5%',
                                paddingRight:'5%',
                                flexDirection:'row'
                            }}
                        >
                            <View
                                style={{
                                    flex:1,
                                    alignItems:'flex-start',
                                    justifyContent:'center'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width:'50%',
                                        height:'80%',
                                        padding:5,
                                        borderWidth:1,
                                        borderRadius:25,
                                        borderColor:'#000AFF',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:'#000AFF',
                                            fontSize:20,
                                        }}
                                    >
                                        ↻
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flex:1,
                                    alignItems:'flex-end',
                                    justifyContent:'center'
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width:'80%',
                                        height:'80%',
                                        padding:5,
                                        borderWidth:1,
                                        borderRadius:25,
                                        borderColor:'#000AFF',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            color:'#000AFF',
                                            fontSize:20,
                                        }}
                                    >
                                        ✔
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            case 3:
                return (
                    <View
                        style={{
                            flex:1,
                            backgroundColor:'blue'
                        }}
                    >
                        
                    </View>
                )
            default:
                props.setAnswerContainerHeight(0)
                return (
                    <View>

                    </View>
                )
        }
    }

    return (
        <View
            style={{
                flex: 1,
                borderTopWidth:1,
            }}
        >
            {answerTypes()}
        </View>
    )
}