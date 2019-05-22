import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {getData} from '../tools/Fetch';
import PropTypes from 'prop-types';
import {Forum} from '../commons/API';
const {width} = Dimensions.get('window');

export default class JokeContents extends Component {

   //分享点击事件：
   static propTypes = {
    showDetail: PropTypes.func,
   }
   static defaultProps = {
        themeColor:'#1E90FF',
    }
    constructor(props){
        super(props);
        this.state={
            items:[],
            themeColor:this.props.themeColor,
        }
    }
   
    componentDidMount(){
        var that = this;
        getData(Forum,(response)=>{
            that.setState({
                items:response.list
            });
        });
    }

    _showDetail(rowData){
        this.props.showDetail && this.props.showDetail(rowData);
    }

    _renderRow(rowData){

        return  <TouchableWithoutFeedback onPress={()=>this._showDetail(rowData)}>
                    <View style={{flex:1,height:91,backgroundColor:'white',marginTop:5}}>
                                <View style={{justifyContent:"center",flexDirection:'row',flex:1,height:90,backgroundColor:'white'}}> 
                                    <Image style={{width:70,height:70,borderRadius:5,margin:10}} source={{uri:rowData.image_list}}></Image>
                                    <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5}}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" 
                                            style={{color:this.state.themeColor,fontSize:16,fontWeight:'bold',overflow:"hidden"}}>
                                            {rowData.theme_name}
                                        </Text>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:12,overflow:"hidden",marginTop:5}}>{rowData.info}</Text>
                                    </View>
                                </View>
                                <View style={{backgroundColor:'#EBEBEB',width:width,height:1,marginTop:0}}></View>
                    </View>
                </TouchableWithoutFeedback>
        
    }

      _extraUniqueKey(item ,index){
        return "index"+index+item.info;
      }  
    
    render(){
        return  <FlatList
                    style={{flex:1}}
                    keyExtractor = {this._extraUniqueKey} 
                    data={this.state.items}
                    renderItem = {({item}) => this._renderRow(item)}
                    scrollEnabled={false}
                />;

    }

}
