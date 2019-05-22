
import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
const rowData = {
    video:''
}
export default class ReleasePage extends Component {

  constructor(props){
    super(props);
    this.state={
    }
  
  }

  componentWillMount(){
    rowData.video = 'http://wvideo.spriteapp.cn/video/2018/1121/5bf4ae99c88b3_wpd.mp4';
    const navigateAction = NavigationActions.navigate({
        routeName: 'VideoDetail',
        params: {rowData},
        action: NavigationActions.navigate({ routeName: 'VideoDetail',title:''}),
        });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
          return(
            <View style={{flex:1}}>
            </View>
          );
      }
}
