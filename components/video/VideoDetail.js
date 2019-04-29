import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';
import Video from 'react-native-video';
export default class VideoDetail extends Component {

  componentDidMount(){
    console.log(JSON.stringify(this.props.navigation.state.params.rowData.video));
  }

  render() {
          return(
            <View style={{flex:1}}>
                <Video source={{uri: this.props.navigation.state.params.rowData.video}}  
                ref={(ref) => {
                  this.player = ref
                }}                                      
                style={{
                  width:Dimensions.get('window').width,
                  height:250,
                }} 
                resizeMode={'cover'}
                />
            </View>
          );
      }
}
