
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  TextInput
} from 'react-native';
const {width,height} = Dimensions.get('window');
const iPhoneX = height>=812;

export default class ReleasePage extends Component {

  constructor(props){
    super(props);
    this.state={}
  }
  //选择图片
  _selectPhotoTapped() {
    const options = {
        title: '选择图片', 
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照', 
        chooseFromLibraryButtonTitle: '选择照片', 
        // customButtons: [
        //     {name: 'fb', title: 'Choose Photo from Facebook'},
        //   ],
        cameraType: 'back',
        mediaType: 'photo',
        videoQuality: 'high', 
        durationLimit: 10, 
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8, 
        angle: 0,
        allowsEditing: false, 
        noData: false,
        storageOptions: {
            skipBackup: true  
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            // this.setState({
            //     avatarSource: source
            // });
        }
    });
  }

  //选择视频
  _selectVideoTapped() {
    const options = {
        
        title: '选择视频',
      cancelButtonTitle: '取消',
        takePhotoButtonTitle: '录制视频',
        chooseFromLibraryButtonTitle: '选择视频',
        mediaType: 'video',
        videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled video picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // this.setState({
            //     videoSource: response.uri
            // });
        }
    });
  }

  _inputs(){
    return <TextInput
              style={{
                  paddingHorizontal:15,
                  marginTop:10,
                  fontSize:16,
                  width:width-30,
                }}
                maxLength={150}
                underlineColorAndroid='transparent'
                multiline={true}
                returnKeyType="next"
                placeholder="这里添加文字，请勿发布色情、政治等违反国家法律的内容，违者封号处理。"
          />;
  }

  _chooseTopics(){
    return <TouchableWithoutFeedback onPress={()=>{}}>
        <Text style={{lineHeight:22,marginLeft:10,marginTop:20,width:80,height:26,color:'#1E90FF',textAlign:'center',borderRadius:13,borderColor:'#1E90FF',borderWidth:1}}>
          选择话题
        </Text>
    </TouchableWithoutFeedback>
  }


  _clickBottom(index){
      alert(index);
      if(index==0){
          this._selectVideoTapped();
      }else if (index==1) {
          this._selectPhotoTapped();
      }
  }

  _icons(){
    var icons = [];
    var imgs = [require('../src/video.png'),require('../src/picture.png'),require('../src/link.png')];
    var texts = ['视频','照片','链接'];
    texts.map((f)=>{
        const i = texts.indexOf(f);
        icons.push(
          <TouchableWithoutFeedback key={f} onPress={()=>this._clickBottom(i)}>
            <View style={{flex:1,width:100,justifyContent:'center',alignItems:'center'}}>
                <Image style={{width:50,height:50}} source={imgs[i]}></Image>
                <Text style={{fontSize:14,lineHeight:30,textAlign:'center',color:'grey'}}>{texts[i]}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
    });
    return icons;
  }

  _bottoms(){
    return <View style={{position:'absolute',width:width,height:120,marginTop:height-140}}>
              <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:16,lineHeight:30,textAlign:'center',color:'lightgrey'}}>内容发布规范请参考</Text>
                  <Text style={{fontSize:16,lineHeight:30,textAlign:'center',color:'#1E90FF'}}>"百思不得姐文明公约"</Text>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                  {this._icons()}
              </View>
          </View>
  }

  _header(){

      return <View style={{margin:10,marginTop:iPhoneX?30:20,height:60,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <TouchableWithoutFeedback onPress={()=>{
                this.props.navigation.goBack();
              }}>
                <Image style={{width:20,height:20,padding:5,resizeMode:'contain'}} source={require('../src/close.png')}></Image>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={()=>{
                this.props.navigation.goBack();
              }}>
                <Text style={{width:45,fontSize:20,color:'grey',lineHeight:45,paddingLeft:6,fontWeight:'bold'}}>发布</Text>
              </TouchableWithoutFeedback>
            </View>

  }

  render() {
          return(
            <View style={{flex:1}}>
                  {this._header()}
                  {this._inputs()}
                  {this._chooseTopics()}
                  {this._bottoms()}
            </View>
          );
      }
}
