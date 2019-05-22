import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  DeviceEventEmitter
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import ShareView from '../commons/ShareView';
import {getData} from '../tools/Fetch';
import setStatusBar from '../tools/StatusTool';
import SplashScreen from 'react-native-splash-screen'
import Toast from 'react-native-easy-toast';

export default class VideComponent extends Component {
  
   //分享点击事件：
   static propTypes = {
    onTapPlay: PropTypes.func,
   }
   static defaultProps = {
    themeColor:'#1E90FF',
  }
  constructor(props){
    super(props);
    this.state={
      videoLists:[],
      refreshing:false,
      themeColor:this.props.themeColor
    }
    this._videos.bind(this._videos);
    this._header.bind(this._header);
    this._renderRow.bind(this._renderRow);
    this._requestDatas.bind(this._requestDatas);
    this._playAction.bind(this._playAction);

  }

  componentDidMount(){

    this.setState({
      refreshing:true
    });
    SplashScreen.hide();
    this._requestDatas(true);
    setStatusBar(true);
  }
  
  _requestDatas = (isMore) => {
    if(this.state.refreshing){
      return;
    }
    var array = Array.from(this.state.videoLists);
    if(isMore==false){
      this.setState({
        refreshing:true
      });
    }
    getData('https://api.apiopen.top/getJoke?page=0&count=20&type=video',(response)=>{
    if(response.code == 200){
      if(array.length>0){
        array = isMore?this.state.videoLists.concat(response.result):response.result.concat(this.state.videoLists);
      }else{
        array = response.result;
      }
      this.setState({
        videoLists:array,
        refreshing:false
      });
    }else{
      this.setState({
        refreshing:false
      });
      this.refs.toast.show('请求失败', 500, () => {});
    }
  }); 
    
  }
 
  _videos(){
    return  <FlatList
                keyExtractor = {this._extraUniqueKey} 
                data={this.state.videoLists}
                renderItem = {({item}) => this._renderRow(item)}
                onRefresh={()=>this._requestDatas(false)} 
                refreshing={this.state.refreshing} 
                onEndReachedThreshold={0.2} 
                onEndReached={()=>this._requestDatas(true)}
              />;

  }
  _extraUniqueKey(item ,index){
      return "index"+index+item.text;
  }  
  _header(rowData){
    return <View style={{justifyContent:"center",flexDirection:'row',flex:1,}}> 
                <View>
                    <Image style={{width:50,height:50,borderRadius:25, marginLeft:5,}} 
                    source={{uri:rowData.header}}>
                    </Image>
                </View>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5}}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:this.state.themeColor,fontSize:16,fontWeight:'bold',overflow:"hidden"}}>{rowData.name}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:14,overflow:"hidden",margin:5}}>{rowData.top_comments_content!=null?rowData.top_comments_content:rowData.passtime}</Text>
                </View>
           </View>
  }

  _playAction(rowData){
      const navigateAction = NavigationActions.navigate({
        routeName: 'VideoDetail',
        params: {rowData},
        action: NavigationActions.navigate({ routeName: 'VideoDetail',title:''}),
        });
      this.props.onTapPlay && this.props.onTapPlay(navigateAction);

  }
  _onTapCollected(collected){

    this.refs.toast.show(collected==false?'收藏成功':'取消成功', 500, () => {});

  }

  _shareView(rowData){
    return <ShareView
               up={rowData.up}
               comment={rowData.comment}
               forward={rowData.forward}
               content={rowData.text}
               imageUrl={rowData.thumbnail}
               shareUrl={rowData.video}
               onTapCollected={(collected) => this._onTapCollected(collected)}>
           </ShareView>
 
  }

  _renderRow(rowData){
    return <View style={{flex:1,marginTop:5}}>
                {this._header(rowData)}
                <Text style={{margin:5,fontSize:17,color:'grey',letterSpacing:2,lineHeight:20}}>{rowData.text}</Text>
                <View style={{alignItems:'center'}}>
                    <Image 
                      style={{
                        width:Dimensions.get('window').width-10,
                        height:200,
                        resizeMode:'cover',
                        margin:5,
                        marginBottom:0,
                        borderRadius:3,
                      }}
                      source={{uri:rowData.thumbnail}}
                    />
                    <TouchableWithoutFeedback onPress = {() => this._playAction(rowData)}> 
                        <Image style={{
                              position:'absolute',
                              marginTop:80,
                              width:40,
                              height:40,
                              resizeMode:'contain',
                            }} 
                            source={require('../src/play_video.png')}
                        ></Image>
                    </TouchableWithoutFeedback>
                </View>
                {this._shareView(rowData)}
                <View style={{backgroundColor:'#EBEBEB',flex:1,height:1,marginTop:5}}></View>
           </View>
  }

  render() {
          return(
            <View style={{flex:1}}>
                {this._videos()}
                <Toast  ref="toast"
                        position='center'
                        positionValue={10}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:'white',fontSize:15}}
                />
              </View>
          );
      }
}
