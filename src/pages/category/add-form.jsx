import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form,Input,Icon,Select} from 'antd'

class AddForm extends Component {
  static propTypes= {
    parentId: PropTypes.string.isRequired,
    categorys:PropTypes.array.isRequired,
    addForm:PropTypes.func.isRequired,
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {parentId,categorys,addForm} = this.props;
    console.log(categorys)
    let form  = this.props.form;
    addForm(form)
    return (
     <Form>
        <Form.Item>
          {getFieldDecorator('parentId', {
            initialValue:parentId,
            rules: [{ required: true, message: '请输入分类名' }],
          })(
            <Select>
              <Select.Option value="0">一级分类列表</Select.Option>
              {categorys.map(c =>  <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('categoryName', {
          initialValue:'',
          rules: [{ required: true, message: '请输入分类名' }],
        })(
          <Input
            placeholder="请输入分类名"
          />,
        )}
      </Form.Item>
     </Form>
    )
  }
}

export default  Form.create()(AddForm)