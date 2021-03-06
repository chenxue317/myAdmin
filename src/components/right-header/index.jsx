import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import LinkBtn from '../link-button'
import menuList  from '../../config/config'
import {removeStorage} from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import './index.less'
class RightHead extends Component {
  state={
    currentTime:''
    
  }

  /* 获取天气 */
  getWeather = async()=>{
    const {dayPictureUrl,weather} = await reqWeather('北京');
    this.weather = weather;
    this.dayPictureUrl=dayPictureUrl
  }
  /* 更换头部标题文本 */
  getShowText= ()=>{
    const path = this.props.location.pathname;
    let text = '';
    /* 匹配path */
    menuList.forEach((item)=>{
      if(item.key===path){
        text =item.title;
      }else if(item.children){
        //当是二级路由的时候，当点击三级路由，只要二级路由能同三级路由前半部分
        //匹配，则直接显示二级路由的文字即可
        let cItem= item.children.find(cItem =>path.indexOf(cItem.key)===0)
        if(cItem){
          text = cItem.title
        }
      }
    })
    return text
  }
  /* 登出 */
  checkOut = ()=>{
    /* 清除location的用户名，清除memory中的用户名，跳转到login */
    memoryUtils.user={};
    removeStorage();
    this.props.history.replace('/login')
  }

  componentDidMount(){
    /* 获取时间 */
    setInterval(()=>{
      const  currentTime = formateDate(Date.now())
      this.setState({
        currentTime
      })
    },1000)
    /* 获取天气 */
    this.getWeather()
  }
  render() {
    const {currentTime} = this.state;
    const showText = this.getShowText();
    const username = memoryUtils.user.username;
    const weather =(
      <span>
        
        <img src={this.dayPictureUrl} alt="天气"/>
        <span>{this.weather}</span>
      </span>
    ) ;
    return (
      <div className="right-header">
        <div className="right-header-top">
          <span>欢迎{username}</span>
          <LinkBtn onClick={this.checkOut}>登出</LinkBtn>
        </div>
        <div className="right-header-bottom">
          <div className="right-header-bottom-left">
            <span>{showText}</span>
          </div>
          <div className="right-header-bottom-right">
            <span>{currentTime}</span>
            {this.dayPictureUrl && weather}
          </div>
        </div>
      </div>
    )
  }
}
export default  withRouter(RightHead)