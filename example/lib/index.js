'use strict';

import React, {Component} from 'react'

import {Animated, Easing, Image, FlatList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native'
import moment from 'moment';

let defaultCircleSize = 8
let defaultCircleColor = '#37474f'
let defaultLineWidth = 0.75
let defaultLineColor = '#909090'
let defaultTimeTextColor = 'black'
let defaultDotColor = 'white'
let defaultInnerCircle = 'none'
let defaultTitleFontSize = 16

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);
    const { data } = props;
    this.onEventPress = this.props.onEventPress
    this.state = {
      data,
    }
  }
  keyExtractor = (item, index) => {
    return `${item.time}-${item.title}`
  }
  render() {
    const { style, data, options } = this.props;
    return (
      <View style={[styles.container, style]}>
        <FlatList
          style={[styles.listview]}
          data={data}
          renderItem={this.renderItem}
          automaticallyAdjustContentInsets={false}
          keyExtractor={this.keyExtractor}
          {...options}
        />
      </View>
    );
  }
  renderItem = ({ item, index }) => {
    var content = null
    const { columnFormat, rowContainerStyle } = this.props;
    switch(columnFormat){
      case 'single-column-left':
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer,columnFormat === 'single-column-left' ? {} : {flexDirection: 'row-reverse', justifyContent: 'flex-start' }, rowContainerStyle]}>
            <View>
              {this.renderTime(item, index)}
            </View>
            <View>
              {this.renderCircle(item, index)}
            </View>
            <View style={[{ flex: 1 }]}>
              {this.renderEvent(item, index)}
            </View>
          </View>
        )
        break
      case 'two-column':
        content = (
          <View style={[styles.rowContainer, index % 2 == 0 ? {} : { flexDirection: 'row-reverse'} , rowContainerStyle]}>
            <View style={{flex: 1}} >
              {this.renderTime(item, index)}
            </View>
            <View>
              {this.renderCircle(item, index)}
            </View>
            <View style={{flex: 1 }}>
              {this.renderEvent(item, index)}
            </View>
          </View>
        )
    }
    return content
  }
  renderTime = (item, index) => {
    var textStyle = {}
    switch(this.props.columnFormat){
      case 'single-column-left':
          textStyle = styles.leftText
          break
      case 'single-column-right':
          // textStyle = {
          //     alignItems: 'flex-start'
          // }
          break
      case 'two-column':
          textStyle = index % 2 == 0 ? styles.leftText : textStyle;
          break
    }
    let { timeContainerStyle, timeStyle, timeMeridiumStyle, renderTimeBottom, showAmPm } = this.props;
    renderTimeBottom = item.renderTimeBottom ? item.renderTimeBottom : renderTimeBottom;
    let timeMoment;
    if (typeof(item.time) === 'string') {
      return (
        <View style={[styles.timeContainer, timeContainerStyle]}>
        <View>
          <Text style={[styles.time, timeStyle]}>
            {item.time}
          </Text>
        </View>
          <View style={{ width : 30, height: 30}}>
            {renderTimeBottom()}
          </View>
        </View>
      )
    } else {
      timeMoment = moment(item.time);
      return (
        <View style={[styles.timeContainer,timeContainerStyle]}>
        <View>
          <Text style={[styles.timeText, textStyle, timeStyle ]}>
            {showAmPm ? timeMoment.format('hh.mm') : timeMoment.format('HH.mm')}
          </Text>
          {showAmPm
            ? <Text style={[styles.timeText, styles.timeMeridiem, textStyle, timeMeridiumStyle]}>
                {timeMoment.format('a').toUpperCase()}
              </Text>
            : null
          }
        </View>
        <View style={{ flex: 1}}>
            {renderTimeBottom()}
        </View>
        </View>
      )
    }
  }

  renderEvent = (item, index) => {
    return (
      <View>
        <TouchableOpacity 
          disabled={this.props.onEventPress == null}
          style={[ this.props.detailContainerStyle]}
          onPress={() => this.props.onEventPress?this.props.onEventPress(item):null}
        >
          <View style={{  marginBottom: 2,}}>
            {this.renderDetail(item, index)}
          </View>
          {this.renderSeparator()}
        </TouchableOpacity>
      </View>
    )
  }

  renderDetail = (item, index) => {
    const { titleStyle } = this.props
    let title = <Text style={[styles.title, titleStyle]}>{item.title}</Text>
    if(item.description)
      title = (
          <View>
              <Text style={[styles.title, this.props.titleStyle]}>{item.title}</Text>
              <Text style={[styles.description, this.props.descriptionStyle]}>{item.description}</Text>
          </View>
      )
    return (
      <View style={styles.container}>
          {title}
      </View>
    )
  }

  renderCircle = (item, index) => {
    let { circleSize, circleColor, lineWidth, circleStyle, lineColor, timeStyle, marginTopCircle, data, spacingDot } = this.props;
    circleSize = item.circleSize ? item.circleSize : circleSize
    circleColor = item.circleColor ? item.circleColor : circleColor
    lineWidth = item.lineWidth ? item.lineWidth : lineWidth
    lineColor = item.lineColor ? item.lineColor : lineColor
    var innerCircle = this.renderInnerCircle(item);
    let heightLineTop = marginTopCircle / 2;  
    return (
      <View style={{ alignItems: 'center', flex: 1, width: 30 }}>
        {
          index != 0
          ? <View style={[{width: lineWidth, height: heightLineTop, backgroundColor: data[index-1].lineColor ? data[index-1].lineColor : lineColor }]}/>
          : null
        }
        <View style={[styles.circle, circleStyle, { backgroundColor: circleColor, width: circleSize, height: circleSize, marginTop: spacingDot, marginBottom: spacingDot } , index == 0 ? { marginTop: marginTopCircle } : {} ]}>
          {innerCircle}
        </View>
        <View style={{ width: lineWidth, flex: 1, backgroundColor: lineColor}} />
      </View>
    )
  }

  renderInnerCircle(item){
    let { innerCircleSize, dotColor, innerCircleType } = this.props;
    console.log('props', this.props)
    innerCircleSize = item.innerCircleSize ? item.innerCircleSize : innerCircleSize
    dotColor = item.dotColor ? item.dotColor : dotColor
    let innerCircle = null;
    switch(innerCircleType){
      case 'dot':
        let dotStyle = {
          height: innerCircleSize,
          width: innerCircleSize,
          borderRadius: innerCircleSize / 2,
          backgroundColor: dotColor
        }
        innerCircle = (<View style={[dotStyle]}/>)
        break;
    }
    return innerCircle;
  }
  renderSeparator(){
    const { isRenderSeperator, separatorStyle } = this.props;
    if(isRenderSeperator)
      return (
          <View style={[styles.separator, separatorStyle]}></View>
      )
    else
      return null
  }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
    innerCircleType: defaultInnerCircle,
    columnFormat: 'single-column-left',
    innerCircleSize: defaultCircleSize / 2,
    dotColor: defaultDotColor,
    renderTimeBottom: () => null,
    marginTopCircle: defaultTitleFontSize / 2,
    spacingDot: 4,
    showAmPm: true,
}

let styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  listview: {
      flex: 1,
  },
  rowContainer: {
      flexDirection: 'row',
      flex: 1,
  },
  timeContainer: {
      minWidth: 45,
      flex: 1,
      // backgroundColor: 'green',
  },
  time: {
      textAlign: 'right',
      color: defaultTimeTextColor,
  },
  timeText: {
      color: defaultTimeTextColor,
      fontSize: 16,
  },
  timeMeridiem: {
    fontSize: 12,
    fontWeight: '200',
  },
  leftText: {
    textAlign: 'right'
  },
  circle: {
      width: defaultCircleSize,
      height: defaultCircleSize,
      borderRadius: 100,
      backgroundColor: 'black',
      // marginTop: 2,
      // marginBottom: 2,
      // position: 'absolute',
      // left: -8,
      alignItems: 'center',
      justifyContent: 'center',
  },
  title: {
      fontSize: defaultTitleFontSize,
      fontWeight: 'bold',
  },
  description: {
      borderLeftWidth: defaultLineWidth,
      flexDirection: 'column',
      flex: 1,
      marginTop: 6,
  },
  separator: {
      height: 0.75,
      backgroundColor: '#aaa',
      marginTop: 6,
      marginBottom: 6
  }
});