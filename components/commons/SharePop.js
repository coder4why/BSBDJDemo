import Pop from 'rn-global-modal';
import React, { Component } from 'react';


export default class SharePop extends Component{
    _showPop(){
        Pop.show(
            <View style={{height: 300, width: '30%', backgroundColor:'grey'}}/>
            ,
            {
                animationType: 'slide-up', 
                maskClosable: true,
                onMaskClose: ()=>{}
            })
    }
 
    render(){
        return <View style={{width:200,height:150}}>
                <Text style={{fontSize:18}} onPress={this._showPop.bind(this)}>
                    Show Pop
                </Text>
        </View>
    }


}