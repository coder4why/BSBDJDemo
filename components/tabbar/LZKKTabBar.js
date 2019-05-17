


import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import {
  Image,
  DeviceEventEmitter,
  Text,
  View,
  Dimensions
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
          tabBarLabel:'我的',
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
  const titles = ['看视频','刷段子','听音乐','我的'];
  const APP = createBottomTabNavigator(TabRouteConfigs,TabNavigatorConfigs);
  THEMEConfig.themeListen();

  const Navigator = createStackNavigator(
      {
            aPP: {
              screen:APP,
              navigationOptions: ({navigation}) => ({
                    headerTitle:navigation.state.index<3?titles[navigation.state.index]:null,
                    headerTintColor:navigation.state.index<3?'white':null,
                    headerStyle: {
                        backgroundColor: navigation.state.index<3?THEMEConfig.THEMECOLOR:'transparent',
                    },
                    header:navigation.state.index<2?
                        <View style={{
                          width:Dimensions.get('window').width,
                          height:Dimensions.get('window').height>=812?88:64,
                          backgroundColor:THEMEConfig.THEMECOLOR,
                          paddingLeft:15,
                        }}
                        >
                        <Text style={{color:'white',fontSize:30,textAlign:'left',fontWeight:'bold',
                                      width:100,lineHeight:40,marginTop:Dimensions.get('window').height>=812?40:16
                                    }}>
                           {titles[navigation.state.index]}
                          </Text>
                        </View>:navigation.state.index==2?
                        <View style={{
                          width:Dimensions.get('window').width,
                          height:Dimensions.get('window').height>=812?88:64,
                          backgroundColor:THEMEConfig.THEMECOLOR,
                          flexDirection:'row',
                          justifyContent:"space-between",
                          paddingLeft:15,
                        }}
                        >
                          <Text style={{color:'white',fontSize:30,textAlign:'left',fontWeight:'bold',
                                          width:120,lineHeight:40,marginTop:Dimensions.get('window').height>=812?40:16
                                        }}>
                                  我的音乐
                            </Text>
                          <Image style={{resizeMode:'contain',width:50,height:20,
                                        marginTop:Dimensions.get('window').height>=812?58:34,
                                        paddingTop:10,
                                      }} 
                                  source={require('../src/dot-more.png')}>
                          </Image>
                        </View>:null
                }),
            },
            ...routeIndex,
      },
  
  );
  
  export default createAppContainer(Navigator);
  