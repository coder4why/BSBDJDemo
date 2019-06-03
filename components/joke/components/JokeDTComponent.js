
import React, { Component } from 'react';
import {View,Image,findNodeHandle,Dimensions,Text} from 'react-native';
import ScrollableTabView , {ScrollableTabBar } from 'react-native-scrollable-tab-view';
import JokeItemComponent from './JokeItemComponent';
import PropTypes from 'prop-types';
import {ThemeHeader} from '../../commons/API';
import {getData} from '../../tools/Fetch';
import { BlurView} from 'react-native-blur';
import { ScrollView } from 'react-native-gesture-handler';

const defaultImg = 'https://tse3-mm.cn.bing.net/th?id=OIP.-FzeCjskToNyc3NO-3zGSAHaE1&w=300&h=196&c=7&o=5&dpr=2&pid=1.7'

const {width} = Dimensions.get('window');

export default class JokeDTComponent extends Component{
    //最热： http://d.api.budejie.com/topic/forum/473/1/new/bsbdjhd-iphone-5.0.9/0-20.json
    //最新： http://d.api.budejie.com/topic/forum/473/1/hot/bsbdjhd-iphone-5.0.9/0-20.json
    //精华： http://d.api.budejie.com/topic/forum/473/1/jingxuan/bsbdjhd-iphone-5.0.9/0-20.json

    static propTypes = {
      onTapPlay: PropTypes.func,
      showPic:PropTypes.func,
      offsetY:PropTypes.func
    }
    static defaultProps = {
        theme_id:'',
        scrollEnabled:true,
        themeColor: '#1E90FF',
    }

    constructor(props){
      super(props);
      this.state = {

        headerImage:'',
        headerCate:'',
        headerDesc:'',
        viewRef:null,
        scrollEnabled:this.props.scrollEnabled,
        theme_id:this.props.theme_id,
        themeColor:this.props.themeColor,
        urls:[
          `http://d.api.budejie.com/topic/forum/${this.props.theme_id}/1/new/bsbdjhd-iphone-5.0.9/0-20.json`,
          `http://d.api.budejie.com/topic/forum/${this.props.theme_id}/1/hot/bsbdjhd-iphone-5.0.9/0-20.json`,
          `http://d.api.budejie.com/topic/forum/${this.props.theme_id}/1/jingxuan/bsbdjhd-iphone-5.0.9/0-20.json`
        ]
      }
    }

    componentDidMount(){
      this._requestHeader();
    }

    _requestHeader(){
      var that = this;
      getData(ThemeHeader+this.state.theme_id,(response)=>{
          that.setState({
            headerImage:response.info.image_detail==='' || response.info.image_detail.lenght==0?defaultImg:response.info.image_detail ,
            headerCate:response.info.theme_name,
            headerDesc:response.info.info,
          });
      });
    }
   
    _onTapPlay(navigateAction){
      this.props.onTapPlay && this.props.onTapPlay(navigateAction);
    }

    _onShowPic(imageUrl){
      this.props.showPic && this.props.showPic(imageUrl);
    }

    _switchTab(){
      return <ScrollableTabView 
      scrollEnabled={false}
      locked={false}
      initialPage={0}
      renderTabBar={() =><ScrollableTabBar style={{height: 45}}
      onChangeTab={(obj) => {
          console.log('index:' + obj.i);
        }
      }
      onScroll={(postion) => {  
          console.log('scroll position:' + postion);
        }
      }
      tabStyle={{backgroundColor:'#fff'}}/>}
      tabBarBackgroundColor={'#fff'}
      tabBarActiveTextColor={this.state.themeColor}
      tabBarInactiveTextColor='grey'
      tabBarUnderlineStyle={{backgroundColor:this.state.themeColor,height: 1,}}
      tabBarTextStyle={{fontSize: 17}}
      tabUnderlineDefaultWidth={10}
      >
      <View tabLabel='最新' style={{flex:1}}>
          <JokeItemComponent 
          url={this.state.urls[0]} 
          onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
          onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
          scrollEnabled={this.state.scrollEnabled}
          canLoadMore={false}
          themeColor={this.state.themeColor}
          />
      </View>
      <View tabLabel='精华' style={{flex:1}}>
          <JokeItemComponent
           url={this.state.urls[1]}
           onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
           onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
           scrollEnabled={this.state.scrollEnabled}
           canLoadMore={false}
           themeColor={this.state.themeColor}
           />
      </View>
      <View tabLabel='最热' style={{flex:1}}>
          <JokeItemComponent 
          url={this.state.urls[2]} 
          onTapPlay={(navigateAction)=>this._onTapPlay(navigateAction)}
          onTapShowImg={(imageUrl)=>this._onShowPic(imageUrl)}
          scrollEnabled={this.state.scrollEnabled}
          canLoadMore={false}
          themeColor={this.state.themeColor}
          />
      </View>
      </ScrollableTabView>
    }

    _showHeader(){
     return <View style={{justifyContent: "center",alignItems: "center",width:width,height:200}}>
                  <Image
                    ref={(img) => { this.backgroundImage = img; }}
                    source={{ uri:this.state.headerImage}}
                    style={{position: "absolute",top: 0,left: 0,bottom: 0,right: 0,resizeMode:'cover'}}
                    onLoadEnd={()=>{this.setState({ viewRef: findNodeHandle(this.backgroundImage) });}}
                  />
                  <BlurView
                    style={{ position: "absolute",top: 0,left: 0,bottom: 0,right: 0}}
                    viewRef={this.state.viewRef}
                    blurType="light"
                    blurAmount={15}
                  />
                  <View style={{position:'absolute',top:110,height:80,flexDirection:'row'}}>
                    <Image style={{width:80,height:80,borderRadius:8,marginLeft:10}} source={{ uri:this.state.headerImage }}></Image>
                    <View style={{marginLeft:10,width:width-100,height:80,justifyContent:'center'}}>
                      <Text numberOfLines={1} style={{fontSize:18,color:'white',fontWeight:'bold'}}>{this.state.headerCate}</Text>
                      <Text numberOfLines={1} style={{fontSize:15,color:'white',marginTop:8,letterSpacing:1.5,overflow:'hidden'}}>{this.state.headerDesc}</Text>
                    </View>
                  </View>
            </View>;
    }

    _offsetY(y){
      this.props.offsetY && this.props.offsetY(y);
    }

    render(){
      return  <ScrollView 
                ref='scroll'
                style={{flex:1}}
                scrollEventThrottle={60}
                onScroll={(e)=>this._offsetY(e.nativeEvent.contentOffset.y)}
              >
                {this._showHeader()}
                {this._switchTab()}
              </ScrollView>;
    }

}

