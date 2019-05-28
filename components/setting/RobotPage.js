
import {TULINGAPI} from '../commons/API';
import {postData} from '../tools/Fetch';
import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  FlatList
} from 'react-native';

const userId = 'D0956E62B9E84CC4BEF424F8CED306AB';
const key = 'f0d11b6cae4647b2bd810a6a3df2136f';// 'b8a7ec5c2661de89008bc900c105995c';
const {width,height} = Dimensions.get('window');

export default class RobotPage extends Component{

    constructor(props){
        super(props);
        this.state={
            dataSources:[],
            inputText:''
        }
    }

    componentDidMount(){
        this._requestText('图灵，你好！');
    }

    _requestText(text){
        var lists = this.state.dataSources;
        lists.push({
            text:text,
            isLeft:false,
        });
        this.setState({
            dataSources:lists,
            inputText:''
        });
        // const options = {
        //     "reqType":0,
        //     "perception": {
        //         "inputText": {
        //             "text": "你叫什么"
        //         }
        //     },
        //     "userInfo": {
        //         "apiKey": key,
        //         "userId": userId
        //     }
        // }
        const options = {
          
                "key": key,
                "userId": userId,
                'info':text
        }
        var that = this;
        const bodyStr =  JSON.stringify(options);  //`key=${key}&info=${text}`;
        postData(TULINGAPI,bodyStr,(response)=>{
            var lists = that.state.dataSources;
            lists.push({
                text: response.text, //response.results[0].values.text,
                isLeft:true
            });
            that.setState({
                dataSources:lists,
            });
        });
    }
    _renderRow(rowData){
        const req = rowData.isLeft?require('../src/robot.jpg'):require('../src/me.jpg');
        return rowData.isLeft? 
            <View style={{flexDirection:'row',width:width}}>
                <Image style={{width:50,height:50,borderRadius:25,marginLeft:10,resizeMode:'contain'}} source={req}></Image>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5,marginTop:5}}>
                    <View style={{flex:1,alignSelf:'flex-start',borderRadius:10}}>
                        <Text style={{backgroundColor:'#F2F2F2',lineHeight:22,letterSpacing:2,color:'grey',fontSize:18,
                                    textAlign:'left',maxWidth:width-120,padding:8}}>{rowData.text}
                        </Text>
                    </View>
                </View>
           </View>:
           <View style={{justifyContent:'center',flexDirection:'row',width:width-10,marginTop:5}}>
                <View style={{flexDirection:'column',flex:1,marginLeft:60,}}>
                    <View style={{flex:1,alignSelf:'flex-end',justifyContent:"center",borderRadius:10}}>
                        <Text style={{backgroundColor:'#7B7DDD',padding:8,lineHeight:22,letterSpacing:2,
                        color:'white',fontSize:18,textAlign:'left',maxWidth:width-120}}>{rowData.text}</Text>
                    </View>
                </View>
                <View style={{width:60,height:50}}>
                    <Image style={{width:50,height:50,marginLeft:10,paddingRight:10,borderRadius:25,resizeMode:'contain'}} source={req}></Image>
                </View>
            </View>
    }

    _input(){
        return  <TextInput
                        style={{
                        height:40,
                        borderWidth:1,
                        paddingLeft:10,
                        margin:5,
                        borderColor: '#EBEBEB',
                        borderRadius: 4,
                        fontSize:18,
                        }}
                        onChangeText={(text) => {this.setState({inputText:text})}}
                        value = {this.state.inputText}
                        clearButtonMode='while-editing'
                        underlineColorAndroid='transparent'
                        numberOfLines={1}
                        returnKeyType="search"
                        placeholder="请输入聊天内容："
                        onSubmitEditing = {(event)=>this._requestText(event.nativeEvent.text)}
                />
    }

    _extraUniqueKey(item ,index){
     return "index"+index+item.text;
    } 

    render(){

        return  <View style={{flex:1,backgroundColor:'white'}}>
                    <FlatList style={{flex:1}}
                    ref={(flatList) => this._flatList = flatList}
                    keyExtractor = {this._extraUniqueKey} 
                    data={this.state.dataSources}
                    renderItem = {({item}) => this._renderRow(item)}
                    onContentSizeChange={(w,h)=>{
                        this._flatList.scrollToEnd();
                    }}
                    />
                    {this._input()}
        </View>;

    }

}