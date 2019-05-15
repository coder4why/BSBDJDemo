import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import {getData} from '../tools/Fetch';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import setStatusBar from '../tools/StatusTool';

var Sound = require('react-native-sound');
var whoosh;
export default class MusicPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      musicLists:[],
      isPlaying:false,
      playIndex:0,
    }
    this._musics.bind(this._musics);
    this._header.bind(this._header);
    this._renderRow.bind(this._renderRow);
    this._searchMusic.bind(this._searchMusic);
    this._playMusic.bind(this._playMusic);
  }

  _header(rowData,rowIndex){
    return <View style={{justifyContent:"center",flexDirection:'row',width:Dimensions.get('window').width,}}> 
                <View style={{shadowColor:'#333333',shadowOffset:{h:3,w:3},shadowRadius:3,shadowOpacity:0.25,}}>
                  <Image style={{width:50,height:50,borderRadius:25,marginLeft:10}} source={{uri:rowData.pic}}></Image>
                </View>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:10}}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'#663399',fontSize:14,fontWeight:'bold',overflow:"hidden"}}>{rowData.title}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:12,overflow:"hidden",marginTop:5}}>{rowData.author}</Text>
                </View>
                <Image style={{marginTop:15,marginRight:15,width:15,height:15,resizeMode:'contain'}} source={ (this.state.isPlaying&&this.state.playIndex==rowIndex)?require('../src/pause.png'):require('../src/play.png')}></Image>
           </View>
  }
  componentWillUnmount(){
    if(whoosh){
      whoosh.pause();
      whoosh.release();
    }
  }

  _playMusic(rowData,rowIndex){
    if(whoosh){
      whoosh.pause();
      whoosh.release();
      this.setState({
        isPlaying:true,
        playIndex:rowIndex,
      });
    }
    let musciPath = rowData.url;
    whoosh = new Sound(musciPath, null, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                this.refs.toast.show('播放失败!',500);
                this.setState({
                  isPlaying:false,
                });
                whoosh.reset();
                return;
              }
              this.setState({
                isPlaying:true,
                playIndex:rowIndex,
              });
              whoosh.play((success) => {
                whoosh.release();
                this.setState({
                  isPlaying:false,
                });
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  this.refs.toast.show('播放失败!',500);
                  console.log('playback failed due to audio decoding errors');
                }
              });
    });
  }

  _renderRow(rowData){
    var rowId = this.state.musicLists.indexOf(rowData);
    return  <TouchableWithoutFeedback onPress={()=>this._playMusic(rowData,rowId)}>
                <View style={{flex:1,marginTop:5}}>
                    {this._header(rowData,rowId)}
                    <View style={{backgroundColor:'#EBEBEB',flex:1,height:1,marginTop:5}}>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    
  }
  _extraUniqueKey(item ,index){
    return "index"+index+item.text;
  }  

  _musics(){
    return  <View style={{flex:1}}>
                <FlatList
                    keyExtractor = {this._extraUniqueKey}   
                    style={{width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height-60,}}
                    data={this.state.musicLists}
                    renderItem = {({item}) => this._renderRow(item)}
                />
             </View>;
        
  }

  componentDidMount(){
    this._searchMusic('薛之谦');
    Sound.setCategory('Playback');
    setStatusBar(true);
  }

  _searchMusic(text){
    if(text.length==0){
        return;
    }
    
    getData('https://api.apiopen.top/searchMusic?name=='+text,(response)=>{
      if(response.code == 200){
        this.setState({
          musicLists:response.result
        });
      }
    });
  }

  render() {
          return(
            <View style={{flex:1}}>
                <TextInput
                      style={{
                        height:40,
                        borderWidth:1,
                        paddingLeft:15,
                        margin:10,
                        borderColor: '#EBEBEB',
                        borderRadius: 20,
                        fontSize:18,
                      }}
                      numberOfLines={1}
                      returnKeyType="search"
                      placeholder="搜索歌名、歌手、专辑"
                      onSubmitEditing = {(event)=>this._searchMusic(event.nativeEvent.text)}
                />
                {this.state.musicLists.length>0?
                  this._musics():<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{flex:1,resizeMode:'contain'}} source={require('../src/nothing.png')}></Image>
                  </View>
                }
                <Toast ref="toast" position='center' opacity={.8}/>
            </View>
          );
      }
}
