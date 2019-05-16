import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';
import Pop from 'rn-global-modal';
import PropTypes from 'prop-types';
import {ShareTool} from '../tools/ShareTool';
import {DBTool} from '../tools/DBTool';

export default class ShareView extends Component {
    //分享点击事件：
    static propTypes = {
        onTapCollected: PropTypes.func,
    }
    static defaultProps = {
        up:'',
        comment:'',
        forward:'',
        //分享内容：
        content:'',
        imageUrl:'',
        shareUrl:'',
        isCollected:false,
    }

    constructor(props){
        super(props);
        this.state={
            up:this.props.up,
            comment:this.props.comment,
            forward:this.props.forward,
            isCollected:this.props.isCollected,
            collectUrls:this.props.collectUrls,

            //分享内容：
            content:this.props.content,
            imageUrl:this.props.imageUrl,
            shareUrl:this.props.shareUrl,
        }
        this._clickIndex = this._clickIndex.bind(this);
    }
   
    componentDidMount(){
        var that = this;
        DeviceEventEmitter.addListener('CANCEL_COLLECT',function(url){
            that.setState({
                isCollected:url===that.state.shareUrl?false:that.state.isCollected
            });
        });
    }

    _shareIndex(index){
        switch (index){
            case 0:
                ShareTool.qqShare(this.state.content,this.state.imageUrl,this.state.imageUrl);
                break;
            case 1:
                ShareTool.qqShare(this.state.content,this.state.imageUrl,this.state.imageUrl);
                break;
            case 2:
                ShareTool.wechat(this.state.content,this.state.imageUrl,this.state.imageUrl);
                break;
            case 3:
                ShareTool.wechatCircle(this.state.content,this.state.imageUrl,this.state.imageUrl);
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
            }
             platViews.push(
                 <TouchableWithoutFeedback key={f} onPress={()=>this._shareIndex(plats.indexOf(f))}>
                     <Image style={{
                         width:35,
                         height:35,
                         marginHorizontal:15,
                         padding:15,
                         marginTop:30,
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
    _clickIndex(index){

        if(index === 2){
            this.setState({
                isCollected:!this.state.isCollected
            })
            DBTool.insertVideo('',this.state.content,this.state.imageUrl,this.state.shareUrl);
            this.props.onTapCollected && this.props.onTapCollected(this.state.isCollected);

        }else if (index === 3) {
            //分享：
            Pop.show(
                <View style={{
                    justifyContent:'center',
                    height: 180, width: '80%', backgroundColor:'white',
                    borderRadius:15
                }}>
                <Text style={{height:25,fontSize:20,textAlign:'center',marginTop:25}}>分享到</Text>
                <View style={{
                    justifyContent:'center',flexDirection:'row',
                    flex:1,height:140 
                }}>
                {this._thirdShareView()}
                </View>
                </View>,
                {
                    animationType: 'slide-up',
                    maskClosable: true,
                    onMaskClose: ()=>{}
                })
        }

    }

    _subIndex(index){

        const local_up = require('../src/up.png');
        const local_comment = require('../src/comment.png');
        const local_share = require('../src/share.png');
        const local_heart = require('../src/heart.png');
        const local_heart_active = require('../src/heart_active.png');

        const img = [local_up,local_comment,this.state.isCollected?local_heart_active:local_heart,local_share];

        var upMsg = this.state.up;
        if (this.state.up.slice(0,1) == '"') {
            upMsg = this.state.up.slice(1,-1);
          }

        const textDes = [upMsg,`${this.state.comment}`];
        
        return <TouchableWithoutFeedback onPress={()=>this._clickIndex(index)}>
            <View style={{flex:1,justifyContent:'center',flexDirection:'row',}}>
            <Image style={{resizeMode:'contain',width:20,height:20}} source={img[index]}></Image>
            {index<2?
                <Text style={{fontSize:15,color:'grey',height:60,marginLeft:5,textAlign:'left',paddingTop:0}}>{textDes[index]}</Text>
                :null
            }
            </View>
        </TouchableWithoutFeedback>
    }

    render(){

        return <View style={{flex:1,height:40,alignContent:'space-between',justifyContent:'center',flexDirection:'row',marginHorizontal:20,paddingTop:10}}>
                    {this._subIndex(0)}
                    {this._subIndex(1)}
                    {this._subIndex(2)}
                    {this._subIndex(3)}
               </View>

    }
  }