import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TextInput,
  Image,
  DeviceEventEmitter
} from 'react-native';
import Toast from 'react-native-easy-toast';
import {getData} from '../tools/Fetch';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import setStatusBar from '../tools/StatusTool';
var { Loading, EasyLoading } = require('react-native-easy-loading');
var Sound = require('react-native-sound');
var whoosh;
export default class MusicPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      musicLists:[],
      isPlaying:false,
      playIndex:0,
      degree:0,
      timer: null,
      musciUrl:''
    }
    this._musics.bind(this._musics);
    this._header.bind(this._header);
    this._renderRow.bind(this._renderRow);
    this._searchMusic.bind(this._searchMusic);
    this._playMusic.bind(this._playMusic);
  }

  _animated(){
    this.state.timer = setInterval(()=>{
      var that = this;
      if(that.state.degree>=360){
        that.setState({
          degree:0
        });
      }
      requestAnimationFrame(()=>{
        that.setState({
          degree:that.state.degree+1
        });
      });
    },30);
    
  }

  _header(rowData,rowIndex){
    const playMe = this.state.isPlaying==true && this.state.musciUrl==rowData.url;
    return <View style={{justifyContent:"center",flexDirection:'row',width:Dimensions.get('window').width,}}> 
                <View>
                  <Image style={{transform: [{rotateZ:`${playMe?this.state.degree:0}deg`}],width:50,height:50,borderRadius:25,marginLeft:10}} source={{uri:rowData.pic}}></Image>
                </View>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:10}}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'#1E90FF',fontSize:16,fontWeight:'bold',overflow:"hidden"}}>{rowData.title}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:14,overflow:"hidden",marginTop:5}}>{rowData.author}</Text>
                </View>
                <Image style={{marginTop:15,marginRight:15,width:15,height:15,resizeMode:'contain'}} source={ (playMe)?require('../src/pause.png'):require('../src/play.png')}></Image>
           </View>
  }
  componentWillUnmount(){
    if(whoosh){
      whoosh.pause();
      whoosh.release();
      clearInterval(this.state.timer);
      this.setState({
        degree:0
      });
    }
  }

  _playMusic(rowData,rowIndex){
    if(whoosh){
      whoosh.pause();
      this.setState({
        isPlaying:true,
        playIndex:rowIndex,
        degree:0,
        musciUrl:rowData.url,
      });
      this._animated();
    }
    let musciPath = rowData.url;
    whoosh = new Sound(musciPath, null, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                this.refs.toast.show('播放失败啦!',500);
                this.setState({
                  isPlaying:false,
                  degree:0,
                  musciUrl:'',
                });
                whoosh.reset();
                clearInterval(this.state.timer);
                return;
              }
              this.setState({
                isPlaying:true,
                playIndex:rowIndex,
                degree:0,
                musciUrl:musciPath,
              });
              this._animated();
              this._play();
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

  _play(){
    whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
        this.setState({
          isPlaying:false,
          degree:0,
          musciUrl:''
        });
        whoosh.pause();
        clearInterval(this.state.timer);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  componentDidMount(){
    this._searchMusic('薛之谦');
    Sound.setCategory('Playback');
    setStatusBar(true);
    var that = this;
    DeviceEventEmitter.addListener('PLAYVIDEO',function(value){
      if(whoosh){
        that.setState({isPlaying:false,degree:0,musciUrl:''});
        whoosh.pause();
      }
      clearInterval(that.state.timer);
    });
  }

  _searchMusic(text){

    if(text.length==0){
        return;
    }
    
    EasyLoading.show('Loading...', 10000);
    getData('https://api.apiopen.top/searchMusic?name=='+text,(response)=>{
      EasyLoading.dismis();
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
                      clearButtonMode='while-editing'
                      underlineColorAndroid='transparent'
                      numberOfLines={1}
                      returnKeyType="search"
                      placeholder="搜索歌名、歌手、专辑"
                      onSubmitEditing = {(event)=>this._searchMusic(event.nativeEvent.text)}
                />
                {this.state.musicLists.length>0?
                  this._musics():
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Image style={{flex:1,resizeMode:'contain'}} source={require('../src/nothing.png')}></Image>
                    </View>
                }
                <Toast ref="toast" position='center' opacity={.8}/>
                <Loading loadingStyle={{ backgroundColor: "#333333" }} />
            </View>
          );
      }
}
