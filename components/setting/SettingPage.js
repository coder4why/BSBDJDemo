

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  DeviceEventEmitter,
  Image,
  Switch
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
var width =  Dimensions.get('window').width;
import {ShareTool} from '../tools/ShareTool';
import * as QQAPI from 'react-native-qq';
import * as WeChat from 'react-native-wechat';

export default class SettingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            atavar:'http://ku.90sjimg.com/element_origin_min_pic/01/31/87/96573b585a7c9c4.jpg',
            nick_name:'',
            isQQ:false,
            isWx:false
        }
    }
    //更换导航栏主题色：
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {    
                headerStyle: {
                    backgroundColor: '#fff',
                },
                tabBarVisible: true, // 隐藏底部导航栏
                header:null,  //隐藏顶部导航栏
        }
    }

    componentDidMount(){
        this.props.navigation.setParams({
            tabBarVisible:false,
            header:null,  //隐藏顶部导航栏
        });
    }

    _myFavorite(){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Favorite',
            action: NavigationActions.navigate({ routeName: 'Favorite',title:''}),
            });
        this.props.navigation.dispatch(navigateAction);
    }
    
    _selectThemeIndex(color){
        DeviceEventEmitter.emit('THEMECOLOR',color);
        this.props.navigation.setParams({
            headerStyle: {
                backgroundColor: color,
            },
         });
    }
    _colorViews(){
        var colors = ['#66CDAA','#FF6A6A','#1E90FF','#AB82FF','#333333'];
        var colorViews = [];
        colors.map((f)=>{
            colorViews.push(
                <TouchableWithoutFeedback key={f} onPress={()=>this._selectThemeIndex(f)}>
                    <View>
                        <View style={{
                            backgroundColor:f,
                            width:60,
                            height:60,
                            borderRadius:30
                        }}>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        });

        return colorViews;
        
    }

    _loginIndex(index){
        var that = this;
        switch (index){
            case 0:
                 ShareTool.qqLogin(function(resp){
                     that.setState({
                        atavar:resp.figureurl_qq,
                        nick_name:resp.nickname,
                        isQQ:true
                     });
                 });
                break;
            case 1:
                ShareTool.wechatLogin(function(resp){
                    that.setState({
                        atavar:resp.headimgurl,
                        nick_name:resp.nickname,
                        isWx:true
                     });
                });
                break;
            case 2:
                alert('Weibo');
                break;
        }
    }

    _shareIndex(index){
        switch (index){
            case 0:
                ShareTool.qqShare();
                break;
            case 1:
                ShareTool.qqShare();
                break;
            case 2:
                ShareTool.wechat();
                break;
            case 3:
                ShareTool.wechatCircle();
                break;
            case 4:
                ShareTool.wechatPay();
                break;
        }
    }

    _switchs(isQQ){
        return <View style={{flex:1,flexDirection:"row",marginTop:5}}>
                    <Text style={{margin:10,fontSize:16,color:'#333333',width:60}}>{isQQ?'QQ':'微信'}</Text>
                    <Switch 
                        value={isQQ?this.state.isQQ:(this.state.isWx?this.state.isWx:false)} 
                        style={{marginRight:5,marginLeft:Dimensions.get('window').width-70-65}}
                        disabled={isQQ?QQAPI.isQQInstalled:WeChat.isWXAppInstalled}
                        trackColor='red'
                        thumbColor='blue'
                        onValueChange = {()=>function(value){
                            if(isQQ){
                                this._loginIndex(0);
                            }else{
                                this._loginIndex(1);
                            }
                        }}
                    ></Switch>
               </View>
    }

    _userMsgs(){
      return  <View style={{justifyContent:"flex-start",flexDirection:'row',flex:1,margin:10}}>
                    <Image style={{width:60,height:60,borderRadius:30}} source={{uri: this.state.atavar}}></Image>
                    <Text style={{height:60,marginLeft:5,fontSize:20,textAlign:'center',lineHeight:60}}>{this.state.nick_name}</Text>
              </View>
    }
    _sepLine(){
        return <View style={{height:1,backgroundColor:'#EEE9E9',flex:1,marginHorizontal:10}}></View>
    }

    render(){
        return <ScrollView style={{flex:1}}>
                    {this._userMsgs()}
                    {this._sepLine()}
                    <Text style={{color:'#636363',fontSize:18,left:10,marginTop:10,}}>更换主题色</Text>
                    <View style={{justifyContent:"space-evenly",flexDirection:'row',flex:1,marginBottom:5,margin:5}}>
                        {this._colorViews(1)}
                    </View>
                    {this._sepLine()}
                    <Text style={{color:'#636363',fontSize:18,left:10,marginTop:10,}}>登录</Text>
                    <View style={{justifyContent:"flex-start",flex:1,marginBottom:5}}>
                        {this._switchs(true)}
                        {this._switchs(false)}
                    </View>
                    {this._sepLine()}
                    <TouchableWithoutFeedback key='sds' onPress={()=>this._myFavorite()}>
                        <Text style={{color:'#636363',fontSize:18,margin:10,}}>我的收藏</Text>
                    </TouchableWithoutFeedback>
                    {this._sepLine()}
               </ScrollView>;
    }
}