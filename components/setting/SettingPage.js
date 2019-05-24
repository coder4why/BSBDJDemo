

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Switch,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet'; //弹窗
import {ShareTool} from '../tools/ShareTool';
import setStatusBar from '../tools/StatusTool';
const defalutAtavar = '';
export default class SettingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            atavar:defalutAtavar,
            nick_name:'',
            isQQ:false,
            isWx:false
        }
    }
    
  componentWillMount(){
    setStatusBar(false);
   } 
    _loginIndex(index){
        var that = this;
        switch (index){
            case 0:
                 ShareTool.qqLogin(function(resp){
                     that.setState({
                        atavar:resp.figureurl_qq,
                        nick_name:resp.nickname,
                        isQQ:true,
                        isWx:false
                     });
                 });
                break;
            case 1:
                ShareTool.wechatLogin(function(resp){
                    that.setState({
                        atavar:resp.headimgurl,
                        nick_name:resp.nickname,
                        isWx:true,
                        isQQ:false
                     });
                });
                break;
            case 2:
                alert('Weibo');
                break;
        }
    }

    _login(value,isQQ){
        if(isQQ){
            this._loginIndex(0);
        }else{
            this._loginIndex(1);
        }
    }

    _thirds(){
        return <View style={{position:'absolute',width:160,height:45,flexDirection:'row',
                             justifyContent:'space-between',
                             marginLeft:(Dimensions.get('window').width-160)/2.0
                            }}>
                <TouchableWithoutFeedback onPress={()=>this._loginIndex(0)}>
                    <Image style={{width:45,height:45,resizeMode:'contain'}} source={require('../src/qq.png')}></Image>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>this._loginIndex(1)}>
                    <Image style={{width:45,height:45,resizeMode:'contain'}} source={require('../src/wechat.png')}></Image>
                </TouchableWithoutFeedback>
        </View>
    }

    _userMsgs(){
      var source ;
      if(this.state.atavar.length>0){
        source={uri: this.state.atavar};
      }else{
        source=require('../src/default.png');
      }
      const {width,height} = Dimensions.get('window');
      return  <View style={{justifyContent:"center",flex:1}}>
                    <Image style={{width:width,height:height>=812?330:280,opacity:0.7}} 
                        source={require('../src/bjt.jpg')}
                    >
                    </Image>
                    {this.state.atavar.length>0?
                    <View style={{position:'absolute',width:320,height:200,alignContent:'center',
                    backgroundColor:'transparent',alignItems:'center',marginLeft:(Dimensions.get('window').width-320)/2.0}}>
                        <Image style={{width:130,height:130,borderRadius:65,marginTop:20,resizeMode:'cover'}} source={source}></Image>
                        <Text style={{height:60,marginLeft:5,fontSize:30,textAlign:'center',fontWeight:'bold',lineHeight:60,color:'white'}}>
                           {this.state.nick_name}
                        </Text>        
                    </View>:this._thirds()
                    }
              </View>
    }
    _sepLine(){
        return <View style={{height:1,backgroundColor:'#EEE9E9',flex:1,marginHorizontal:10}}></View>
    }

    _clickIndex(index){
        if(index==0){
            const navigateAction = NavigationActions.navigate({
                routeName: 'RobotPage',
                action: NavigationActions.navigate({ routeName: 'RobotPage',title:''}),
                });
            this.props.navigation.dispatch(navigateAction);
        }
        //更换主题：
       else if(index>0 && index<3){
            const navigateAction = NavigationActions.navigate({
                routeName: 'Favorite',
                params:{index},
                action: NavigationActions.navigate({ routeName: 'Favorite',title:''}),
                });
            this.props.navigation.dispatch(navigateAction);
        }else{
            //退出登录
            this.ActionSheet.show();
        }

    }

    _items(index){
        var titles = ['图灵聊天','我的收藏','更换主题','弹幕设置','退出登录'];
        return <TouchableWithoutFeedback key={titles[index]} onPress={()=>this._clickIndex(index)}>
                    <View style={{marginLeft:10,flexDirection:'row',height:50}}>
                        {/*<Image style={{width:32,height:32,resizeMode:'contain',marginTop:9}} source={require('../src/collect.png')}></Image>*/}
                        <Text style={{color:'#636363',fontSize:18,marginLeft:0,lineHeight:50}}>{titles[index]}</Text>
                        <Image style={{width:32,height:32,resizeMode:'contain',marginLeft:Dimensions.get('window').width-115,marginTop:9}} source={require('../src/next.png')}></Image>
                    </View>
              </TouchableWithoutFeedback>
    }

    _handlePress(index){
        if(index==1){  //退出登录
            this.setState({
                atavar:'',
                nick_name:''
            });
        }else if(index==2){
            //取消
        }
    }
    render(){
        const buttons = ['取消', '退出登录'];
        const CANCEL_INDEX = 0;
        const DESTRUCTIVE_INDEX = 1;
        return <ScrollView style={{flex:1,backgroundColor:'#FAFAFA'}}>
                    {this._userMsgs()}
                    {this._sepLine()}
                    {this._items(0)}
                    {this._sepLine()}
                    {this._items(1)}
                    {this._sepLine()}
                    {this._items(2)}
                    {this._sepLine()}
                    {this.state.atavar.length>0?
                        this._items(3):null
                    }
                    {
                        this.state.atavar.length>0?
                        this._sepLine():null
                    }
                    <ActionSheet
                            ref={(o) => this.ActionSheet = o}
                            title='是否退出当前账号？'
                            options={buttons}
                            cancelButtonIndex={CANCEL_INDEX}
                            destructiveButtonIndex={DESTRUCTIVE_INDEX}
                            onPress={this._handlePress.bind(this)}
                    />
               </ScrollView>;
    }
}