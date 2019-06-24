import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Select
} from 'antd'

const {Item} = Form
const {Option} = Select
 class CreateRole extends Component {
  static propTypes = {
    getForm:PropTypes.func.isRequired,
    roles:PropTypes.array.isRequired,
    user:PropTypes.object
  } 
  render() {
    const { getFieldDecorator } = this.props.form;
    const { getForm, form, roles} = this.props
    const user = this.props.user || {}
    getForm(form)
    const formItemLayout = {
      labelCol: {span: 4 },
      wrapperCol: {span: 16 },
    };
    const options=(
      roles.map(item =><Option key={item._id} value={item._id}>{item.name}</Option>)
    )
    return (
      <Form {...formItemLayout}>
        <Item label="用户名" > 
        {getFieldDecorator('username', {
            initialValue:user.username,
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input placeholder="请输入用户名" />,
          )}
        </Item>
        {
          user._id? null:(
            <Item label="密码"> 
        
            {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input placeholder="请输入密码" />
                
              )}
            </Item>
          )
        }
        
        <Item label="邮箱"> 
        {getFieldDecorator('email', {
          initialValue:user.email,
        })(
            <Input placeholder="请输入邮箱" />,
          )}
        </Item>
        <Item label="手机号"> 
        {getFieldDecorator('phone', {
            initialValue:user.phone,
            rules: [{ required: true, message: '请输入手机号' }],
          })(
            <Input placeholder='请输入手机号'/>,
          )}
        </Item>
        <Item label="角色"> 
        {getFieldDecorator('role_id', {
            initialValue:user.role_id,
            rules: [{ required: true, message: '请输入角色名' }],
          })(
            <Select>
              {options}
            </Select>
          )}
        </Item>
      </Form>
    )
  }
}
export default Form.create()(CreateRole)
