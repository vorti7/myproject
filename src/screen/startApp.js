import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Button,
    Text
  } from 'react-native';
  import { Navigation } from "react-native-navigation";
  // import ApolloClient from 'apollo-boost'
  // import { useQuery } from '@apollo/react-hooks'
  // import { gql } from 'apollo-boost'

export default (props) => {

    goChatbot = () => {
      Navigation.push(props.componentId, {
        component: {
          name:'chatbotScreen'
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

    return(
        <View style={{flex:1}}>
          <Button
            title="go Chat"
            onPress={() => goChatbot()}
          />
          <Button
            title="go Calendar"
            onPress={() => goCalendar()}
          />
        </View>
    )
}