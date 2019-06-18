import axios from 'axios'
export default function ajax(url,data,method){
  return new Promise((resolve,reject)=>{
    /* 发送ajax请求 */
    let promise
      if(method==='GET'){
        promise = axios.get(url,{
          params:data
        })
      }else{
        promise = axios.post(url,data)
      }
      promise.then(
        response => resolve(response.data),
        error => {alert('请求错误',error.message)}
      )
  })
}
/* ajax('http://localhost:3000/login',{username:'admin',password:'admin'},'POST').then((res)=>{
  console.log(res)
}) */