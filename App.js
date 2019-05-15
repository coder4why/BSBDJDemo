
import React, {Component} from 'react';
import {View} from 'react-native';
import Navigator from './components/tabbar/LZKKTabBar';
import {ShareTool} from './components/tools/ShareTool';
import {DBTool} from './components/tools/DBTool';
import { Provider } from 'react-redux';

import configureStore from './redux/store';
const store = configureStore();

export default class App extends Component {

  componentDidMount(){
   DBTool.createTable();
   ShareTool.registerThirds();
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