import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

/* 1. 登陆 */
export function reqLogin ({username,password}){
  return ajax('/login',{username,password},'POST')
}

/* 2. 添加用户 */

export function reqAddUser ({username,password,phone,email,role_id}){
  return ajax('/manage/user/add',{username,password,phone,email,role_id},'POST')
}

/* 3、获取分类列表 */
export function reqCategorys(parentId){
  return ajax('/manage/category/list',{parentId},'GET')
}
/* 4.更新分类 */
export function reqUpdateCategory(categoryId ,categoryName){
  return ajax('/manage/category/update',{categoryId ,categoryName},'POST')
}
/* 5、添加分类 */
export function reqAddCategory(parentId ,categoryName){
  return ajax('/manage/category/add',{parentId ,categoryName},'POST')
}


/* 请求天气  利用jsonp库*/

export const reqWeather = (location) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

  return new Promise((resolve, reject) => {
    // 执行请求
    setTimeout(() => {
      jsonp(url, {}, (error, data) => {
        if (!error && data.status === 'success') {
          const {
            dayPictureUrl,
            weather
          } = data.results[0].weather_data[0]
          // 成功了, 调用reolve()指定成功的值
          resolve(
            {dayPictureUrl,
            weather}
          )
        } else {
          message.error('获取天气信息失败!')
        }
      })
    })
  })
  
}

