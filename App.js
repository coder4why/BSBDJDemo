
import React, {Component} from 'react';
import {View,StatusBar,Platform} from 'react-native';
import Navigator from './components/tabbar/LZKKTabBar';

export const iOS = () => Platform.OS === 'ios'
export default class App extends Component {

  componentDidMount(){
   this._setStatusBar();
  }

  _setStatusBar(){
    StatusBar.setBarStyle("light-content")
    if (!iOS) {
      StatusBar.setTranslucent(false)
      StatusBar.setBackgroundColor('#fff');
    }
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
          <Navigator/>
      </View>
    );
  }
}