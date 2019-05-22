
import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import {
  Image,
  Text,
  View,
  TextInput,
  Dimensions
} from 'react-native';
import VideoPage from '../video/VideoPage';
import JokePage from '../joke/JokePage';
import ReleasePage from '../plus/ReleasePage';
import MusicPage from '../music/MusicPage';
import SettingPage from '../setting/SettingPage';
import routeIndex from './RouteIndex';
import {THEMEConfig} from './Theme';

const video_normal = require('../src/home.png');
const video_selected = require('../src/home_selected.png');
const joke_normal = require('../src/shequ.png');
const joke_selected = require('../src/shequ_selected.png');
const music_normal = require('../src/music.png');
const music_selected = require('../src/music_selected.png');
const setting_normal = require('../src/mine.png');
const setting_selected = require('../src/mine_selected.png');
const plus = require('../src/plus_small.png');

const TabRouteConfigs = {
    VideoPage:{
      screen:VideoPage,
      navigationOptions:{
          tabBarLabel:'首页',
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
          tabBarLabel:'社区',
          tabBarIcon:({focused,tintColor}) => (
            <Image
              source={focused ? joke_normal:joke_selected}
              style={{width:23,height:23,tintColor:tintColor}}
            />)
          }),
        },

      ReleasePage:{
      screen:ReleasePage,
      navigationOptions: ({ navigation }) => ({
          tabBarLabel:' ',
          tabBarIcon:({focused,tintColor}) => (
            <View style={{width:44,height:44,backgroundColor:'#FF3030',justifyContent:'center',
                  marginTop:Dimensions.get('window').height>812?20:15,
                  borderRadius:22,
                  borderWidth:1,
                  borderColor: '#EBEBEB',
          }}>
                  <Text style={{width:44,height:44,fontWeight:'bold',fontSize:32,textAlign:'center',color:'white',marginTop:0}}>+</Text>
            </View>
            )
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
      mode: 'card',
      headerMode: 'screen',
      //是否允许在标签之间进行滑动
      swipeEnabled: false,
      backBehavior: "none",
      tabBarOptions:{
        activeTintColor:'#333333',
        inactiveTintColor:'grey',
        showIcon:true,
      },
  };
  const titles = ['','','','听音乐','我的'];
  const APP = createBottomTabNavigator(TabRouteConfigs,TabNavigatorConfigs);
  THEMEConfig.themeListen();

  function _searchSQ(searchText){

      alert(searchText);

  }

  const Navigator = createStackNavigator(
      {
            aPP: {
              screen:APP,
              navigationOptions: ({navigation}) => ({
                    headerTitle:navigation.state.index<3?titles[navigation.state.index]:null,
                    headerTintColor:navigation.state.index<3?'white':null,
                    headerStyle: {
                        backgroundColor: navigation.state.index<3?'white':'transparent',
                    },

                    headerBackTitle:null,
                    headerTruncatedBackTitle:null,
                    header: 
                    navigation.state.index<2?
                        <View style={{
                          width:Dimensions.get('window').width,
                          height:Dimensions.get('window').height>=812?(navigation.state.index==0?44:88):(navigation.state.index==0?20:64),
                          backgroundColor:'white',
                          paddingLeft:15,
                        }}
                        >
                        {navigation.state.index==1?
                        <TextInput
                            style={{
                                height:35,
                                paddingLeft:15,
                                marginTop:Dimensions.get('window').height>=812?45:22,
                                marginRight:15,
                                borderRadius: 20,
                                fontSize:16,
                                backgroundColor:'#F0F0F0'
                              }}
                              clearButtonMode='while-editing'
                              underlineColorAndroid='transparent'
                              numberOfLines={1}
                              returnKeyType="search"
                              placeholder="🔍 大家都在搜索：老四"
                              onSubmitEditing = {(event)=>_searchSQ(event.nativeEvent.text)}
                        />:
                        <Text style={{color:'white',fontSize:27,textAlign:'left',fontWeight:'bold',
                                      width:100,lineHeight:40,marginTop:Dimensions.get('window').height>=812?45:21
                                    }}>
                           {titles[navigation.state.index]}
                        </Text>
                                  }
                        </View>
                        :navigation.state.index==3?
                        <View style={{
                          width:Dimensions.get('window').width,
                          height:Dimensions.get('window').height>=812?88:64,
                          backgroundColor:'white',
                          flexDirection:'row',
                          justifyContent:"space-between",
                          paddingLeft:15,

                        }}
                        >
                          <Text style={{color:'#515151',fontSize:27,textAlign:'left',fontWeight:'bold',
                                          width:120,lineHeight:40,
                                          marginTop:Dimensions.get('window').height>=812?45:30
                                        }}>
                                  我的音乐
                            </Text>
                          <Image style={{resizeMode:'contain',width:50,height:25,
                                        marginTop:Dimensions.get('window').height>=812?60:43,
                                        paddingTop:0,
                                      }} 
                                  source={require('../src/more.png')}>
                          </Image>
                        </View>:null
                }),
            },
            ...routeIndex,
      },{
          mode: 'modal',
          // headerMode: 'none',
      }
  
  );
  
  export default createAppContainer(Navigator);
  