
import React, { Component } from 'react';
import {
  View,
  DeviceEventEmitter
} from 'react-native';
import ScrollableTabView , {ScrollableTabBar } from 'react-native-scrollable-tab-view';
import VideoComponent from './VideoComponent';
import PropTypes from 'prop-types';
import JokeItemComponent from '../joke/components/JokeItemComponent';
import {TuiJian,Video,Picture,Joke} from '../commons/API';
export default class CustomTabBar extends Component {

   //分享点击事件：
   static propTypes = {
    onTapPlay: PropTypes.func,
    onShowPic:PropTypes.func,
   }

    constructor(props){
        super(props);
        this.state={
            mainColor:'white',
            textColor:'grey'
        }
    }

    componentDidMount(){
        var that = this;
        DeviceEventEmitter.addListener('THEMECOLOR',function(color){
            that.setState({
                mainColor:color,
                textColor:'white'
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
            <View tabLabel={titles[i]} style={{flex:1}}>
                <JokeItemComponent url={urls[i]} 
                  onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
                  onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
                />
            </View>
          );
        }else{
          items.push(
            <View tabLabel='娱乐' style={style}>
                <VideoComponent onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}/>
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
            renderTabBar={() =><ScrollableTabBar style={{height: 45}}
            onChangeTab={(obj) => {
                console.log('index:' + obj.i);
              }
            }
            onScroll={(postion) => {  
                // float类型 [0, tab数量-1]  
                console.log('scroll position:' + postion);
              }
            }
            tabStyle={{backgroundColor:this.state.mainColor}}/>}
            tabBarBackgroundColor={this.state.mainColor}
            tabBarActiveTextColor='red'
            tabBarInactiveTextColor={this.state.textColor}
            tabBarUnderlineStyle={{backgroundColor: 'red',height: 2,}}
            tabBarTextStyle={{fontSize: 17}}
            >

           {this._subItems()}
            
      </ScrollableTabView>
    )
  }
}
