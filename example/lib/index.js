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
let defaultTimeWidth = 55
import Dash from 'react-native-dash';

export default class Timeline extends Component {
  constructor(props, context) {
    super(props, context);
    const { data } = props;
    this.state = {
      data,
    }
  }
  keyExtractor = (item, index) => {
    return `${item.time}-${item.title}`
  }
  render() {
    const { styleContainer, data } = this.props;
    return (
      <View style={[styles.container, styleContainer]}>
        <FlatList
          style={[styles.listview]}
          data={data}
          renderItem={this.renderItem}
          automaticallyAdjustContentInsets={false}
          keyExtractor={this.keyExtractor}
          {...this.props}
        />
      </View>
    );
  }
  renderItem = ({ item, index }) => {
    let content = null
    let { columnFormat, rowContainerStyle, lineColor, lineWidth } = this.props;
    switch(columnFormat){
      case 'single-column-left':
      case 'single-column-right':
        content = (
          <View style={[styles.rowContainer,columnFormat === 'single-column-left' ? {} : {flexDirection: 'row-reverse', justifyContent: 'flex-start' }, rowContainerStyle]}>
            <View>
              {this.renderTime(item, index)}
            </View>
            <View>
              {this.renderCircleAndLineVertical(item, index)}
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
              {this.renderCircleAndLineVertical(item, index)}
            </View>
            <View style={{flex: 1 }}>
              {this.renderEvent(item, index)}
            </View>
          </View>
        )
    }
    lineWidth = item.lineWidth ? item.lineWidth : lineWidth
    lineColor = item.lineColor ? item.lineColor : lineColor
    let renderSeperateTotal = null
    if (item.renderSeperateTotal) {
      renderSeperateTotal = <Dash style={{flex: 1, marginBottom: 6}} dashColor={lineColor} dashThickness={lineWidth} />
    }
    return (
      <View>
        {content}
        {renderSeperateTotal}
      </View>
    );
  }
  renderTime = (item, index) => {
    let textStyle = {};
    let timeContainerWrapper = {};
    let { timeContainerStyle, timeStyle, timeMeridiumStyle, renderTimeBottom, showAmPm, timeFormat, columnFormat } = this.props;
    switch(columnFormat){
      case 'single-column-left':
          textStyle = styles.leftText
          timeContainerWrapper = { maxWidth: defaultTimeWidth }
          break
      case 'single-column-right':
          timeContainerWrapper = { maxWidth: defaultTimeWidth }
          break
      case 'two-column':
          textStyle = index % 2 == 0 ? styles.leftText : textStyle;
          break
    }
    renderTimeBottom = item.renderTimeBottom ? item.renderTimeBottom : renderTimeBottom;
    let hourFormat= null, amPmFormat=null;
    if (typeof(item.time) === 'string') {
      hourFormat = item.time
    } else {
      let timeMoment = moment(item.time);
      hourFormat = timeMoment.format(timeFormat)
      amPmFormat = showAmPm ? timeMoment.format('a').toUpperCase() : amPmFormat
    }
    return (
      <View style={[styles.timeContainer, timeContainerWrapper, timeContainerStyle]}>
        <View>
          <Text style={[styles.timeText, textStyle, timeStyle ]}>
            {hourFormat}
          </Text>
          {amPmFormat
            ? <Text style={[styles.timeText, styles.timeMeridiem, textStyle, timeMeridiumStyle]}>
                {amPmFormat}
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

  renderEvent = (item, index) => {
    let { onEventPress, detailContainerStyle } = this.props;
    detailContainerStyle = item.detailContainerStyle ? item.detailContainerStyle : detailContainerStyle
    return (
      <View>
        <TouchableOpacity 
          disabled={onEventPress == null}
          style={[ detailContainerStyle]}
          onPress={() => onEventPress ? onEventPress(item):null}
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
    let { titleStyle, renderDetail, descriptionStyle } = this.props
    titleStyle = item.titleStyle ? item.titleStyle : titleStyle
    descriptionStyle = item.descriptionStyle ? item.descriptionStyle : descriptionStyle
    renderDetail = item.renderDetail ? item.renderDetail : renderDetail
    if (renderDetail) return renderDetail({ ...item, titleStyle: [styles.title, titleStyle], descriptionStyle, renderDetail }, index)
    return (
      <View style={styles.container}>
          <Text style={[styles.title, titleStyle]}>{item.title}</Text>
          { item.description
           ? <Text style={[styles.description, descriptionStyle]}>{item.description}</Text>
           : null
          }
      </View>
    )
  }

  renderCircleAndLineVertical = (item, index) => {
    let { lineWidth, lineColor, marginTopCircle, data, widthLineContainer, renderLine, dashLine } = this.props;
    lineWidth = item.lineWidth ? item.lineWidth : lineWidth
    lineColor = item.lineColor ? item.lineColor : lineColor
    dashLine = item.dashLine ? item.dashLine : dashLine
    renderLine = item.renderLine ? item.renderLine : renderLine
    let innerCircle = this.renderInnerCircle(item);
    let heightLineTop = marginTopCircle / 2;
    let renderTopLine = renderLine || index < 1  ? renderLine : <View style={[{width: lineWidth, height: heightLineTop, backgroundColor: data[index-1].lineColor ? data[index-1].lineColor : lineColor }]}/>;
    let renderBottomLine = renderLine ? renderLine : <View style={{ width: lineWidth, flex: 1, backgroundColor: lineColor}} />;
    if ( dashLine ) {
      renderBottomLine = <Dash style={{flex: 1 , flexDirection: 'column'}} dashColor={lineColor} dashThickness={lineWidth} />
    }
    return (
      <View style={{ alignItems: 'center', flex: 1, width: widthLineContainer }}>
        {
          index != 0
          ? renderTopLine
          : null
        }
        {this.renderCircle(item, index)}
        {renderBottomLine}
      </View>
    )
  }
  renderCircle (item, index) {
    let { renderIcon, circleStyle, circleColor, circleSize, spacingDot, marginTopCircle } = this.props;
    circleStyle = item.circleStyle ? item.circleStyle : circleStyle;
    circleSize = item.circleSize ? item.circleSize : circleSize
    circleColor = item.circleColor ? item.circleColor : circleColor
    renderIcon = item.renderIcon ? item.renderIcon : renderIcon;
    if (renderIcon) {
      return renderIcon()
    } else {
      let innerCircle = this.renderInnerCircle(item);
      return (
        <View style={[styles.circle, circleStyle, { backgroundColor: circleColor, width: circleSize, height: circleSize, marginTop: spacingDot, marginBottom: spacingDot } , index == 0 ? { marginTop: marginTopCircle } : {} ]}>
          {innerCircle}
        </View>
      )
    }
  }
  renderInnerCircle(item){
    let { dotSize, dotColor, innerCircleType } = this.props;
    console.log('props', this.props)
    innerCircleType = item.innerCircleType ? item.innerCircleType : innerCircleType
    dotSize = item.dotSize ? item.dotSize : dotSize
    dotColor = item.dotColor ? item.dotColor : dotColor
    let innerCircle = null;
    switch(innerCircleType){
      case 'dot':
        let dotStyle = {
          height: dotSize,
          width: dotSize,
          borderRadius: dotSize / 2,
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
    dotSize: defaultCircleSize / 2,
    dotColor: defaultDotColor,
    renderTimeBottom: () => null,
    marginTopCircle: defaultTitleFontSize / 2,
    spacingDot: 4,
    showAmPm: true,
    timeFormat: 'hh.mm',
    renderIcon: null,
    renderDetail: null,
    isRenderSeperator: false,
    widthLineContainer: 30,
    renderLine: null,
    dashLine: false,
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
    minWidth: defaultTimeWidth,
    // maxWidth: 55,
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