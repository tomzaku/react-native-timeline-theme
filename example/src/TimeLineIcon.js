//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimeLine from '../lib/index'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';

const data = [
  {
    title: 'Wake up',
    description: 'Remember tooth brushing and read notes on the tablet',
    time: new Date("March 6, 2018 6:15:00"),
    renderIcon: () => <Icon name={'alarm'} size={40} color={'#304ffe'}/>,
    lineColor: '#304ffe',
    titleStyle: {color: '#304ffe'},
    renderTimeBottom: () => (<View style={{ alignItems: 'flex-end', flex: 1, backgroundColor: 'white', borderRadius: 6, padding: 3 }}> <Text>(06.30)</Text></View>)
  },
  {
    title: 'Eatting',
    description: 'Eat breakfast: bread and drink milk',
    time: new Date("March 6, 2018 7:00:00"),
    renderIcon: () => <IconFont name={'coffee'} size={20} color={'#546e7a'}/>,
    lineColor: '#546e7a',
    titleStyle: {color: '#546e7a'},
  },
  {
    title: 'Working',
    description: 'Go to ABX Company and working react-native',
    time: new Date("March 6, 2018 7:35:00"),
    renderIcon: () => <IconFont name={'briefcase'} size={20} color={'#dd2c00'} />,
    lineColor: '#dd2c00',
    titleStyle: {color: '#dd2c00'},

  },
  {
    title: 'Relax',
    description: 'Listen to music "Hello Vietnam" song',
    time: new Date("March 6, 2018 14:15:00"),
    renderIcon: () => <IconFont name={'headphones'} size={20} color={'#006064'}/>,
    lineColor: '#006064',
    titleStyle: {color: '#006064'},

  },
]
// create a component
class TimeLineIcon extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>TimeLineBasic</Text> */}
        <TimeLine
          data={data}
          isRenderSeperator
          widthLineContainer={65}
          style={{margin: 16}}
        />
        <Text>[2 columns]</Text>
        <TimeLine
          data={data}
          isRenderSeperator
          widthLineContainer={65}
          style={{margin: 16}}
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
  },
});

//make this component available to the app
export default TimeLineIcon;
