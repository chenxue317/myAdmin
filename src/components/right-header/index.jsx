import React, { Component } from 'react'
import './index.less'
export default class RightHead extends Component {
  render() {
    return (
      <div className="right-header">
        <div className="right-header-top">
          <span>欢迎admin</span>
          <a href="#1">登出</a>
        </div>
        <div className="right-header-bottom">
          <div className="right-header-bottom-left">
            <span>首页</span>
          </div>
          <div className="right-header-bottom-right">
            <span>{Date.now()}</span>
            <img src="http://api.map.baidu.com/images/weather/day/duoyun.png" alt="天气"/>
            <span>多云</span>
          </div>
        </div>
      </div>
    )
  }
}
