

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {FlatList, ScrollView, Switch} from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';
import {DBTool} from '../tools/DBTool';
import Toast from 'react-native-easy-toast';
import configureStore from '../../redux/store';
const store = configureStore();

const rowData = {
    video:''
}
export default class FavoritePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            videoLists:[],
            index:0, //1'我的收藏',2'更换主题',3设置弹幕
            closeDM:true,
        }
        store.subscribe(()=>this._storeChanged());
    }
    _storeChanged(){
        // alert(store.getState().themeColor);
        // return 
    }

    componentDidMount(){
        this._getDM();
        const index = this.props.navigation.state.params.index;
        this.setState({index:index});
        if(index==1){
            this._requestVideos();
        }
    }

    async _getDM(){
        const value = await AsyncStorage.getItem('isCloseDM');
        this.setState({closeDM:!(value=='true')});
    }

    _requestVideos(){
        var that = this;
        DBTool.queryVideo(function(videos){
            that.setState({videoLists:videos});
        })
    }
    _clickItem(item){
        rowData.video = item.videoUrl;
        const navigateAction = NavigationActions.navigate({
            routeName: 'VideoDetail',
            params: {rowData},
            action: NavigationActions.navigate({ routeName: 'VideoDetail',title:''}),
            });
        this.props.navigation.dispatch(navigateAction);
    }
    _deleteCollect(item){
        DBTool.deleteVideo(item.videoUrl);
        this.refs.toast.show('取消成功', 500, () => {});
        var newS = this.state.videoLists;
        const index =  newS.indexOf(item);
        newS.splice(index,1);
        this.setState({
            videoLists:newS
        });
        DeviceEventEmitter.emit('CANCEL_COLLECT',item.videoUrl);
    }

    _shareHeart(item){
     return <TouchableWithoutFeedback onPress={()=>this._deleteCollect(item)}>
                <Image style={{
                    width:26,
                    height:26,
                    marginLeft:Dimensions.get('window').width-142,
                    marginBottom:5,
                    resizeMode:'contain'
                }}
                source={require('../src/heart_grey.png')}
                >
                </Image>
            </TouchableWithoutFeedback>
    }
    
    _selectThemeIndex(color){
        this._changeThemeColor(color);
        DeviceEventEmitter.emit('THEME_COLOR',color);
    }

    _changeThemeColor(color){
        const action = {
            type:'theme_color_change',
            value:color
        }
        store.dispatch(action);
    }

    _colorViews(){
        var colors = ['#FF0000','#7A378B','#FF6A6A','#1E90FF','#AB82FF','#6E7B8B','#7AC5CD'];
        var colorViews = [];
        colors.map((f)=>{
            colorViews.push(
                <TouchableWithoutFeedback key={f} onPress={()=>this._selectThemeIndex(f)}>
                        <View style={{
                            backgroundColor:f,
                            borderRadius:10,
                            height:50,
                            margin:10,
                            marginBottom:0,
                            justifyContent:'center',
                        }}>
                            <Text style={{textAlign:'center',color:'white',fontSize:16}}>{f}</Text>
                        </View>
                </TouchableWithoutFeedback>
            );
        });

        return colorViews;

    }
    _renderRow(item){
        return <TouchableWithoutFeedback key={item.imageUrl} onPress={()=>this._clickItem(item)}>
                    <View style={{flex:1,height:76,marginHorizontal:5,marginTop:5}}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                            <Image style={{width:100,height:70,borderRadius:5}} source={{uri:item.imageUrl}}></Image>
                            <View style={{flex:1}}>
                                <Text numberOfLines={2} ellipsizeMode="tail" style={{flex:1,fontSize:15,color:'grey',textAlign:'left',marginLeft:8,overflow:'hidden'}}>{item.content}</Text>
                                {this._shareHeart(item)}
                            </View>
                        </View>
                        <View style={{height:1,backgroundColor:'#EEE9E9'}}></View>
                    </View>
                </TouchableWithoutFeedback>

    }

    _extraUniqueKey(item ,index){
        return "index"+index+item.imageUrl;
    }  

   async _setDM(){
        await AsyncStorage.setItem('isCloseDM', this.state.closeDM==true?'true':'false');
    }
    render(){
        return  <View style={{flex:1}}>
                {this.state.index==1?
                    <FlatList
                        style={{flex:1}}
                        keyExtractor = {this._extraUniqueKey} 
                        data={this.state.videoLists}
                        renderItem = {({item}) => this._renderRow(item)}
                    />:
                    <ScrollView style={{flex:1}}>
                        {
                            this.state.index==2?
                            <View style={{flex:1,margin:5}}>
                                {this._colorViews()}
                            </View>:
                            <View style={{height:50,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:18,color:'#636363',textAlign:'center',marginLeft:5,lineHeight:50}}>关闭弹幕</Text>
                                <Switch value={this.state.closeDM} 
                                style={{marginLeft:Dimensions.get('window').width-140}}
                                onValueChange = {(value)=> {
                                    this.setState({closeDM:value});
                                    this._setDM();
                                 }}></Switch>
                            </View>
                        }
                        {this.state.index==3?<View style={{height:1,backgroundColor:'#EEE9E9',flex:1,marginHorizontal:5}}></View>:null}
                    </ScrollView>
                }
                <Toast  ref="toast"
                        position='center'
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{color:'white',fontSize:20}}
                />
                </View>
    }


}


