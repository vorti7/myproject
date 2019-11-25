import React, { Component, useState, useCallback, useEffect } from 'react';
import {
    View,
    Button,
    Text
  } from 'react-native';
  import { Navigation } from "react-native-navigation";
  import DateTimePicker from '@react-native-community/datetimepicker';

// export default (props) => {

//     const [ show, setShow ] = useState(false)
//     const [ date, setDate ] = useState(new Date('2020-06-12T14:42:42'))
//     const [ mode, setMode ] = useState('date')

//     datepicker = () => {
//         setMode('date')
//         setShow(true)
//     }

//     timepicker = () => {
//         setMode('time')
//         setShow(true)
//     }

//     return(
//         <View style={{flex:1}}>
//             <View>
//             <Button onPress={() => datepicker()} title="Show date picker!" />
//             </View>
//             <View>
//             <Button onPress={() => timepicker()} title="Show time picker!" />
//             </View>
//             { show && <DateTimePicker value={date}
//                         mode={mode}
//                         is24Hour={true}
//                         display="default"
//                         onChange={(event, date) => setDate(date)} />
//             }
//         </View>
//     )
// }

export default class App extends Component {
    state = {
      date: new Date('2020-06-12T14:42:42'),
      mode: 'date',
      show: false,
    }
  
    setDate = (event, date) => {
      date = date || this.state.date;
  
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        date,
      });
    }
  
    show = mode => {
      this.setState({
        show: true,
        mode,
      });
    }
  
    datepicker = () => {
      this.show('date');
    }
  
    timepicker = () => {
      this.show('time');
    }
  
    render() {
      const { show, date, mode } = this.state;
  
      return (
        <View>
          <View>
            <Button onPress={this.datepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={this.timepicker} title="Show time picker!" />
          </View>
          { show && <DateTimePicker value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.setDate} />
          }
        </View>
      );
    }
  }