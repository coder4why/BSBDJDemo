


//使用redux更新收藏和取消收藏时，更新视频页面的收藏按钮显示状态； 
//#cc2099
const defaluteState = {
    themeColor:'purple'
}

//redux接受store.dispatch事件；state为store中保存的所有state；
export default function themeColor(state=defaluteState,actions){

    if(actions.type==='theme_color_change'){
        //深拷贝store的state；
        const newState = JSON.parse(JSON.stringify(state));
        //设置新的state的属性值；
        newState.themeColor = actions.value;
        return newState;
    }

    //返回store默认的state；
    return state;
}