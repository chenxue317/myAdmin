import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import {withRouter,Link} from 'react-router-dom'
import './index.less'
import logo from '../../asset/images/timg.jpg'
import menuList from '../../config/config'
import memoryUtils from '../../utils/memoryUtils.js'
const { SubMenu}  = Menu;

class LeftNav extends Component {
  /* 包装配置数据为标签 */
  getMenuNodes = (menu)=>{
    const path = this.props.location.pathname
    return menu.map(item => {
      if (this.hasAuth(item)) {
        if(!item.children){
          return(
           <Menu.Item key={item.key}>
             <Link to={item.key}>
               <Icon type={item.icon} />
               <span>{item.title}</span>
             </Link>
           </Menu.Item>
         )
       }else{
         const cItem = item.children.find((cItem) =>path.indexOf(cItem.key)===0)
         if (cItem) { // 当前请求的是某个二级菜单路由
           this.openKey = item.key
         }
         return(
           <SubMenu
               key={item.key}
               title={
                 <span>
                   <Icon type={item.icon} />
                   <span>{item.title}</span>
                 </span>
               }
             >
               {this.getMenuNodes(item.children)}
             
             </SubMenu>
         )
             
           
           
         
       }
      }
      
      
    })
  }
  hasAuth=(item)=>{
    const user = memoryUtils.user
    if (user.username === 'admin' || item.isPublic || user.role.menus.indexOf(item.key) !== -1) {
      return true
    } else if (item.children) {
      // 4. 如果有item的子节点的权限, 当前item就得存在
      const cItem = item.children.find(cItem => user.role.menus.indexOf(cItem.key) !== -1)
      if (cItem) {
        return true
      }
    }

    return false
    
  }

  
  render() {
    const menu=this.getMenuNodes(menuList)
    let path = this.props.location.pathname;
    if(path.indexOf('/product')===0){
      path='/product'
    }
    const openkey = this.openKey
    return (
      <div className="leftNav">
        <header className="header">
          <img src={logo} alt=""/>
          <h1>管理系统</h1>
        </header>
        
       <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openkey]}
        >
          {menu}
        </Menu>
      </div>
    )
  }
}
export default  withRouter(LeftNav)