
import React, { Component } from 'react';
import {View,Modal,ActivityIndicator,DeviceEventEmitter,Image,Dimensions,TouchableWithoutFeedback,Text } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';
import JokeDTComponent from './components/JokeDTComponent';
import configureStore from '../../redux/store';
const store = configureStore();

const {height} = Dimensions.get('window');


export default class JokeDetail extends Component{
  
    constructor(props){
        super(props);
        this.state={
            type:this.props.navigation.state.params.data.type,
            info:this.props.navigation.state.params.data.info,
            imageUrl:'',
            showPic:false,
            themeColor:store.getState().themeColor
        }
    }

    componentDidMount(){
        var that = this;
        DeviceEventEmitter.addListener('THEME_COLOR', (color)=>{
            that.setState({themeColor:color});
        });
    }

    _play(navigation){
        this.props.navigation.dispatch(navigation);
    }

    _showModel(){
      return <Modal visible={this.state.showPic && this.state.imageUrl.length>0} transparent={true} 
                onRequestClose={()=> {this.setState({showPic: false,})
             }}>
                <ImageViewer 
                    onCancel={()=> {this.setState({showPic: false,});}}
                    saveToLocalByLongPress={false}
                    loadingRender={()=>{
                        return <ActivityIndicator color='white' size="large"/>
                    }}
                    onClick={()=>{this.setState({showPic:!this.state.showPic});}}
                    imageUrls={[{url:this.state.imageUrl,props:{}}]}/>
             </Modal>;
    }
    _showPic(imageUrl){
        this.setState({
            imageUrl:imageUrl,
            showPic:!this.state.showPic
        });
    }

    _showContents(){
        if(this.state.type=='0'){
            return  <WebView source={{uri: this.state.info}} style={{flex:1}}/>
        }else{
           return <JokeDTComponent
                    theme_id={this.state.info} 
                    onTapPlay={(navigation)=>this._play(navigation)}
                    showPic={(imageUrl)=>this._showPic(imageUrl)}
                    scrollEnabled={false}
                    themeColor={this.state.themeColor}
                  />
        }
                    
    }

    _showBack(){
        return this.state.showPic?null:<TouchableWithoutFeedback onPress={()=>{
                this.props.navigation.goBack();
        }}> 
            <View style={{flexDirection:'row',justifyContent:'center',position:'absolute',padding:10,marginTop:height>=812?40:20}}>
                <Image style={{width:20,height:20,}} source={require('../src/back_white.png')}></Image>
                <Text style={{color:'white',fontSize:18,flex:1,fontWeight:'bold'}}>返回</Text>
            </View>
        </TouchableWithoutFeedback>
    }
   
    render(){

        return  <View style={{flex:1}}>
                    {this._showModel()}
                    {this._showContents()}
                    {this._showBack()}
                </View>

    }

}