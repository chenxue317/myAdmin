import React,{Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'
import memoryUtils from '../../utils/memoryUtils.js'
import LeftNav from '../../components/left-nav'
import RightHead from '../../components/right-header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component {
render() {
  if(!memoryUtils.user._id){
    return <Redirect to='/login'/>
  }
  return (
    
      <div style={{height:'100%'}}>
        <Layout style={{height:'100%'}}>
        <Sider>
          {/* 渲染一个左边的组件 */}
          <LeftNav/>
        </Sider>
        <Layout>
          <Header style={{backgroundColor:"#fff",height: "80px"}}>
            <RightHead/>
          </Header>
          <Content style={{margin:"30px",backgroundColor:"#fff"}}>
            {/* 注册路由 */}
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign:"center",color:"#aaa"}}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
      </div>
    
  )
}
};
