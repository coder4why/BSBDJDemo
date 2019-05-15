
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
        })
    },

  }
  