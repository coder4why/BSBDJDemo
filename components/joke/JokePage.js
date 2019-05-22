import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {getData} from '../tools/Fetch';
import setStatusBar from '../tools/StatusTool';
import Toast from 'react-native-easy-toast';
import TopSwiper from './TopSwiper';
import JokeContents from './JokeContents';
import { ScrollView } from 'react-native-gesture-handler';
export default class JokePage extends Component {

  componentDidMount(){
    setStatusBar(true);
  }

  _showSwiper(url){
    const data = {
      type:'0',
      info:url
    }

    const navigateAction = NavigationActions.navigate({
      routeName: 'JokeDetail',
      params: {data},
      action: NavigationActions.navigate({ routeName: 'JokeDetail',title:''}),
      });
      this.props.navigation.dispatch(navigateAction);
  }
  
  _showItems(rowData){
    const data = {
      type:'1',
      info:rowData.theme_id
    }
    const navigateAction = NavigationActions.navigate({
      routeName: 'JokeDetail',
      params: {data},
      action: NavigationActions.navigate({ routeName: 'JokeDetail',title:''}),
      });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
          return(
            <ScrollView style={{flex:1}}>
                <TopSwiper showDetail={(url)=>this._showSwiper(url)}/>
                <JokeContents showDetail={(rowData)=>this._showItems(rowData)}/>
                <Toast ref="toast"
                       position='center'
                       positionValue={10}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{color:'white',fontSize:15}}
                />
                
            </ScrollView>
          );
      }
}
