import React, { Component } from 'react';
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Image,
  DeviceEventEmitter
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import MarqueeLabel from 'react-native-lahk-marquee-label';
export default class VideoDetail extends Component {

  constructor(props){
    super(props);
    this.state = {
      showDM:false,
    }
  }

  componentDidMount(){
      this._getDM();
      DeviceEventEmitter.emit('PLAYVIDEO',false);
  }
  componentWillUnmount(){
    // DeviceEventEmitter.emit('PLAYVIDEO',true);
  }

  async _getDM() {
    const value = await AsyncStorage.getItem('isCloseDM');
    this.setState({ showDM:(value=='true')});
  }

  _runHorseLabel(){

    var dmTexts = [
      // '安兹是王足以，号令天下于此。',
      // '小天使你要是消失了，我就陪你消失。',
      // '一吻定情的粉红，我的天，粉了我一个夏天',
      '高能预警 ',
      'UP 地址呢？我搜不到呀',
      '放开那个人，让我来 ',
    ];
    var colors = ['white','#FF83FA','#00FF7F','#00F5FF','#00C5CD','#00CD00',
                  '#FFE4C4','#FFFFF0','#FF7256','#FF34B3','#FF4500'
                 ];
    var horses = [];
    for(var i=0;i<dmTexts.length;i++){
      const color = colors[i];
      horses.push(
          <MarqueeLabel key={i}
              duration={8000}
              text={dmTexts[i]}
              textHeight={20}
              textWidth={30}
              textStyle={{fontSize: 18, color:color,fontWeight:'bold'}}
          />
      );
    }
    
    return  <View style={{position:'absolute',width:Dimensions.get('window').width,height:320}}>
                {horses}
            </View>
  }
  render() {
          return(
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Video source={{uri: this.props.navigation.state.params.rowData.video}}  
                      ref={(ref) => {
                        this.player = ref
                      }}        
                      style={{flex:1}}                              
                    />
                </View>
                {this.state.showDM?this._runHorseLabel():null}
                <TouchableWithoutFeedback 
                    onPress={()=>{ this.props.navigation.goBack();}}
                >
                    <Image style={{position:'absolute',width:50,height:40,marginTop:Dimensions.get('window').height-40-40,marginLeft:Dimensions.get('window').width-65}}
                      source={require('../src/back_blue.png')}
                    />
                </TouchableWithoutFeedback>
              </View>
          );
      }
}
