import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'

import {reqProduct} from '../../api'
import LinkBtn from '../../components/link-button'



export default class Detail extends Component {
  state={
    cName1:'',
    cName2:''
  }
  getProduct=async ()=>{
    /* 当pCategoryId为0，存到cname1中请求一次即可，
      当pCategoryId不为0，发送两次请求，分别请求父分类，和子分类，维护到状态中categoryId */
    const { pCategoryId, categoryId } = this.props.location.state.product
    if(pCategoryId==='0'){
      let result = await reqProduct(categoryId)
      if(result.status===0){
        this.setState({cName1:result.data.name})
      }
    }else{
      let results = await Promise.all ([ reqProduct(pCategoryId), reqProduct(categoryId)])
      const cName1= results[0].data.name
      const cName2= results[1].data.name
      this.setState({ cName1, cName2 })
    }
  }  
  componentDidMount(){
    this.getProduct()
  }
  
  render() {
    const { name, desc, price, imgs, detail } = this.props.location.state.product
    const {  cName1, cName2 } = this.state
    const title = (
      <span>
        <LinkBtn onClick={()=> this.props.history.goBack()}>
          <Icon 
           type="arrow-left" 
           style={{fontSize:20}} 
          />
        </LinkBtn>
        <span style={{marginLeft:10, fontSize:20}}>商品详情</span>
      </span>
    )
    const arrow = (
      <span>--></span>
    )
    return (
      <Card title={title}>
        <List size="large" className="detailList">
          <List.Item>
            <span className="detailItem">商品名称:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item>
            <span className="detailItem">商品描述:</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item>
            <span className="detailItem">商品价格:</span>
            <span>{price}</span>
          </List.Item>
          <List.Item>
            <span className="detailItem">所属分类:</span>
            <span>{cName1}</span>
              {cName2?arrow:true}
            <span>{cName2}</span>
          </List.Item>
          <List.Item>
            <span className="detailItem">商品图片:</span>
            {imgs.map(img => <img src={`http://localhost:5000/upload/${img}`} style={{width:100,margin:'0 15px'}}  alt="图片"/>)}
          </List.Item>
          <List.Item>
            <span className="detailItem">商品详情:</span>
            <span dangerouslySetInnerHTML={{__html: detail}} ></span>
          </List.Item>

        </List>
      </Card>
    )
  }
}
