
import React, {Component} from 'react';
import {View,Image,Text,Dimensions,TouchableWithoutFeedback} from 'react-native';
import Navigator from './components/tabbar/LZKKTabBar';
import {ShareTool} from './components/tools/ShareTool';
import {DBTool} from './components/tools/DBTool';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import {getData} from './components/tools/Fetch';

const {width,height} = Dimensions.get('window');
import configureStore from './redux/store';
const store = configureStore();

export default class App extends Component {

  constructor(props){
      super(props);
      this.state={
        second:4,
        imageUrl:''
      }
  }

  componentDidMount(){
   DBTool.createTable();
   ShareTool.registerThirds();
   this._requestSplash();
  }

  _requestSplash(){
      var that = this;
      getData('http://dspsdk.spriteapp.com/get?ad=self.baisibudejieHD.iphone.splash.18110717002',(response)=>{
        if(response.body['config'] == null){
          that.setState({
            second:0,
          });
          SplashScreen.hide();
            return;
        }
        const seq = response.body.config.sequence[0];
        that.setState({
          imageUrl:response.body.data[seq].pic
        });
       timer = setInterval(function(){
          if(that.state.second==0){
              clearInterval(timer);
              SplashScreen.hide();
              return;
          }
          that.setState({
            second:that.state.second-1
          });
        },1000);
      })
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1,backgroundColor:'white'}}>
            { 
              this.state.second>0 && this.state.imageUrl.length>0?
              <View style={{flex:1}}>
                <Image source={{uri:this.state.imageUrl}} style={{width:width,height:height-123,resizeMode:'cover'}}></Image>
                <Image source={require('./components/src/bsbdj.png')} style={{width:width,height:123,resizeMode:'cover'}}></Image>
                <TouchableWithoutFeedback onPress={()=>{
                  this.setState({second:0});
                  SplashScreen.hide();
                }}>
                  <Text style={{position:'absolute',textAlign:'center',fontSize:18,color:'white',backgroundColor:'black',
                                opacity:0.8,marginLeft:Dimensions.get('window').width-85,marginTop:30,width:70,height:36,
                                borderRadius:12,lineHeight:36,overflow:'hidden'
                              }}>
                  {'跳过 '+this.state.second+'s'}
                  </Text>
                </TouchableWithoutFeedback>
              </View>:
              <Navigator/>
            }
        </View>
      </Provider>
    );
  }
}