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
/* 6、获取商品分页列表 */
export const reqProducts = ({pageNum,pageSize})=> ajax('/manage/product/list',{pageNum,pageSize})

/* 7、根据ID/Name搜索产品分页列表 */
export const reqSearch = ({ pageNum,pageSize,searchType,searchContent})=>ajax('/manage/product/search',{
  pageNum,
  pageSize,
  /* productName, productDesc */
  [searchType]:searchContent
  }
)
/* 8、对商品上下架进行更新 */
export const reqUpdateStatus = ({productId,status})=>ajax('/manage/product/updateStatus',{productId,status},'POST')

/* 9、根据分类ID获取分类 */

export const reqProduct = (categoryId)=>ajax('/manage/category/info',{categoryId})

/* 10、更新商品 */
export const reqAddOrUpdateProduct = (product)=>ajax('/manage/product/'+(product._id?'update':'add'),product,'POST')

/* 11、获取角色列表 */

export const reqRoles = ()=>ajax('/manage/role/list')
/* 12、添加角色 */
export const reqRoleAdd = (roleName)=>ajax('/manage/role/add',{roleName},'POST')
/* 13、更新角色 */
export const reqRoleUpdate = ({ _id, menus, auth_time, auth_name })=>ajax('/manage/role/update',{ _id, menus, auth_time, auth_name },'POST')
/* 14、获取所有用户列表 */
export const reqUsers = ()=> ajax('/manage/user/list')
//15、添加用户
export const reqAdd_User = ({username, password, phone, email, role_id}) => ajax('/manage/user/add',{username, password, phone, email, role_id},'POST')
//更新用户

export const reqUpdate_User = ({username, _id, phone, email, role_id}) => ajax('manage/user/update',{username, _id, phone, email, role_id},'POST')
//删除用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete',{userId},'POST')


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

