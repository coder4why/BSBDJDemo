
import React, { Component } from 'react'
import {
    Text,View,Image,FlatList,Dimensions,
    TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
import ShareView from '../../commons/ShareView';
import {getData} from '../../tools/Fetch';
import { NavigationActions } from 'react-navigation';
import RCTGIFView from './RCTGIFView';
export default class JokeItemComponent extends Component{
    //播放点击事件：
    static propTypes = {
        onTapPlay: PropTypes.func,
        onTapCollected:PropTypes.func,
        onTapShowImg:PropTypes.func,
    }
    static defaultProps = {
        url:'',
        scrollEnabled:true,
        canLoadMore:true,
        themeColor: '#7A378B',
    }
    constructor(props){
        super(props);
        this.state={
            url:this.props.url,
            results:[],
            refreshing:false,
            scrollEnabled:this.props.scrollEnabled,
            canLoadMore:this.props.canLoadMore,
            themeColor: this.props.themeColor,
        }
    }

    componentDidMount(){
       this.setState({refreshing:true});
       this._requestDatas();
       var that = this;
        DeviceEventEmitter.addListener('THEME_COLOR', (color)=>{
            that.setState({themeColor:color});
        });
    }

    _requestDatas = (isMore)=> {
        
        if(isMore != undefined && this.state.canLoadMore==false){
            return;
        }
        if(this.state.refreshing){
            return;
        }
        var array = Array.from(this.state.results);
        if(isMore==false){
            this.setState({refreshing:true});
        }
        const url = this.state.url;
        var that = this;
        getData(url,(response)=>{
            if(array.length>0){
                array = isMore?this.state.results.concat(response.list):response.list.concat(this.state.results);
            }else{
                array = response.list;
            }
            that.setState({
                results:array,
                refreshing:false
              });
        });
    }    

    _header(rowData){
        return <View style={{justifyContent:"center",flexDirection:'row',flex:1,}}> 
                        <Image style={{width:50,height:50,borderRadius:25, marginLeft:5,}} 
                        source={{uri:rowData.u.header.length>0?rowData.u.header[0]:'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%8A%A0%E8%BD%BD%E5%A4%B1%E8%B4%A5%E5%8D%A0%E4%BD%8D%E5%9B%BE&step_word=&hs=2&pn=28&spn=0&di=11670&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=648988099%2C969495170&os=19413908%2C1911372760&simid=4215893616%2C559834046&adpicid=0&lpn=0&ln=188&fr=&fmq=1558415628478_R&fm=result&ic=&s=undefined&hd=&latest=&copyright=&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=15&oriquery=&objurl=http%3A%2F%2Fac.tc.qq.com%2Fstore_file_download%3Fbuid%3D15017%26uin%3D1460156420%26dir_path%3D%2F%26name%3D09_07_00_87951a556b39d2169a7ae8e9da624eba_17.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3F4_z%26e3Bwv_z%26e3Bqq_z%26e3Bv54AzdH3Fviwrpj6AzdH3Ftg1jxAzdH3Ft1AzdH3Fd90AzdH3Fvt1AzdH3F8&gsm=0&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'}}>
                        </Image>
                    <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5}}>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{color:this.state.themeColor,fontSize:16,fontWeight:'bold',overflow:"hidden"}}>{rowData.u.name}</Text>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:14,overflow:"hidden",marginTop:3}}>{rowData.passtime}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>{
                        const index = this.state.results.indexOf(rowData);
                        var newRe = this.state.results;
                        newRe.splice(index,1);
                        this.setState({
                            results:newRe
                        });
                    }}>
                        <Image style={{width:28,height:28,marginTop:11,marginRight:11,resizeMode:'contain'}} 
                               source={require('../../src/delete.png')}>
                        </Image>
                    </TouchableWithoutFeedback>
               </View>
      }
    
      _playAction(itemData){
          if(itemData.video == null){
              return;
          }
          const rowData = {
            video:itemData.video.video.length>0?itemData.video.video[0]:(itemData.video.download.length>0?itemData.video.download[0]:'')
          };
          const navigateAction = NavigationActions.navigate({
            routeName: 'VideoDetail',
            params: {rowData},
            action: NavigationActions.navigate({ routeName: 'VideoDetail',title:''}),
            });
          this.props.onTapPlay && this.props.onTapPlay(navigateAction);

      }
      _onTapCollected(collected){
    
            this.props.onTapCollected && this.props.onTapCollected(collected);
    
      }
    
      _shareView(rowData){
        const isVideo = (rowData.video != null) && rowData.video.video.length>0;
        return isVideo?<ShareView
                   up={JSON.stringify(rowData.up!=null?rowData.up:0)}
                   comment={JSON.stringify(rowData.down!=null?rowData.down:0)}
                   forward={JSON.stringify(rowData.forward!=null?rowData.forward:0)}
                   content={rowData.text}
                   imageUrl={rowData.image != null?rowData.image.big[0]:(rowData.video!=null?rowData.video.thumbnail_small[0]:'')}
                   shareUrl={rowData.image != null?rowData.image.big[0]:(rowData.video!=null?rowData.video.video[0]:'')}
                   onTapCollected={(collected) => this._onTapCollected(collected)}>
               </ShareView>:null
     
      }

      _picShow(imageUrl){
        this.props.onTapShowImg && this.props.onTapShowImg(imageUrl);
      }

      _showGif(imageUrl){
            return  <RCTGIFView 
                        style={{
                            width:Dimensions.get('window').width-10,
                            height:320,
                            resizeMode:'cover',
                            margin:5,
                            marginBottom:0,
                            borderRadius:3,
                        }}
                        imageName={imageUrl}
                        playStatus={true}
                    />
      }

      _showImg(imageUrl,bigImageUrl){
            return  <TouchableWithoutFeedback onPress={()=>this._picShow(bigImageUrl)}>
                        <Image 
                        style={{
                            width:Dimensions.get('window').width-10,
                            height:200,
                            resizeMode:'cover',
                            margin:5,
                            marginBottom:0,
                            borderRadius:3,
                        }}
                        source={{uri:imageUrl}}
                        />        
                    </TouchableWithoutFeedback>
      }

      _showImage(imageUrl,bigImageUrl,isGif){
       return isGif?this._showGif(imageUrl):this._showImg(imageUrl,bigImageUrl);
    }
      _renderRow(rowData){

        var imageUrl = '';
        var bigImageUrl = '';
        var tyle = 0;
        if(rowData.image != null){
            imageUrl = rowData.image.thumbnail_small[0];
            bigImageUrl = rowData.image.download_url[0];
            type=0;
        }else if(rowData.video != null){
            imageUrl = rowData.video.thumbnail_small[0];
            type = 1;
        }else if(rowData.gif != null){
            imageUrl = rowData.gif.images[0];
            type=2;
        }else{
            type=3;
        }

        return <View style={{flex:1,marginTop:5}}>
                    {this._header(rowData)}
                    <Text style={{margin:5,fontSize:17,color:'grey',letterSpacing:2,lineHeight:20}}>{rowData.text}</Text>
                    <View style={{alignItems:'center'}}>
                         {type==3?null:this._showImage(imageUrl,bigImageUrl,type==2)}
                        {type!=1?null:
                            <TouchableWithoutFeedback onPressIn = {() => this._playAction(rowData)}> 
                                <Image style={{
                                    position:'absolute',
                                    marginTop:80,
                                    width:40,
                                    height:40,
                                    resizeMode:'contain',
                                    }} 
                                    source={require('../../src/play_video.png')}
                                ></Image>
                            </TouchableWithoutFeedback>
                        }
                    </View>
                    {this._shareView(rowData)}
                    <View style={{backgroundColor:'#EBEBEB',flex:1,height:1,marginTop:5}}></View>
               </View>
      }

    _jokes(){
        return  <FlatList
                    ref='scroll'
                    keyExtractor = {this._extraUniqueKey} 
                    data={this.state.results}
                    renderItem = {({item}) => this._renderRow(item)}
                    onRefresh={()=>this._requestDatas(false)} 
                    refreshing={this.state.refreshing} 
                    onEndReachedThreshold={0.2} 
                    onEndReached={()=>this._requestDatas(true)}
                    scrollEnabled={this.state.scrollEnabled}
                    onScrollEndDrag={
                        ()=>{
                            // alert(this.refs.scroll.offset);
                        }
                    }
                />;

    }
    _extraUniqueKey(item ,index){
        return "index"+index+item.text;
    }  
    render(){
        return <View style={{flex:1}}>
                {this._jokes()}
               </View>
    }

}
