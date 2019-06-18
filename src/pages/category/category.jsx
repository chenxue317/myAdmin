import React, { Component } from 'react'
import { Card ,Table,Button,Icon,Modal} from 'antd';

import UpdateForm from './update-fom'
import LinkButton from '../../components/link-button'
import {reqCategorys,reqUpdateCategory} from '../../api'

/* const columns = [
  {
    width :'75%',
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    width :'25%',
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  },
]; */





export default class Category extends Component {
  state={
    parentId: '0', // 当前分类列表的parentId
    parentName: '', // 当前分类列表的父分类名称
    categorys: [], // 一级分类数组
    subCategorys: [], // 二级分类数组
    loading: false, // 是否显示loading界面
    visible:0
  }

  getCategorys = async () => {
    // 发请求前, 显示loading
    this.setState({ loading: true })
    const {parentId} = this.state
    /* 先收到请求的结果，是否成功 */
    const result = await reqCategorys(parentId)
    // 请求结束后, 隐藏loading
    this.setState({loading: false})
    //判断根据请求结果，分别改变一级数组和二级数组
    if (result.status===0) {
      // 得到的分类数组可能是一级的, 也可能是二级的
      const categorys = result.data
      if (parentId==='0') {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
      
    }
  }


/* 展示二级列表 */
  showSubCategorys=(category)=>{
    
    let parentId = category._id
    let parentName = category.name;
    this.setState({parentId,parentName},()=>{this.getCategorys()})

  }
/* 回退到一级列表 */
  showCategorys=()=>{
    this.setState({
      parentId: '0', // 当前分类列表的parentId
      parentName: '',
      subCategorys: [],
    })
  }

// /* 显示修改分类名称对话 */
  showUpdate=(category)=>{
    this.category = category
    this.setState({
      visible:1
    })
  }

/* 将表单组件form挂在到该组件身上 */
  updateForm  = (updateForm)=>{
    this.form = updateForm
  }

  handleOk=()=>{//首先校验传过来的数据
    this.form.validateFields((err, values) => {
      const categoryName = this.form.getFieldValue('categoryName')
      if (!err) {
        reqUpdateCategory(this.category._id,categoryName)
      }
    });
  }
  handleCancel = e => {
    this.setState({
      visible: 0,
    });
  };
    /* 初始化分类 */
initColumns = () => {
  this.columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width: 300,
      render: (category) => {// 参数为当前行的数据
        return (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {
              this.state.parentId === '0' && <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
            }
            
          </span>
        )
      }
    },
  ];
}
   componentWillMount(){//为第一次渲染做准备，初始化列表列数据
     this.initColumns()
   }
  componentDidMount(){//第一次渲染完成之后请求一级列表
    this.getCategorys('0')
    
  }
  render() {
    const { categorys,parentId,subCategorys,parentName} = this.state
    
    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={() => this.showCategorys()}>一级分类列表</LinkButton>
        <Icon type="arrow-right"></Icon>
        <span>{parentName}</span>
      </span>
    )
    return (
    <Card title={title} extra={
    (<Button type="primary">
      <Icon type="plus"></Icon> 
      添加</Button>)}>
       <Table
        rowKey="_id"
        columns={this.columns}
        dataSource={parentId==='0'?categorys:subCategorys}
        bordered
        pagination={
          {defaultPageSize:2,}
        }
      />
      <Modal
          title="更新分类"
          visible={this.state.visible===1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UpdateForm updateForm={this.updateForm}/>
        </Modal>
    </Card>
    )
  }
}
