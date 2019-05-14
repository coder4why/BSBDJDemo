
import React, {Component} from 'react';
import {View,StatusBar,Platform} from 'react-native';
import Navigator from './components/tabbar/LZKKTabBar';
import {ShareTool} from './components/tools/ShareTool';
import {DBTool} from './components/tools/DBTool';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
const store = configureStore();

export const iOS = () => Platform.OS === 'ios'
export default class App extends Component {

  componentDidMount(){
   this._setStatusBar();
   DBTool.createTable();
   ShareTool.registerThirds();
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
      <Provider store={store}>
        <View style={{flex:1,backgroundColor:'white'}}>
            <Navigator/>
        </View>
      </Provider>
    );
  }
}