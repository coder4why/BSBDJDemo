import React, { Component } from 'react';
import {
  View,
  Modal,
  DeviceEventEmitter
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import setStatusBar from '../tools/StatusTool';
import SplashScreen from 'react-native-splash-screen'
import CustomTabBar from './CustomTabBar';

export default class VideoPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      imageUrl:'',
      showPic:false,
      themeColor:'#1E90FF'
    }
  }

  componentDidMount(){
    var that = this;
    DeviceEventEmitter.addListener('THEMECOLOR',function(color){
      that.setState({
            themeColor:color
        });
    });
    
    SplashScreen.hide();
    setStatusBar(true);
  }
  
  _play = (navigateAction)=>{
    this.props.navigation.dispatch(navigateAction);
  }

  _onShowPic(imageUrl){
    this.setState({
      imageUrl:imageUrl,
      showPic:!this.state.showPic
    });
  }

  _showModel(){
    return <Modal visible={this.state.showPic && this.state.imageUrl.length>0} transparent={true} 
              onRequestClose={()=> {this.setState({showPic: false,})
           }}>
              <ImageViewer 
                  onCancel={()=> {this.setState({showPic: false,});}}
                  saveToLocalByLongPress={true}
                  onClick={()=>{this.setState({showPic:!this.state.showPic});}}
                  imageUrls={[{url:this.state.imageUrl,props:{}}]}/>
           </Modal>;
  }

  render() {
          return(
            <View style={{flex:1}}>
                {this._showModel()}
                <CustomTabBar
                    onTapPlay={(navigateAction)=>this._play(navigateAction)}
                    onShowPic={(imageUrl)=>this._onShowPic(imageUrl)}
                    themeColor = {this.state.themeColor}
                />
              </View>
          );
      }
}
