
  import React from 'react';
  import {Image} from 'react-native';
  //工作台路由
  export default routeIndex = {
        VideoDetail:{
          screen:require('../video/VideoDetail.js').default,
          navigationOptions:({ navigation }) => ({
              header:null,
          })
      },
      Favorite:{
        screen:require('../setting/FavoritePage.js').default,
        navigationOptions:({ navigation }) => ({
            headerTitle:'',
            headerTintColor:'white',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerBackImage:<Image style={{marginLeft:5,width:20,height:20}} source={require('../src/back.png')}></Image>
        })
    },
    JokeDetail:{
        screen:require('../joke/JokeDetail.js').default,
        navigationOptions:({ navigation }) => ({
            headerTitle:'社区详情',
            headerTintColor:'#333333',
            headerStyle: {
                backgroundColor: 'white',
                fontSize:18
            },
            headerBackImage:<Image style={{marginLeft:5,padding:10,width:20,height:20,}} source={require('../src/back.png')}></Image>
        })
    },
    Release:{
        screen:require('../plus/ReleasePage.js').default,
        navigationOptions:({ navigation }) => ({
            header:null,
        })
    },
    RobotPage:{
        screen:require('../setting/RobotPage.js').default,
        navigationOptions:({ navigation }) => ({
            headerTitle:'图灵聊天室',
            // headerTintColor:'#333333',
            headerStyle: {
                backgroundColor: 'white',
                fontSize:30
            },
            headerBackImage:<Image style={{marginLeft:5,padding:10,width:20,height:20,}} source={require('../src/back.png')}></Image>
        })
    },


  }
  