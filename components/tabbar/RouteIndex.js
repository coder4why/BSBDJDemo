import {
    Text,
    View,
    TouchableOpacity,
    NativeModules,
  } from 'react-native';
  import React, { Component } from 'react';
  //工作台路由
  export default routeIndex = {
        VideoDetail:{
          screen:require('../video/VideoDetail.js').default,
          navigationOptions:({ navigation }) => ({
              title:'视频详情',
              headerTintColor:'white',
              headerStyle: {
                  backgroundColor: '#333333',
              },
          })
      },

  }
  