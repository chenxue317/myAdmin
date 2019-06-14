import React,{Component} from 'react';
import logo from './images/logo.png'
import './css/login.less'
export default class Login extends Component {
render() {
return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-content">
        
        <h2>用户登陆</h2>
        <div>form表单</div>
      </section>
    
    </div>
)
}
};
