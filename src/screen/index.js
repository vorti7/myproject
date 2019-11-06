import { Navigation } from 'react-native-navigation'

import StartApp from './startApp'

export default Screen = {
    registerComponent(){
        Navigation.registerComponent('startAppScreen', () => StartApp)
    }
}
