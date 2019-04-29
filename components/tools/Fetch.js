

export function getData(url,callBack){

    console.log('搞什么✈️'+JSON.stringify(url));
    fetch(url)
    .then((response) => response.json())
    .then((responseData)=>callBack(responseData))
    .catch((error)=>{
    })
    .done();
};
    
export function postData(url,options,callBack){

    let formData = new FormData();
    FormData.options = options;

    fetch(url, {
        method:'POST',
        headers:{},
        body:formData,
    })
    .then((response) => response.json())
    .then((responseData)=>callBack(responseData))
    .catch((error)=>{
        console.log(error);
    })
    .done();
        
}