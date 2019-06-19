import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqProducts, reqSearch,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constant'

const {Option} = Select



export default class Home extends Component {
  state={
    products:[],
    total:0,
    searchType:"productName",
    searchContent:'',
    loading:false,
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
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>(<span>￥{price}</span>)
      },
      {
        title: '状态',
        width:100,
        render:(product)=> {
          const {status, _id} = product
          const btnText = status===1 ? '下架' : '上架'
          const text = status===1 ? '在售' : '已下架'
            return (
              <span>
                <Button 
                  type="primary" 
                  onClick={()=>this.updateStatus(_id,status === 1 ? 2 : 1)}
                >{btnText}</Button>
                <span>{text}</span>
              </span>
            )
        }
      },
      {
        title: '操作',
        width:100,
        dataIndex: 'address',
        render: ()=>(
         <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
         </span>
        )
      }
    ];
  }
  //获取商品列表
  getProducts=async (page)=>{
    this.setState({
      loading:true
    })
    const pageNum = page
    const {searchType,searchContent} = this.state
    let result 
    if(!searchContent){
      result = await reqProducts({pageNum,pageSize:PAGE_SIZE})
    }else{
      result = await reqSearch({ pageNum,pageSize:PAGE_SIZE,searchType,searchContent})
    }
   
    this.setState({
      loading:false
    })
    if(result.status===0){//请求成功，更新products
      this.setState({
        products : result.data.list,
        total: result.data.total
      })
    }
  }
  //获取搜索的商品列表
/*   getSearchProducts= async ()=>{
    const {searchType,searchContent} = this.state
    if(!searchContent){
      this.getProducts(this.page)
    }else{
      const result = await reqSearch({ pageNum:this.page||1,pageSize:PAGE_SIZE,searchType,searchContent})
      if(result.status===0){
        this.setState({
          total:result.data.total,
          products:result.data.list,
        })
      }
    }
    
  }  */
  //更新商品上架状态
  updateStatus=async(productId,status)=>{//首先改变状态，然后改变显示的在售和已下架
    const result = await reqUpdateStatus({productId, status})
    if (result.status===0) {
      message.success('更新状态成功')
      // 重新获取当前页显示
      this.getProducts(this.pageNum)
    }
  }

  componentWillMount(){
    this.initColumns()
  }
  componentDidMount(){
    this.getProducts(1)
  }

  render() {
    const {products,total,searchType,loading} = this.state
    const title = (
      <span>
        <Select 
          value={searchType} 
          style={{width:150}}
          onChange= {value => this.setState({searchType:value})}
        >
          <Option value="productName">按照名称搜索</Option>
          <Option value="productDesc">按照描述搜索</Option>
        </Select>
        <Input 
          placeholder="关键字" 
          style={{width:150,margin:'0px 15px'}}
          onChange={e=>this.setState({searchContent:e.target.value})}
        />
        <Button type="primary" onClick={()=>{this.getProducts(1)}}>搜索</Button>
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
          loading={loading}
          rowKey="_id"
          columns={this.columns}
          dataSource={products}
          bordered
          pagination={
            {defaultPageSize:PAGE_SIZE,
             showQuickJumper:true,
             total:total,
             onChange:this.getProducts
            }
        }
        />
      </Card>
    )
  }
}
