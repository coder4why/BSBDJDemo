
import React, { Component } from 'react';
import {View,Modal,ActivityIndicator } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';
import JokeDTComponent from './components/JokeDTComponent';
export default class JokeDetail extends Component{
  
    constructor(props){
        super(props);
        this.state={
            type:this.props.navigation.state.params.data.type,
            info:this.props.navigation.state.params.data.info,
            imageUrl:'',
            showPic:false
        }
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
                    scrollEnabled={true}
                  />
        }
                    
    }
   
    render(){

        return  <View style={{flex:1}}>
                    {this._showModel()}
                    {this._showContents()}
                </View>

    }

}