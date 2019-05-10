

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  DeviceEventEmitter,
  Image
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
var width =  Dimensions.get('window').width;
import {ShareTool} from '../tools/ShareTool';

export default class SettingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            atavar:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3209991952,3058302493&fm=27&gp=0.jpg',
            nick_name:'....',
        }
    }
    //更换导航栏主题色：
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {    
                headerStyle: {
                    backgroundColor: '#fff',
                },
                headerRight:<View></View>
        }
    }
    componentDidMount(){
    }
    
    _selectThemeIndex(color){
        DeviceEventEmitter.emit('THEMECOLOR',color);
        this.props.navigation.setParams({
            headerStyle: {
                backgroundColor: color,
            },
            headerRight: 
                    <TouchableWithoutFeedback onPress={()=>{}}>
                        <View style={{width:60,height:44,marginRight:0,alignItems:'center'}}>
                        <Text style={{color:'white',textAlign:'center',fontSize:16,marginTop:13}}>拍照</Text>
                        </View>
                    </TouchableWithoutFeedback>
    });
    }
    _colorViews(){
        var colors = ['#66CDAA','#FF6A6A','#1E90FF','#AB82FF'];
        var colorViews = [];
        colors.map((f)=>{
            colorViews.push(
                <TouchableWithoutFeedback key={f} onPress={()=>this._selectThemeIndex(f)}>
                    <View style={{
                        backgroundColor:f,
                        width:(width-150)/colors.length,
                        height:1.5*(width-150)/colors.length,
                        margin:5,
                        marginTop:10,
                        borderRadius:10
                    }}>
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
                        nick_name:resp.nickname
                     });
                 });
                break;
            case 1:
                ShareTool.wechatLogin(function(resp){
                    that.setState({
                        atavar:resp.headimgurl,
                        nick_name:resp.nickname
                     });
                });
                break;
            case 2:
                alert('Weibo');
                break;
        }
    }

    _thirdLoginView(){
        var plats = ['../src/qq.png','../src/wechat.png'];
        var platViews = [];
        var img ;
        var index ;
        plats.map((f)=>{
           index = plats.indexOf(f);
           switch (index){
               case 0:
                    img = require('../src/qq.png');
                    break;
               case 1:
                    img = require('../src/wechat.png');
                    break;
            //    case 2:
            //         img = require('../src/weibo.png');
                    break;
           }
            platViews.push(
                <TouchableWithoutFeedback key={f} onPress={()=>this._loginIndex(plats.indexOf(f))}>
                   
                    <Image style={{
                        width:35,
                        height:35,
                        margin:20,
                        marginTop:10,
                        resizeMode:'contain'
                    }}
                    source={img}
                    >
                    </Image>
                </TouchableWithoutFeedback>
            );
        });

        return platViews;
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

    _thirdShareView(){
        var plats = [
                     '../src/qq.png','../src/qqzone.png','../src/wechat.png',
                     '../src/wechatCircle.png'
                    ];
        var platViews = [];
        plats.forEach((f)=>{
            var img ;
            var index = plats.indexOf(f);
            switch (index){
                case 0:
                     img = require('../src/qq.png');
                     break;
                case 1:
                     img = require('../src/qqzone.png');
                     break;
                case 2:
                     img = require('../src/wechat.png');
                     break;
                case 3:
                     img = require('../src/wechatCircle.png');
                     break;
                // case 4:
                //      img = require('../src/weibo.png');
                //      break;
            }
             platViews.push(
                 <TouchableWithoutFeedback key={f} onPress={()=>this._shareIndex(plats.indexOf(f))}>
                     <Image style={{
                         width:35,
                         height:35,
                         margin:8,
                         padding:15,
                         resizeMode:'contain'
                     }}
                     source={img}
                     >
                     </Image>
                 </TouchableWithoutFeedback>
             );
        });
        return platViews;
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
                    <View style={{justifyContent:"flex-start",flexDirection:'row',flex:1,}}>
                        {this._colorViews(1)}
                    </View>
                    {this._sepLine()}
                    <Text style={{color:'#636363',fontSize:18,left:10,marginTop:10,}}>登录</Text>
                    <View style={{justifyContent:"flex-start",flexDirection:'row',flex:1,}}>
                        {this._thirdLoginView()}
                    </View>
                    {this._sepLine()}
                    <Text style={{color:'#636363',fontSize:18,left:10,marginTop:10,}}>分享</Text>
                    <View style={{justifyContent:"flex-start",flexDirection:'row',flex:1,}}>
                        {this._thirdShareView()}
                    </View>
                    {this._sepLine()}
               </ScrollView>;
    }
}