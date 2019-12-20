import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import { Navigation } from "react-native-navigation";
  
export default (props) => {

    goChatbot = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'chatBotScreen'
        }
      })
    }

    goSingleChatbot = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'singleChatBotScreen'
        }
      })
    }

    goChat = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'chatScreen'
        }
      })
    }

    goCalendar = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'calendarScreen'
        }
      })
    }

    goDateTimePicker = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'dateTimePickerScreen'
        }
      })
    }

    goLoadingChat = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'loadingChatScreen'
        }
      })
    }

    goTest = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'testScreen'
        }
      })
    }

    goChatBotExample00 = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'chatBotExampleScreen00'
        }
      })
    }

    goChatBotExample01 = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'chatBotExampleScreen01'
        }
      })
    }
    
    return(
        <View style={{flex:1}}>
          <Button
            title="go Chatbot"
            onPress={() => goChatbot()}
          />
          <Button
            title="go SingleChatbot"
            onPress={() => goSingleChatbot()}
          />
          <Button
            title="go Chat"
            onPress={() => goChat()}
          />
          <Button
            title="go Calendar"
            onPress={() => goCalendar()}
          />
          <Button
            title="go DateTimePicker"
            onPress={() => goDateTimePicker()}
          />
          <Button
            title="go LoadingChat"
            onPress={() => goLoadingChat()}
          />
          <Button
            title="go Test"
            onPress={() => goTest()}
          />
          <Button
            title="go chatbot example00"
            onPress={() => goChatBotExample00()}
          />
          <Button
            title="go chatbot example01"
            onPress={() => goChatBotExample01()}
          />
        </View>
    )
}