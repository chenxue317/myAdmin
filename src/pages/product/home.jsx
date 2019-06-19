import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd'
const {Option} = Select




export default class Home extends Component {
  state={
    products:[]
  }
  
  //初始列的函数
  initColumns = ()=>{
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        className: 'column-money',
        dataIndex: 'money',
      },
      {
        title: '价格',
        dataIndex: 'address',
      },
      {
        title: '状态',
        dataIndex: 'address',
        render:
      },
      {
        title: '操作',
        dataIndex: 'address',
        render:
      }
    ];
  }


  componentWillMount(){
    this.initColumns()
  }

  render() {
    const {products} = this.state
    const title = (
      <span>
        <Select value="1" style={{width:150}}>
          <Option value="1">按照名称搜索</Option>
          <Option value="2">按照描述搜索</Option>
        </Select>
        <Input placeholder="关键字" style={{width:150,margin:'0px 15px'}}/>
        <Button type="primary">搜索</Button>
      </span>
    )
    const extra = (
      <span>
        <Button type="primary">
          <Icon type="plus"/>
          添加商品
        </Button>
      </span>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey="_id"
          columns={this.columns}
          dataSource={products}
          bordered
          pagination={
            {defaultPageSize:5,showQuickJumper:true}
        }
        />
      </Card>
    )
  }
}
