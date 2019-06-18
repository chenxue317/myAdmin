/* 此模块用来读取/保存/移除localstorage中的数据 

*/
import memoryUtils from './memoryUtils'
export function setStorage(user) {
  memoryUtils.user = user
  localStorage.setItem('userkey',JSON.stringify(user))
}

export function getStorage(){
  return JSON.parse(localStorage.getItem('userkey'))
}
