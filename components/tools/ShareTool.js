
'use strict';
import * as QQAPI from 'react-native-qq';
import * as WeChat from 'react-native-wechat';
import {getData} from '../tools/Fetch'
// import * as WeiboAPI from 'react-native-weibo';

var ShareType = {
    QQ : 0 ,
    QZone : 1 ,
    WeChat : 2 ,
    WeChatCircle : 3 ,
    Weibo : 4 ,
}; 

export const ShareTool = {

    registerThirds(){
        WeChat.registerApp('wx488555c9eb4004bc');
    },

    platform:ShareType,
    qqLogin(callback)  {
        let scopes ='get_user_info';
        QQAPI.login(scopes)
            .then((data) => {
            if(data.errCode===0){
                console.log('------------请求一下--------------');
                getData('https://graph.qq.com/user/get_simple_userinfo?access_token=' + data.access_token 
                        +'&openid=' + data.openid
                        +'&oauth_consumer_key='+data.oauth_consumer_key,
                        (response)=>{
                            callback(response);
                        }
                )
            }
            })
            .catch((err) => {
                console.log('授权失败 失败信息为' +JSON.stringify(err))
        
        })
    },
    //微信登录：callback登录成功回调
    wechatLogin(callback){
        let scope ='snsapi_userinfo';
        let state ='wechat_sdk_abcs';
        var that = this;
        WeChat.sendAuthRequest(scope, state)
        .then(responseCode => 
            //授权成功获取token
            that.getAccessToken(responseCode,function(msg){
                callback(msg);
            })
        )
        .catch(error => {
            alert('登录授权发生错误：', error.message,);
        })
      
    },
    qqShare(title,imageUrl,webpageUrl){
        let qqshareInfo={
            type: 'news',
            imageUrl: imageUrl?imageUrl:"https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2019-05-13/27eb2a9330fee0252257d45acfadf62a.gif",
            title: title?title:"...",
            description: '描述',
            webpageUrl: webpageUrl?webpageUrl:"https://www.hao123.com/"
        }
        QQAPI.shareToQQ(qqshareInfo).then((res)=>{  
                console.log(res);                      
            }).catch((err)=>{
                console.log('分享失败');   
        })
    },
    
    getAccessToken(responseCode,callback) {
        console.log('-------------😂---------------------');
        console.log('--getAccessToken--');
        console.log('-------------😄----------------------');
        let appId ='wx488555c9eb4004bc';
         let secret ='ea98fc896c2201938dc130a37d7ec821';
         var that = this;
        switch (parseInt(responseCode.errCode)) {
        // 用户换取access_token的code，仅在ErrCode为0时有效  
            case 0:
        //获取token值
                getData('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + 
                        appId +'&secret=' + secret +
                        '&code=' + responseCode.code +
                        '&grant_type=authorization_code',
                (resp)=>that.getUserInfoFormWx(resp,(response)=>callback(response)))
                break;
            case -4:
        //用户拒绝
                break;
            case -2:
        //用户取消
                break;
        }
    },
    getUserInfoFormWx(res,callBack){

        console.log('-------------💰---------------------');
        console.log('--getUserInfoFormWx--');
        console.log('-------------🚪----------------------');
        var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' +
        res.access_token +'&openid=' + res.openid;
        getData(url, (respnse)=>callBack(respnse));
    },

    wechat(title,imageUrl,webpageUrl){
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToSession({
                    title:title,
                    description: title,
                    thumbImage: imageUrl,
                    type: 'news',
                    webpageUrl: webpageUrl
                })
                .catch((error) => {
                    alert(error.message);
                });
            } else {
                alert('请安装微信');
            }
        });
    },
    wechatCircle(title,imageUrl,webpageUrl){
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
            if (isInstalled) {
                WeChat.shareToTimeline({
                    title:title,
                    description: title,
                    thumbImage: imageUrl,
                    type: 'news',
                    webpageUrl: webpageUrl
                })
                    .catch((error) => {
                        alert(error.message);
                    });
            } else {
                alert('请安装微信');
            }
        });
    },
    wechatPay(){
        WeChat.isWXAppInstalled()
        .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.pay({
                        partnerId: 'xxxxxx',  // 商家向财付通申请的商家id
                        prepayId: 'xxxxxx',   // 预支付订单
                        nonceStr:'xxxxxx',   // 随机串，防重发
                        timeStamp: 'xxxxxxx'    ,  // 时间戳，防重发.
                        package: 'Sign=WXPay',    // 商家根据财付通文档填写的数据和签名
                        sign: 'xxxxxxxxx'       // 商家根据微信开放平台文档对数据做的签名
                        }).then((requestJson)=>{
                                    //支付成功回调                                           
                                    if (requestJson.errCode=="0"){
                                    //回调成功处理
                                    }
                                }).catch((err)=>{
                                    alert('支付失败')
                                })
                } else {
                    alert('请安装微信');
                }
            });
                                            
    }
    

}