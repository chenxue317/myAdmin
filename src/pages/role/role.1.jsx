import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Modal
} from 'antd'


import { reqRoles, reqRoleAdd, reqRoleUpdate } from '../../api'
import {formateDate} from '../../utils/dateUtils'
import CreateRole from './creat_role'
import SetAuth from './set_auth'
/**
 * 角色管理
 */



export default class Role extends Component {
  state = {
    roles:[],
    isShowCreat:false,
    isShowAuth:false,
    selectedRowKeys:[],
  }
 
  creatRole=()=>{
    //弹出对话框
    this.setState({isShowCreat:true})
  }
  initRoleList= async()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time)=>formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time)=>formateDate(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
    ];
    
    
    //发送请求--请求角色列表
    const result  = await reqRoles()
    if(result.status===0){
      const roles = result.data;
      this.setState({roles})
    }
  }

  //得到子组件的form
  getForm = (form)=>{
    this.form = form
  }
  //添加角色界面显示
  addhandleOk=()=>{
    //进行表单验证
    this.form.validateFields(async (err, role) => {
      if (!err) {
        const {roleName} = role
        const result = await reqRoleAdd(roleName)
        const {roles} = this.state
        if(result.status===0){
          const addRole = result.data
          roles.push(addRole)
          this.setState({roles,isShowCreat:false})
        }
      }
    });
  }
  //添加角色界面关闭
  addhandleCancel=()=> this.setState({isShowCreat:false})
  //设置角色权限
  authRole=()=>{
    this.setState({isShowAuth:true})
  }
  authhandleCancel=()=>this.setState({isShowAuth:false})

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  onSelect = (selected)=>{
    this.role = selected;
    console.log(this.role)
  }


  componentWillMount(){
    this.initRoleList()
  }
  
  render() {
    const { roles, isShowCreat, selectedRowKeys, isShowAuth } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections:'true',
      type: 'radio',
      onSelect:this.onSelect
      
    }
    console.log(selectedRowKeys)
    const hasSelected = selectedRowKeys.length > 0;
    const title = (
      <span>
        <Button type="primary" style={{margin:10}} onClick={this.creatRole}>创建用户</Button>
        <Button type="primary"  disabled={!hasSelected} onClick={this.authRole} >
          设置用户权限
        </Button>
      </span>
    )
    
   
    
    return (
      <Card title={title}>
        <Table
          bordered
          pagination={
          {defaultPageSize:2}
          }
          rowSelection={ rowSelection } 
          columns={this.columns}
          dataSource={roles} />
          <Modal
          title="添加角色"
          visible={isShowCreat}
          onOk={this.addhandleOk}
          onCancel={this.addhandleCancel}
          >
           <CreateRole getForm={this.getForm}/> 
          </Modal>
          <Modal
          title="设置权限"
          visible={isShowAuth}
          onOk={this.authhandleOk}
          onCancel={this.authhandleCancel}
          >
           <SetAuth role = {this.role}/>
          </Modal>
      </Card>
    )
  }
}
