import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd';
import PropTypes from 'prop-types'

import menueList from '../../config/config'

const {Item} = Form
const { TreeNode } = Tree;

export default class SetAuth extends Component {
  static propTypes={
    role : PropTypes.object
  }
  constructor (props) {
    super(props)
    // 读取当前角色的权限
    const menus = this.props.role.menus
    // 初始化状态
    this.state = {
      checkedKeys: menus
    }
  }
  //获取所有选中的节点
  getAllChecked=()=>{
    return this.state.checkedKeys
  }
  //初始化树节点
  initTreeNodes = (menueList)=>{
    return menueList.reduce((pre,item)=>{
      pre.push(<TreeNode title={item.title} key={item.key}>
        {item.children?this.initTreeNodes(item.children):null}
      </TreeNode>)
      return pre
    },[])
  }
  //点击复选框，触发逻辑
  onCheck = (checkedKeys)=>{
    this.setState({checkedKeys})
  }

  componentWillMount(){
    this.treeNodes = this.initTreeNodes(menueList)
  }
  componentWillReceiveProps(props){
    const {role} = props
    this.setState({checkedKeys:role.menus})
  }
  render() {
    const formItemLayout = {
      labelCol: {span: 4 },
      wrapperCol: {span: 16 },
    };
    const {role} = this.props
    return (
      <Form>
        <Item label="角色名称" {...formItemLayout}> 
          <Input value={role.name} style={{marginLeft:10}} disabled/>,
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={this.state.checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台管理">
            
            {this.treeNodes}
          </TreeNode>
          
        </Tree>
      </Form>
    )
  }
}  
