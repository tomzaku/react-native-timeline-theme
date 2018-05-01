<h2 align="center">
  React Native TimeLine Theme
</h2>
<h5 align="center">
Collection of TimeLine theme. 
This package only use flexbox(without absolute) & FlatList
</h5>
<p align="center">
<img src="https://github.com/tomzaku/react-native-timeline-theme/blob/master/phone-detail.gif?raw=true">
</p>

## Get Started

### Installation

`npm i react-native-dash && npm i react-native-timeline-theme --save`

or

`yarn add react-native-dash && yarn add react-native-timeline-theme`


That's all!

### Usage

#### Simple
![](https://github.com/tomzaku/react-native-timeline-theme/blob/master/phone-basic.png?raw=true)
``` js
const data = [
  {
    title: 'Wake up',
    description: 'Remember tooth brushing and read notes on the tablet',
    time: new Date("March 6, 2018 6:15:00"),
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
  },
]
...
 <TimeLine
  data={data}
  isRenderSeperator
  columnFormat={'two-column'}
/>

```

#### Add icon into timeline
![](https://github.com/tomzaku/react-native-timeline-theme/blob/master/phone-icon.png?raw=true)
``` js
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
...
 <TimeLine
  data={data}
  isRenderSeperator
  widthLineContainer={65}
  style={{margin: 16}}
/>

```
#### Render Different Detail
![](https://github.com/tomzaku/react-native-timeline-theme/blob/master/phone-detail.gif?raw=true)
``` js
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
    renderDetail: ({title, description, titleStyle}, index) => <View><Text style={{ fontSize: 20, fontWeight: 'bold'}}>{title}</Text><Image style={{width: 200, height: 150}} source={require('./assets/wake.gif')} /><Text>{description}</Text></View>
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

```

More Detail see [this](https://github.com/tomzaku/react-native-timeline-theme/tree/master/example/src)

### Props

This package is used FlatList, therefore you can override all the props at [this](https://facebook.github.io/react-native/docs/flatlist.html)

| Prop | Description | Type | Default |
|---|---|---| ---|
|**`data`**| Data of timeline | array |[]|
|**`styleContainer`**|Styles applied to the container| StyleSheet object |`{flex: 1}`|
|**`columnFormat`**|Format of column timeline: 'single-column-left', 'single-column-right', 'two-column' | string |`'single-column-left'`|
|**`renderIcon`**|Render icon of timeLine| function |`null`|
|**`renderDetail`**|Render Detail(Event) of timeline | function |`null`|
|**`isRenderSeperator`**|Render Seperate line| boolean |`false`|
|**`widthLineContainer`**|Width of Line Container| number |`30`|
|**`showAmPm`**|Show AM or PM| boolean |`true`|
|**`timeFormat`**|Time format, please read [this](https://momentjs.com/)| string |`'hh.mm'`|
|**`innerCircleType`**|Type of inner circle: 'dot'| string |`none`|
|**`spacingDot`**|Spacing around dot| number |`4`|
|**`dotColor`**|The color of dot| string |`'white'`|
|**`dotSize`**|Size of dot| number | 4 |
|**`marginTopCircle`**| You can marginTop alignTop to adjust the line number | number |`8`|
|**`circleColor`**|Color of circle| string |`#37474f`|
|**`circleSize`**|Size of circle| number |`8`|
|**`renderTimeBottom`**| Render Component Below Time| function |`null`|
|**`renderTimeBottom`**| Render Component Below Time| function |`null`|
|**`lineWidth`**|With of line| number |`0.75`|
|**`lineColor`**|Color of line| string |`#909090`|
|**`dashLine`**|style of line: dash| bool |`false`|
|**`renderSeperateTotal`**|vertical line in the bottom of event| bool |`false`|



### Todos
- [x] Add icon for line event
- [x] Add dash line 
- [ ] Add dark, light theme
- [ ] Add theme seperator

### Contribute

Any help this module will be approciate!


### License

[MIT](https://github.com/tomzaku/react-native-timeline-theme/blob/master/LICENSE)
