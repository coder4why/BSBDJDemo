
import React, { Component } from 'react';
import {View,Modal } from 'react-native';
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
      return <Modal visible={true} transparent={true} 
                onRequestClose={()=> {this.setState({showPic: false,})
             }}>
                <ImageViewer 
                    onCancel={()=> {this.setState({showPic: false,});}}
                    saveToLocalByLongPress={true}
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
        return <View style={{flex:1}}>
                {
                    this.state.type=='0'?
                    <WebView
                        source={{uri: this.state.info}}
                        style={{flex:1}}
                    />:
                    <JokeDTComponent
                        theme_id={this.state.info} 
                        onTapPlay={(navigation)=>this._play(navigation)}
                        showPic={(imageUrl)=>this._showPic(imageUrl)}
                        />
                }
            </View>
    }

    render(){
        
        return  this.state.showPic && this.state.imageUrl.length>0? this._showModel():this._showContents();

    }

}