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
import TimeLineBasic from './TimeLineBasic'
import TimeLineIcon from './TimeLineIcon'
import TimeLineRenderDetail from './TimeLineRenderDetail'

type Props = {};


export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        </View>
        <TimeLineBasic />
        {/* <TimeLineIcon /> */}
        {/* <TimeLineRenderDetail /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeStyle: {
    fontSize: 50,
  },
  header: {
    height: 30,
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
