import React from 'react'
import { Navigation } from 'react-native-navigation'
import StartApp from './startApp'
import Chatbot from './chatbot'
import Calendar from './calendar'

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
        Navigation.registerComponent('calendarScreen', () => Calendar)
    }
}
