import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import ShareView from '../commons/ShareView';
import {getData} from '../tools/Fetch';
import configureStore from '../../redux/store';
const store = configureStore();

export default class VideoPage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      videoLists:[],
      collectUrls:store.getState().videoLists,
      refreshing:false,
    }
    this._videos.bind(this._videos);
    this._header.bind(this._header);
    this._renderRow.bind(this._renderRow);
    this._requestDatas.bind(this._requestDatas);
    this._playAction.bind(this._playAction);
    store.subscribe(()=>this._storeChanged());
  }

  _contains(url){
    for (var i = 0; i < store.getState().videoLists.length; i++){
        if (store.getState().videoLists[i] == url)//如果要求数据类型也一致，这里可使用恒等号===
            return true;
    }
    return false;
  }

  //监听store是否更新了；
  _storeChanged(){
      alert('Store更新了');
      this.setState({
        collectUrls:store.getState().videoLists,
      });
  }

  componentDidMount(){
    this._requestDatas(true);
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
    setTimeout(() => {
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
            }
          }); 
    },500);
    
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
                <View style={{shadowColor:'#333333',shadowOffset:{h:3,w:3},shadowRadius:3,shadowOpacity:0.25,}}>
                    <Image style={{width:50,height:50,borderRadius:25, marginLeft:5,}} 
                    source={{uri:rowData.header}}>
                    </Image>
                </View>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5}}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'#663399',fontSize:14,fontWeight:'bold',overflow:"hidden"}}>{rowData.name}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:12,overflow:"hidden",marginTop:5}}>{rowData.text}</Text>
                </View>
           </View>
  }

  _playAction(rowData){
      const navigateAction = NavigationActions.navigate({
        routeName: 'VideoDetail',
        params: {rowData},
        action: NavigationActions.navigate({ routeName: 'VideoDetail',title:''}),
        });
      this.props.navigation.dispatch(navigateAction);

  }

  //更新store 视频数据
  _shareAction = (rowData,isCol) => {

    alert('你们的');
    var stroeVideos = this.state.collectUrls;
    if(isCol){
        stroeVideos.push(item.videoUrl);
    }else{
      const index =  stroeVideos.indexOf(rowData.videoUrl);
      stroeVideos.splice(index,1);
    }
    this.setState({
      collectUrls:stroeVideos
    });
    const action = {
        //每个action绑定一个type；
            type:'video_change',
            //需要更新store中的相关数据；
            value:stroeVideos
        };
        //store将事件派发给reducer；
    store.dispatch(action);

  }

  _shareView(rowData){
    return <ShareView
               up={rowData.up}
               comment={rowData.comment}
               forward={rowData.forward}
               content={rowData.text}
               imageUrl={rowData.thumbnail}
               shareUrl={rowData.video}>
               isCollected={this._contains(rowData.videoUrl)}
               collectUrls={this.state.collectUrls}
               onTapCollect={(isCol)=>this._shareAction(rowData,isCol).bind(this)}
           </ShareView>
 
  }

  _renderRow(rowData){
    return <View style={{flex:1,marginTop:5}}>
                {this._header(rowData)}
                <Text style={{margin:5,fontSize:16,color:'#333333'}}>{rowData.text}</Text>
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
                    <TouchableWithoutFeedback onPressIn = {() => this._playAction(rowData)}> 
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
              </View>
          );
      }
}
