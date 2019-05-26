
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
const {width} = Dimensions.get('window');

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
        const req = rowData.isLeft?require('../src/robot.png'):require('../src/me.png');
        return rowData.isLeft? <View style={{flexDirection:'row',width:width,marginTop:5}}>
                <View>
                  <Image style={{width:40,height:40,borderRadius:20,marginLeft:10}} source={req}></Image>
                </View>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:5,marginTop:5}}>
                  <Text style={{color:'#1E90FF',fontSize:16,fontWeight:'bold',textAlign:'left'}}>图灵小儿</Text>
                  <Text style={{lineHeight:22,letterSpacing:2,color:'grey',fontSize:18,marginTop:5,textAlign:'left',maxWidth:width-100}}>{rowData.text}</Text>
                </View>
           </View>:
           <View style={{justifyContent:'center',flexDirection:'row',width:width,marginTop:5}}>
                <View style={{justifyContent:"center",flexDirection:'column',flex:1,marginLeft:60}}>
                    <Text style={{color:'#1E90FF',fontSize:16,fontWeight:'bold',textAlign:'right',lineHeight:25}}>我</Text>
                    <View style={{alignSelf:'flex-end'}}>
                        <Text style={{lineHeight:22,letterSpacing:2,color:'grey',fontSize:18,textAlign:'left',maxWidth:width-120}}>{rowData.text}</Text>
                    </View>
                </View>
                <View style={{width:50,height:50,marginLeft:10}}>
                    <Image style={{width:40,height:40,borderRadius:20,resizeMode:'contain'}} source={req}></Image>
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

        return  <View style={{flex:1,backgroundColor:'#F8F8FF'}}>
                    <FlatList style={{flex:1,marginTop:10}}
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