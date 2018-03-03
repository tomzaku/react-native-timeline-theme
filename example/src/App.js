/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import Timeline from '../lib/index'


type Props = {};

const data = [
  {time: new Date(), title: 'Event 1', description: 'Event 1 Description'},
  {time: new Date(), title: 'Event 2', description: 'Event 2 Description'},
  {time: new Date(), title: 'Event 3', description: 'Event 3 Description'},
  {time: new Date(), title: 'Event 4', description: 'Event 4 Description'},
  {time: new Date(), title: 'Event 5', description: 'Event 5 Description'}
]
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <Timeline
          style={styles.timeline}
          data={data}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: '#B2D1E6',
  },
  timeline: {
    marginTop: 20,
    // backgroundColor: '#43657A',
  },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
