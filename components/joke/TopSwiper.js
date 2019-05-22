import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');

export default class TopSwiper extends Component {

   //分享点击事件：
   static propTypes = {
    showDetail: PropTypes.func,
   }

    constructor(props){
        super(props);
        this.state={
            result:[
                {
                    url:"https://mp.weixin.qq.com/s/md4-yrvJ3WXHNx61CwgIKA",
                    image:'http://wimg.spriteapp.cn//ugc/2019/03/05/20190305180534641034.png',
                },
                {
                    url:"https://jumpluna.58.com/i/2d9h84b9d3v43nkddh1",
                    image:'http://wimg.spriteapp.cn//ugc/2019/04/28/20190428142150689496.jpg',
                },
             ],
        }
    }
    _swipers(){
        var maps = [];
        this.state.result.map((item)=>{
            maps.push();
        });
        return maps;
    }
    _showDetail(index){
        const url = this.state.result[index].url;
        this.props.showDetail && this.props.showDetail(url);
    }
    render(){
           return   <View style={{height:140,width:width}}>
                        <Swiper
                            height={140} 
                            width={width}
                            paginationStyle={{bottom: 5,marginLeft:width-70,width:70}}
                            horizontal={true} autoplay autoplayTimeout={3} 
                            activeDotColor={'white'} 
                            >
                            <TouchableWithoutFeedback onPress={()=>this._showDetail(0)}>
                                <Image style={{width:width,height:140,resizeMode:'cover'}} source={{uri:this.state.result[0].image}}></Image>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={()=>this._showDetail(1)}>
                                <Image style={{width:width,height:140,resizeMode:'cover'}} source={{uri:this.state.result[1].image}}></Image>
                            </TouchableWithoutFeedback>
                        </Swiper>
                    </View>
    }
}
