//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
    renderTimeBottom: () => (<View style={{ alignItems: 'flex-end', flex: 1, backgroundColor: 'white', borderRadius: 6, padding: 3 }}> <Text style={{fontSize: 8, fontWeight: 'bold'}}>Important</Text>
    <Text style={{fontSize: 8, fontWeight: 'bold', color: '#b40000'}}>Lazy time</Text><Text style={{fontSize: 8, fontWeight: 'bold', textAlign: 'right'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</Text></View>),
    renderDetail: ({title, description, titleStyle}, index) => <View><Text style={{ fontSize: 20, fontWeight: 'bold'}}>{title}</Text><Image style={{width: 200, height: 150}} source={require('./assets/wake.gif')} /><Text>{description}</Text> </View>
  },
  {
    title: 'Eatting',
    description: 'Eat breakfast: bread and drink milk',
    time: new Date("March 6, 2018 7:00:00"),
    renderIcon: () => <IconFont name={'coffee'} size={20} color={'#546e7a'}/>,
    lineColor: '#546e7a',
    titleStyle: {color: '#546e7a'},
    renderDetail: ({title, description, titleStyle}, index) => <View><Text style={[titleStyle, { fontWeight: 'bold'}]}>{title}</Text><Image style={{width: 200, height: 150}} source={require('./assets/eat.gif')} /><Text>{description}</Text> </View>
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
class TimeLineRenderDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TimeLine
          data={data}
          // isRenderSeperator
          widthLineContainer={65}
          style={{margin: 16}}
          detailContainerStyle={{ borderRadius: 5, borderWidth: 1, borderColor: '#aeaeae', padding: 6, marginBottom: 6, }}
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
export default TimeLineRenderDetail;
