import qs from 'querystring';
import 'whatwg-fetch';
import store from '../store';
import {LOADING} from '../constants/type';
const METHOD = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
};
const loading=flag=>{
  store.dispatch({
    type:LOADING,
    payLoad:flag
  })
}
const cacheUrl = url => {
    let fullUrl = window.location.origin + url;
    if(sessionStorage.hasOwnProperty(fullUrl)){//有这个key
        if("0" != sessionStorage.getItem(fullUrl)){
            return sessionStorage.getItem(fullUrl);
        }
    }else {
        sessionStorage.setItem(fullUrl,"0");
    }
}

const setCache = (url,data) => {
    if(sessionStorage.hasOwnProperty(url) && sessionStorage.getItem(url) == "0"){
        sessionStorage.setItem(url,JSON.stringify(data));
    }
}

const checkRespStatus = (respPromise) => {
    loading(false);
    if (respPromise.status !== 200) {
        alert('Server error occurred');
        console.log('Server error occurred');
        return Promise.reject();
    }
    return respPromise.json().then(resp => {
        return new Promise((resolve, reject) => {
            if (resp && resp.code === 200) {
                setCache(respPromise.url,resp.data);
                resolve(resp.data);
            } else {
                alert(resp.msg || "response error occoured");
                reject(resp);
            }
        });
    })
}

export const request = (url, params=null, method = 'post',cache = false, jsonType = true) => {
    let options = {
        headers: {
            'Content-Type': jsonType
            ? 'application/json;charset=UTF-8'
            : 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        method: method,
        credentials: 'include'
    };
    if (process.env.NODE_ENV != "production"){
        options.headers.userId = "1";
    }
    if (method !== METHOD.GET && params) {
        options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
    }
    if (method === METHOD.GET && params) {
        url += ('?' + qs.stringify(params));
    }
    if(method === METHOD.GET && cache){
        let back = cacheUrl(url);
        if(back){
           return new Promise((resolve, reject) => {
                resolve(JSON.parse(back));
            });
        }
    }
    if (!navigator.onLine){
        alert("Network exception, please link network and refresh");
        return;
    }
    let promise = fetch(url, options).then(checkRespStatus);
    promise.catch(()=>{
      loading(false);
    })
    return promise;
}
