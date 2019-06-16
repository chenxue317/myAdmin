import React,{Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import logo from './images/timg.jpg'
import './css/login.less'
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    /* 统一校验 
    (
      [fieldNames: string[]],
      [options: object],
      callback(errors, values)
    ) => void
    */
    this.props.form.validateFields((err, values) => {
      if (!err) {
       console.log('验证通过，发送ajax请求');
      }
    });
    /* { required: true, message: '请输入密码' },
                  { min: 4, message: '密码长度不能小于4位'},
                  { max: 12, message: '密码长度不能大于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'密码必须为字母，数字，下划线'} */
 
  };
  validator=(rule, value="", callback)=>{
    value = value.trim()
    if(!value){
      callback('请输入密码')
    }else if(value.length<4){
      callback('密码长度不能小于4位')
    }else if(value.length>12){
      callback('密码长度不能大于12位')
    }else if(/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须为字母，数字，下划线')
    }else{
      callback()
    }

  }

  render() {
  
  const { getFieldDecorator } = this.props.form;
  return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username',{
              rules:[
                { required: true, message: '请输入用户名' },
                { min: 4, message: '用户名长度不能小于4位'},
                { max: 12, message: '用户名长度不能大于12位'},
                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须为字母，数字，下划线'}
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
            )}
           
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password',{
              
                rules:[
                  { required: true, message: '请输入密码' },
                  { min: 4, message: '密码长度不能小于4位'},
                  { max: 12, message: '密码长度不能大于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'密码必须为字母，数字，下划线'}
                ]
              
            })(
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
              />
            )}
            
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
        </section>
      
      </div>
  )
  }
  };
  export default Form.create()(Login);
  /* export default  WrappedNormalLoginForm; */
