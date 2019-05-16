

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation';
import {DBTool} from '../tools/DBTool';
import Toast from 'react-native-easy-toast';

const rowData = {
    video:''
}
export default class FavoritePage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return { 
            headerStyle: {
                backgroundColor: '#fff',
            },
    }}

    constructor(props){
        super(props);
        this.state = {
            videoLists:[],
            index:0, //0'我的收藏',1'更换主题'
        }
    }

    componentDidMount(){

        const index = this.props.navigation.state.params.index;
        this.setState({
            index:index
        });
        
        if(index==0){
            this._requestVideos();
        }
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
                    width:25,
                    height:25,
                    marginLeft:Dimensions.get('window').width-143,
                    marginBottom:5,
                    resizeMode:'contain'
                }}
                source={require('../src/heart_active.png')}
                >
                </Image>
            </TouchableWithoutFeedback>
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
                        <View style={{
                            backgroundColor:f,
                            width:60,
                            height:60,
                            borderRadius:30,
                        }}>
                        </View>
                </TouchableWithoutFeedback>
            );
        });

        return colorViews;

    }
    _renderRow(item){
        return <TouchableWithoutFeedback key={item.imageUrl} onPress={()=>this._clickItem(item)}>
                    <View style={{flex:1,height:106,marginHorizontal:5,marginTop:5}}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                            <Image style={{width:100,height:100,borderRadius:5}} source={{uri:item.imageUrl}}></Image>
                            <View style={{flex:1}}>
                                <Text numberOfLines={3} ellipsizeMode="tail" style={{flex:1,fontSize:16,color:'#333333',textAlign:'left',marginLeft:8,overflow:'hidden'}}>{item.content}</Text>
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
    render(){
        return  <View style={{flex:1}}>
                {this.state.index==0?
                    <FlatList
                        style={{flex:1}}
                        keyExtractor = {this._extraUniqueKey} 
                        data={this.state.videoLists}
                        renderItem = {({item}) => this._renderRow(item)}
                    />:
                    <ScrollView style={{flex:1}}>
                        <View style={{justifyContent:"space-evenly",flexDirection:'row',flex:1,margin:5}}>
                            {this._colorViews()}
                        </View>
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