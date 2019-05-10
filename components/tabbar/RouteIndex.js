
  import {THEMEConfig} from './LZKKTabBar';
  //工作台路由
  export default routeIndex = {
        VideoDetail:{
          screen:require('../video/VideoDetail.js').default,
          navigationOptions:({ navigation }) => ({
              title:'视频详情',
              headerTintColor:'white',
              headerStyle: {
                  backgroundColor: THEMEConfig.THEMECOLOR,
              },
          })
      },

  }
  