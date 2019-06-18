import ajax from './ajax'


/* 1. 登陆 */
export function reqLogin ({username,password}){
  return ajax('/login',{username,password},'POST')
}
/* login({username:'admin',password:'admin'}).then((result)=>{
  console.log(result)
}) */
/* 2. 添加用户 */

export function reqAddUser ({username,password,phone,email,role_id}){
  return ajax('/manage/user/add',{username,password,phone,email,role_id},'POST')
}
/* 测试代码 
addUser(
  {username:'admin',
  password:'admin',
  phone:'177885567',
  email:'22782455@qq.com',
  role_id:'aaaaaaxxxx'}
  ).then((result)=>{
    console.log(result)
  }) */