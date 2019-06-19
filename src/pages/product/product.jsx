import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'


import Home from './home'
import AddUpdate from './add-update'
import Detail from './detail'
/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={Home}/>
        <Route exact path="/product/detail" component={Detail}/>
        <Route exact path="/product/addupdate" component={AddUpdate}/>
        <Redirect exact to='/product'/>
      </Switch>
    )
  }
}
