import React, { Component } from 'react'
import {
  Card,
  Table,
  Button,
  Modal,
  message
} from 'antd'


import { reqUsers, reqRoles, reqAdd_User, reqUpdate_User, reqDeleteUser } from '../../api'
import {formateDate} from '../../utils/dateUtils'
import CreateUser from './creat_user'
import memoryUtils from '../../utils/memoryUtils'

import LinkButton from '../../components/link-button'
/**
 * 角色管理
 */


const { confirm } = Modal;

export default class User extends Component {
  state = {
    users:[],
    isShowCreat:false,
    isShowUpdate:false,
  }
  //设置权限容器
 
  initRoleList= async()=>{
   
    
    //发送请求--请求角色列表
    const result  = await reqUsers()
    if(result.status===0){
      const users = result.data.users;
      this.setState({users})
    }
  }

  //得到子组件的form
  getForm = (form)=>{
    this.form = form
  }
  //添加角色界面显示
  addUserOk=()=>{
    //进行表单验证
    this.form.validateFields(async (err, user) => {
      if (!err) {
        const result = await reqAdd_User(user)
        if(result.status===0){
          this.initRoleList()
          this.setState({isShowCreat:false})
        }
      }
    });
  }
  //添加角色界面
  addUser=()=> {
    this.user = {}
    this.setState({isShowCreat:true})
  }
  //
  addUserCancel=()=> this.setState({isShowCreat:false})
  //修改用户
  updateUser = (user) =>{
    this.setState({isShowUpdate:true})
    this.user= user
  }
  updateUserOk=()=>{
    console.log(1)
    this.form.validateFields(async (err, user) => {
      if (!err) {
        user._id = this.user._id
        const result = await reqUpdate_User(user)
        if(result.status===0){
          this.initRoleList()
          this.setState({isShowUpdate:false})
        }
      }
    });

  }
  updateUserCancel=()=> this.setState({isShowUpdate:false})
 


  async componentWillMount(){
    const  roles = await reqRoles()
    this.roles = roles.data
    const showConfirm = (user)=> {
      confirm({
        title: '是否要删除该用户',
         onOk : async ()=> {
          const userId = user._id
          const result = await reqDeleteUser(userId)
          if(result.status===0){
            message.success('删除用户成功')
            this.initRoleList()
          }
          console.log('OK');
        },
        onCancel() {
         
        },
      });
    }
    this.columns = [
      {
        title: '角色名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
       
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (create_time)=>formateDate(create_time)
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(role_id)=>(
         <span>{ this.roles.find(item => item._id===role_id).name}</span>
        )
        
      },
      {
        title: '操作',
        render: (user)=>(<span>
          <LinkButton onClick={()=>this.updateUser(user)}>修改</LinkButton>
          <LinkButton onClick={()=>showConfirm(user)}>删除</LinkButton>
        </span>)
      },
    ];
    
    this.initRoleList()
  }
  
  render() {
    const { users, isShowCreat, isShowUpdate } = this.state
    const title = (
      <span>
        <Button type="primary" style={{margin:10}} onClick={this.addUser}>创建用户</Button>
      </span>
    )
    
    
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          pagination={
          {defaultPageSize:2}
          }
          columns={this.columns}
          dataSource={users} />
          <Modal
          
          title='添加用户'
          visible={isShowCreat}
          onOk={this.addUserOk}
          onCancel={this.addUserCancel}
          >
          <CreateUser getForm={this.getForm} roles={this.roles} />
          </Modal>
          <Modal
          title="修改用户"
          visible={isShowUpdate}
          onOk={this.updateUserOk}
          onCancel={this.updateUserCancel}
          >
          <CreateUser getForm={this.getForm}  roles={this.roles} user={this.user}/>
          </Modal>
          
      </Card>
    )
  }
}
