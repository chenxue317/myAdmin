import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'
const {Item} = Form
 class CreateRole extends Component {
  static propTypes = {
    getForm:PropTypes.func.isRequired
  } 
  render() {
    const { getFieldDecorator } = this.props.form;
    const {getForm,form} = this.props
    getForm(form)
    const formItemLayout = {
      labelCol: {span: 2 },
      wrapperCol: {span: 16 },
    };
    return (
      <Form>
        <Item label="角色名称" {...formItemLayout}> 
        {getFieldDecorator('roleName', {
            rules: [{ required: true, message: '请输入角色名' }],
          })(
            <Input placeholder="请输入角色名" style={{marginLeft:10}}/>,
          )}
        </Item>
      </Form>
    )
  }
}
export default Form.create()(CreateRole)
