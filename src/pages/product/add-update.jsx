import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  Cascader,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategorys} from '../../api'
import  PicturesWall from './picturesWall '
import  RichTextEditor from './rich-text-editor'
import {reqAddOrUpdateProduct} from '../../api'


const { Item } = Form
const { TextArea } = Input;


/* 
商品的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {
  constructor(props){
    super(props)
    this.pwRef = React.createRef();
    this.richText = React.createRef();
  }
  state = {
    options:[],
  };

  submit=()=>{
    const {getImages} =this.pwRef.current
    const {getEditorValue} = this.richText.current
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
        const {name,desc,price,categoryIds} = values
        let  categoryId, pCategoryId
        if(categoryIds.length===1){
          categoryId=categoryIds[0]
          pCategoryId='0'
        }else{
          pCategoryId=categoryIds[0]
          categoryId=categoryIds[1]
        }
        let product = {
          name,
          desc,
          price,
          categoryId,
          pCategoryId,
          detail:getEditorValue(),
          imgs:getImages()
        }
        if(this.isUpdate){
          product._id = this.product._id
        }
        const result = await reqAddOrUpdateProduct(product)
        if(result.status===0){
          message.success((this.isUpdate?'更新':'添加')+'产品成功')
          this.props.history.goBack()
          /* message.success((this.isUpdate?'更新':'添加')+'产品成功') */
        } 

      }
      

    });
  }

  //点击一级列表，请求二级列表
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false;
    if(!subCategorys && subCategorys.length<0){
      targetOption.isLeaf = true;
    }
    targetOption.children=subCategorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: true,
    }))
    this.setState({
      options: [...this.state.options],
    });
    
  };

  getCategorys = async (parentId)=>{
    const result = await reqCategorys(parentId)
    const categorys = result.data
    if(result.status===0){
      if(parentId==='0') {
        this.initCategorys(categorys) 
      }else{
        return categorys
      }     
    }
  }

  //初始化列表
  initCategorys = async (categorys)=>{
    const { isUpdate, product } =this
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))
    
    if( isUpdate && product.pCategoryId!=='0'){
      const subCategorys = await this.getCategorys(product.pCategoryId)
      //利用pCategoryId找到父级的id,然后请求所对应父分类id的二级分类
      if( subCategorys&& subCategorys.length>0){
        const targetOption = options.find(option => option.value===product.pCategoryId)
        //然后加工以下对应的每个二级分类的属性
        targetOption.children = subCategorys.map(c => ({
          label: c.name,
          value: c._id,
          isLeaf: true
        }))
      }
      }
     //将所有的内容维护到状态中 
    this.setState({options})
  }

  
  componentWillMount(){//看是否是来修改的，初始化一般都是再这个函数中
    this.product = this.props.location.state || {}
    this.isUpdate = !!this.product._id
    
    
  }
  componentDidMount(){
    //上来首先加载一级列表，发送ajax请求
    this.getCategorys('0')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { isUpdate, product } = this
    let categoryIds= []
    if(product){
      const pCategoryId = product.pCategoryId
      const categoryId = product.categoryId
      if(pCategoryId==='0'){
        categoryIds=[categoryId]
      }else{
        categoryIds=[ pCategoryId, categoryId ]
      }
    }
    
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        {isUpdate?'更新商品':'添加商品'}
      </span>
    )

    // 指定form的item布局的对象
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form {...formLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  { required: true, message: '商品名称必须输入' }
                ]
              })(
                <Input placeholer='请输入商品名称' />
              )
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, message: '商品描述必须输入' }
                ]
              })(
                <TextArea placeholder="请输入商品描述" autosize />
              )
            }
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue:product.price,
                rules: [
                  { required: true, message: '商品价格必须输入' }
                ]
              })(
                <Input addonAfter="元" placeholder="请输入商品价格" />
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryIds', {
                initialValue:categoryIds,
                rules: [
                  { required: true, message: '商品分类必须输入' }
                ]
              })(
                <Cascader
                options={this.state.options}
                loadData={this.loadData}
                />
              )
            }
            
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.pwRef} product={product}/>
          </Item>
          <Item
            label="商品详情"
            wrapperCol= {{ span: 18 }}
          >
            <RichTextEditor ref={this.richText} product={product}/>
          </Item>
          <Button type='primary' onClick={this.submit}>提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)