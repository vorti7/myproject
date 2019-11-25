import React from 'react'
import { Navigation } from 'react-native-navigation'
import StartApp from './startApp'
import Chatbot from './chatbot'
import Chat from './chat'
import Calendar from './calendar'
import DateTimePicker from './datetimePicker'
import Test from './test'
import LoadingChat from './loadingChat'

// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from '@apollo/react-hooks';

// const client = new ApolloClient({
//     // uri : 'https://7ol3wr5hv5hsbezkdx5kklvqbq.appsync-api.ap-northeast-2.amazonaws.com/graphql'
//     uri : 'https://48p1r2roz4.sse.codesandbox.io'
// })

// // const WithProvider = (Component) => {
// //     <ApolloProvider client={client}>
// //         <Component {...this.props} />
// //     </ApolloProvider>
// // }


export default Screen = {
    registerComponent(){
        Navigation.registerComponent('startAppScreen', () => StartApp)
        Navigation.registerComponent('chatbotScreen', () => Chatbot)
        Navigation.registerComponent('chatScreen', () => Chat)
        Navigation.registerComponent('calendarScreen', () => Calendar)
        Navigation.registerComponent('dateTimePickerScreen', () => DateTimePicker)
        Navigation.registerComponent('loadingChatScreen', () => LoadingChat)
        Navigation.registerComponent('testScreen', () => Test)
    }
}
