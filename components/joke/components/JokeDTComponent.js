
import React, { Component } from 'react';
import {View} from 'react-native';
import ScrollableTabView , {ScrollableTabBar } from 'react-native-scrollable-tab-view';
import JokeItemComponent from './JokeItemComponent';
import PropTypes from 'prop-types';

export default class JokeDTComponent extends Component{
    //最热： http://d.api.budejie.com/topic/forum/473/1/new/bsbdjhd-iphone-5.0.9/0-20.json
    //最新： http://d.api.budejie.com/topic/forum/473/1/hot/bsbdjhd-iphone-5.0.9/0-20.json
    //精华： http://d.api.budejie.com/topic/forum/473/1/jingxuan/bsbdjhd-iphone-5.0.9/0-20.json

    static propTypes = {
      onTapPlay: PropTypes.func,
      showPic:PropTypes.func,
    }
    static defaultProps = {
        theme_id:'',
    }

    constructor(props){
      super(props);
    
      this.state = {
        theme_id:this.props.theme_id,
        urls:[
          `http://d.api.budejie.com/topic/forum/${this.props.theme_id}/1/new/bsbdjhd-iphone-5.0.9/0-20.json`,
          `http://d.api.budejie.com/topic/forum/${this.props.theme_id}/1/hot/bsbdjhd-iphone-5.0.9/0-20.json`,
          `http://d.api.budejie.com/topic/forum/${this.props.theme_id}/1/jingxuan/bsbdjhd-iphone-5.0.9/0-20.json`
        ]
      }
    }

    _onTapPlay(navigateAction){
      this.props.onTapPlay && this.props.onTapPlay(navigateAction);
    }

    _onShowPic(imageUrl){
      this.props.showPic && this.props.showPic(imageUrl);
    }

    render(){
       return <ScrollableTabView 
            locked={false}
            initialPage={0}
            renderTabBar={() =><ScrollableTabBar style={{height: 45}}
            onChangeTab={(obj) => {
                console.log('index:' + obj.i);
              }
            }
            onScroll={(postion) => {  
                console.log('scroll position:' + postion);
              }
            }
            tabStyle={{backgroundColor:'#fff'}}/>}
            tabBarBackgroundColor={'#fff'}
            tabBarActiveTextColor='red'
            tabBarInactiveTextColor='grey'
            tabBarUnderlineStyle={{backgroundColor: 'red',height: 2,}}
            tabBarTextStyle={{fontSize: 17}}
            >
            <View tabLabel='最新' style={{flex:1}}>
                <JokeItemComponent 
                url={this.state.urls[0]} 
                onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
                onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
                />
            </View>
            <View tabLabel='精华' style={{flex:1}}>
                <JokeItemComponent
                 url={this.state.urls[1]}
                 onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
                 onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
                 />
            </View>
            <View tabLabel='最热' style={{flex:1}}>
                <JokeItemComponent 
                url={this.state.urls[2]} 
                onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
                onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
                />
            </View>

      </ScrollableTabView>
    }

}
