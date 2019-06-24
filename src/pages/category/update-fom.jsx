import React, { Component } from 'react'
import {Form,Input} from 'antd'

class UpateForm extends Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    let form  = this.props.form;
    let category = this.props.category
    console.log(category.name)
    this.props.updateForm(form)
    return (
      <Form.Item>
          {getFieldDecorator('categoryName', {
            initialValue:category.name,
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