


//使用redux更新收藏和取消收藏时，更新视频页面的收藏按钮显示状态；
const defaluteState = {
    // 保存的都是收藏的视频数据，保存插入，删除移除；
    videoLists:[],
}

//redux接受store.dispatch事件；state为store中保存的所有state；
export default function themeColor(state=defaluteState,actions){

    if(actions.type==='video_change'){
        //深拷贝store的state；
        const newState = JSON.parse(JSON.stringify(state));
        //设置新的state的属性值；
        newState.videoLists = actions.videoLists;
        return newState;
    }

    //返回store默认的state；
    return state;
}