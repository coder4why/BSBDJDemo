
  import React, { Component } from 'react';
  import {Image} from 'react-native';
  import {THEMEConfig} from './LZKKTabBar';
  //工作台路由
  export default routeIndex = {
        VideoDetail:{
          screen:require('../video/VideoDetail.js').default,
          navigationOptions:({ navigation }) => ({
              headerTitle:'视频详情',
              headerTintColor:'white',
              headerStyle: {
                  backgroundColor: THEMEConfig.THEMECOLOR,
              },
              headerBackImage:<Image style={{marginLeft:5,width:28,height:28,resizeMode:'contain'}} source={require('../src/back.png')}></Image>
          })
      },
      Favorite:{
        screen:require('../setting/FavoritePage.js').default,
        navigationOptions:({ navigation }) => ({
            headerTitle:'',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: THEMEConfig.THEMECOLOR,
            },
            headerBackImage:<Image style={{marginLeft:5,width:28,height:28,resizeMode:'contain'}} source={require('../src/back.png')}></Image>
        })
    },
    JokeDetail:{
        screen:require('../joke/JokeDetail.js').default,
        navigationOptions:({ navigation }) => ({
            headerTitle:'',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: THEMEConfig.THEMECOLOR,
            },
            headerBackImage:<Image style={{marginLeft:5,width:28,height:28,resizeMode:'contain'}} source={require('../src/back.png')}></Image>
        })
    },

  }
  