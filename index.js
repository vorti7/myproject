import { Navigation } from "react-native-navigation";
import App from "./App";
import Screen from './src/screen'

Screen.registerComponent()


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "startAppScreen"
            }
          }
        ]
      }
    }
  });
});