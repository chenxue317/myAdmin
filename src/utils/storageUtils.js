/* 此模块用来读取/保存/移除localstorage中的数据 

*/
/* import memoryUtils from './memoryUtils'
export function setStorage(user) {
  memoryUtils.user = user
  localStorage.setItem('userkey',JSON.stringify(user))
}

export function getStorage(){
  return JSON.parse(localStorage.getItem('userkey'))
}
export function removeStorage(){
  return JSON.parse(localStorage.removeItem('userkey'))
} */

import store from 'store'

/* 
用来进行local数据存储的工具模块
*/

/* export default {
  saveUser (user) {

  },

  getUser () {
    return user对象
  }
} */

/* 
保存user
*/
export function setStorage(user) {
  // localStorage.setItem('USER-KEY', JSON.stringify(user))
  store.set('USER-KEY', user)
}

/* 
读取保存的user
*/
export function getStorage() {
  // return JSON.parse(localStorage.getItem('USER-KEY') || '{}')
  return store.get('USER-KEY') || {}
}

/* 
删除保存的user
*/
export function removeStorage() {
  store.remove('USER-KEY')
}