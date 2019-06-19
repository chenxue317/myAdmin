import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import {withRouter,Link} from 'react-router-dom'
import './index.less'
import logo from '../../asset/images/timg.jpg'
import menuList from '../../config/config'
const { SubMenu}  = Menu;

class LeftNav extends Component {
  /* 包装配置数据为标签 */
  getMenuNodes = (menu)=>{
    const path = this.props.location.pathname
    return menu.map(item => {
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
        const cItem = item.children.find((cItem) =>cItem.key===path)
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
      
    })
  }
  
  render() {
    const menu=this.getMenuNodes(menuList)
    const path = this.props.location.pathname;
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