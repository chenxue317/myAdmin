import React, { Component } from 'react'
import {Form,Input,Icon} from 'antd'

class UpateForm extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    let form  = this.props.form;
    this.props.updateForm(form)
    return (
      <Form.Item>
          {getFieldDecorator('updatcategoryname', {
            rules: [{ required: true, message: '请输入分类名' }],
          })(
            <Input
              placeholder="请输入分类名"
            />,
          )}
        </Form.Item>
    )
  }
}

export default  Form.create()(UpateForm)