//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimeLine from '../lib/index'
// create a component
const data = [
  {
    title: 'Wake up',
    description: 'Remember tooth brushing and read notes on the tablet',
    time: new Date("March 6, 2018 6:15:00"),
    innerCircleType: 'dot',

  },
  {
    title: 'Eatting',
    description: 'Eat breakfast: bread and drink milk',
    time: new Date("March 6, 2018 7:00:00"),
  },
  {
    title: 'Working',
    description: 'Go to ABX Company and working react-native',
    time: new Date("March 6, 2018 7:35:00"),
  },
  {
    title: 'Relax',
    description: 'Listen to music "Hello Vietnam" song',
    time: new Date("March 6, 2018 14:15:00"),
    dashLine: true,
    dotSize: 8,
    circleSize: 20,
  },
]
class TimeLineBasic extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>TimeLineBasic</Text> */}
        <TimeLine
          data={data.reverse()}
          isRenderSeperator
          innerCircleType={'dot'}
        />
        <TimeLine
          data={data}
          isRenderSeperator
          columnFormat={'two-column'}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default TimeLineBasic;
