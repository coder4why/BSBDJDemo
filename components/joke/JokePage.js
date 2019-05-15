import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image
} from 'react-native';
import {getData} from '../tools/Fetch';
import setStatusBar from '../tools/StatusTool';
export default class JokePage extends Component {

  constructor(props){
    super(props);
    this.state={
      jokeLists:[],
      refreshing:false,
    }
    this._jokes.bind(this._jokes);
    this._header.bind(this._header);
    this._renderRow.bind(this._renderRow);
    this._requestDatas.bind(this._requestDatas);
  }

  _header(rowData){
    return <View style={{justifyContent:"center",flexDirection:'row',flex:1,}}> 
                <View style={{shadowColor:'#333333',shadowOffset:{h:3,w:3},shadowRadius:3,shadowOpacity:0.25,}}>
                    <Image style={{width:50,height:50,borderRadius:25,marginLeft:5}} source={{uri:rowData.header}}></Image>
                </View>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5}}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'#663399',fontSize:14,fontWeight:'bold',overflow:"hidden"}}>{rowData.top_comments_name}</Text>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={{color:'grey',fontSize:12,overflow:"hidden",marginTop:5}}>{rowData.top_comments_content}</Text>
                </View>
           </View>
  }

  
  _renderRow(rowData){
      
    return <View style={{flex:1,marginTop:5}}>
              {this._header(rowData)}
              <Text style={{margin:5,fontSize:16,color:'grey'}}>{rowData.text}</Text>
              <View style={{backgroundColor:'#EBEBEB',flex:1,height:1,marginTop:5}}>
              </View>
          </View>
  }
  _extraUniqueKey(item ,index){
    return "index"+index+item.text;
  }  

  _jokes(){
      return  <FlatList
                style={{width:Dimensions.get('window').width,
                height:Dimensions.get('window').height,}}
                keyExtractor = {this._extraUniqueKey} 
                data={this.state.jokeLists}
                renderItem = {({item}) => this._renderRow(item)}
                onRefresh={()=>this._requestDatas(false)} 
                refreshing={this.state.refreshing} 
                onEndReachedThreshold={0.2} 
                onEndReached={()=>this._requestDatas(true)}
            />;
  }

  _requestDatas(isMore){
    
    if(this.state.refreshing){
      return;
    }
    if(isMore==false){
      this.setState({
        refreshing:true
      });
    }
    var array = Array.from(this.state.jokeLists);
    setTimeout(() => {
          getData('https://api.apiopen.top/getJoke?page=0&count=20&type=text',(response)=>{
            if(response.code == 200){
              var array = this.state.jokeLists;
              if(array.length>0){
                array = isMore?this.state.jokeLists.concat(response.result):response.result.concat(this.state.jokeLists);
              }else{
                array = response.result;
              }
              this.setState({
                jokeLists:array,
                refreshing:false,
              });
            }
          });
    },500);
  }

  componentDidMount(){
    this.setState({
      refreshing:true
    });
    this._requestDatas(true);
    setStatusBar(true);
  }

  render() {
          return(
            <View style={{flex:1}}>
                {this._jokes()}
            </View>
          );
      }
}
