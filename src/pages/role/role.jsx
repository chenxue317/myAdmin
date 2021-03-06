import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Modal,
  message
} from 'antd'


import { reqRoles, reqRoleAdd, reqRoleUpdate } from '../../api'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import CreateRole from './creat_role'
import SetAuth from './set_auth'
import LinkButton from '../../components/link-button'
/**
 * 角色管理
 */



export default class Role extends Component {
  state = {
    roles:[],
    isShowCreat:false,
    isShowAuth:false,
  }
  //设置权限容器
  authRef = React.createRef()
 
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
      {
        title: '操作',
        render:(role)=> <LinkButton onClick={()=>this.authRole(role)}>设置权限</LinkButton>
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
  authRole=(role)=>{
    this.setState({isShowAuth:true})
    this.role = role
  }
  //点击设置角色权限确定按钮
  authhandleOk=async()=>{
    this.setState({isShowAuth:false})
    const menus = this.authRef.current.getAllChecked()
    const role = this.role
    role.menus = menus
    role.auth_time=Date.now()
    role.auth_name=memoryUtils.user.username
    const result = await reqRoleUpdate(role)
    if(result.status===0){
      message.success('设置权限成功')
      this.initRoleList()
    }
  }
  authhandleCancel=()=>this.setState({isShowAuth:false})

 


  componentWillMount(){
    this.initRoleList()
  }
  
  render() {
    const { roles, isShowCreat, isShowAuth } = this.state
    
    const title = (
      <span>
        <Button type="primary" style={{margin:10}} onClick={this.creatRole}>创建用户</Button>
      </span>
    )
    
   
    
    return (
      <Card title={title}>
        <Table
          bordered
          pagination={
          {defaultPageSize:2}
          }
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
           <SetAuth role = {this.role} ref={this.authRef}/>
          </Modal>
      </Card>
    )
  }
}
