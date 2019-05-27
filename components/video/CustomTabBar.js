
import React, { Component } from 'react';
import {
  View,
  DeviceEventEmitter
} from 'react-native';
import ScrollableTabView , {ScrollableTabBar } from 'react-native-scrollable-tab-view';
import VideoComponent from './VideoComponent';
import PropTypes from 'prop-types';
import  JokeItemComponent from '../joke/components/JokeItemComponent';
import {TuiJian,Video,Picture,Joke} from '../commons/API';
import configureStore from '../../redux/store';
const store = configureStore();

export default class CustomTabBar extends Component {

   //分享点击事件：
    static propTypes = {
      onTapPlay: PropTypes.func,
      onShowPic:PropTypes.func,
    }
    
    constructor(props){
        super(props);
        this.state={
            mainColor:store.getState().themeColor,
        }
    }

    componentDidMount(){
      var that = this;
      DeviceEventEmitter.addListener('THEME_COLOR',function(color){
            that.setState({
              mainColor:color
            });
      });
    }
    
    _onTapPlay(navigateAction){
      this.props.onTapPlay && this.props.onTapPlay(navigateAction);
    }

    _onShowPic(imageUrl){
      this.props.onShowPic && this.props.onShowPic(imageUrl);
    }

    _subItems(){
      const style={flex:1,textAlign:'center',fontSize:30,fontWeight:'bold'};
      const titles = ['推荐','视频','图片','笑话','娱乐']; 
      const urls = [TuiJian,Video,Picture,Joke,''];
      var items = [];
      for(var i=0;i<titles.length;i++){
        if(i<titles.length-1){
          items.push(
            <View key={i} tabLabel={titles[i]} style={{flex:1}}>
                <JokeItemComponent url={urls[i]} 
                  onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
                  onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
                  themeColor={this.state.mainColor}
                />
            </View>
          );
        }else{
          items.push(
            <View key={i} tabLabel='娱乐' style={style}>
                <VideoComponent themeColor={this.state.mainColor} onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}/>
            </View>
          );
        } 
      }
      return items;
    }


    render() {
    return (
      <ScrollableTabView 
            locked={false}
            initialPage={0}
            renderTabBar={() =><ScrollableTabBar underlineStyle={{backgroundColor:'#fff'}} style={{height: 45}}
            onChangeTab={(obj) => {
                console.log('index:' + obj.i);
              }
            }
            onScroll={(postion) => {  
                // float类型 [0, tab数量-1]  
                console.log('scroll position:' + postion);
              }
            }
            tabStyle={{backgroundColor:'white'}}/>}
            tabBarBackgroundColor='white'
            tabBarActiveTextColor={this.state.mainColor}
            tabBarInactiveTextColor='grey'
            tabBarUnderlineStyle={{backgroundColor: this.state.mainColor,height: 1}}
            tabBarTextStyle={{fontSize: 17}}
            >

           {this._subItems()}
            
      </ScrollableTabView>
    )
  }
}
