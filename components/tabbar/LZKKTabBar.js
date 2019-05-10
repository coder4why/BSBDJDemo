


import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import {
  Image,
  DeviceEventEmitter
} from 'react-native';
import VideoPage from '../video/VideoPage';
import JokePage from '../joke/JokePage';
import MusicPage from '../music/MusicPage';
import SettingPage from '../setting/SettingPage';
import routeIndex from './RouteIndex';

const video_normal = require('../src/home.png');
const video_selected = require('../src/home_selected.png');
const joke_normal = require('../src/joke.png');
const joke_selected = require('../src/joke_selected.png');
const music_normal = require('../src/music.png');
const music_selected = require('../src/music_selected.png');
const setting_normal = require('../src/setting.png');
const setting_selected = require('../src/setting_selected.png');

export const THEMEConfig = {
  THEMECOLOR:'#333333',
  themeListen(){
    DeviceEventEmitter.addListener('THEMECOLOR',function(color){
      THEMEConfig.THEMECOLOR = color;
  });
  }
}

const TabRouteConfigs = {
    VideoPage:{
      screen:VideoPage,
      navigationOptions:{
          tabBarLabel:'视频',
          tabBarIcon:({focused,tintColor}) => (
            <Image
              source={focused ? video_normal:video_selected}
              style={{width:23,height:23,tintColor:tintColor}}
            />)
          },
        },
    JokePage:{
      screen:JokePage,
      navigationOptions: ({ navigation }) => ({
          tabBarLabel:'段子',
          tabBarIcon:({focused,tintColor}) => (
            <Image
              source={focused ? joke_normal:joke_selected}
              style={{width:23,height:23,tintColor:tintColor}}
            />)
          }),
        },
    MusicPage:{

        screen:MusicPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel:'听歌',
            tabBarIcon:({focused,tintColor}) => (
                <Image
                source={focused ? music_normal:music_selected}
                style={{width:23,height:23,tintColor:tintColor}}
                />)
            }),
        },
    SettingPage:{

      screen:SettingPage,
      navigationOptions: ({ navigation }) => ({
          tabBarLabel:'设置',
          tabBarIcon:({focused,tintColor}) => (
              <Image
              source={focused ? setting_normal:setting_selected}
              style={{width:23,height:23,tintColor:tintColor}}
              />)
          }),
      },
        
  };
  
  const TabNavigatorConfigs = {
      // initialRouteName:'VideoPage',
      //是否在更改标签时显示动画
      animationEnabled: false,
      tabBarPosition: 'bottom',
      //是否允许在标签之间进行滑动
      swipeEnabled: false,
      backBehavior: "none",
      tabBarOptions:{
        activeTintColor:'#333333',
        inactiveTintColor:'grey',
        showIcon:true,
      },
  };
  const titles = ['看视频','刷段子','听音乐','设置'];
  const APP = createBottomTabNavigator(TabRouteConfigs,TabNavigatorConfigs);
  // DeviceEventEmitter.addListener('THEMECOLOR',function(color){
  //     themeColor = color;
  // });
  THEMEConfig.themeListen();
  const Navigator = createStackNavigator(
      {
            aPP: {
              screen:APP,
              navigationOptions: ({navigation}) => ({
                    headerTitle:titles[navigation.state.index],
                    headerTintColor:'white',
                    headerStyle: {
                        backgroundColor: THEMEConfig.THEMECOLOR,
                    },
                    headerRight:null,
                }),
            },
            ...routeIndex,
      },
  
  );
  
  export default createAppContainer(Navigator);
  