

export function getData(url,callBack){

    console.log('搞什么✈️'+JSON.stringify(url));
    fetch(url)
    .then((response) => response.json())
    .then((responseData)=>callBack(responseData))
    .catch((error)=>{
        console.log('------------------------------------');
        console.log(error.message);
        console.log('------------------------------------');
        callBack(error);
    })
    .done();
};
    
export function postData(url,bodyStr,callBack){

    fetch(url, {
        method:'POST',
        body:bodyStr,
    })
    .then((response) => response.json())
    .then((responseData)=>callBack(responseData))
    .catch((error)=>{
        console.log(error);
    })
    .done();
        
}