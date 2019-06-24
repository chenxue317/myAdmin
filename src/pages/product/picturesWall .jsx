import React from 'react'
import { Upload, Icon, Modal } from 'antd';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

 export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  getImages=()=>{
    const {fileList} = this.state;
    const imgs=fileList.map(c=>c.name)
    return imgs
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({ fileList, file }) => {
    
    if(file.status==='done'){
      const {data} = file.response
      console.log(data)
      fileList[fileList.length-1].name = data.name
      fileList[fileList.length-1].url = 'http://localhost:5000/upload/'+ data.name
    }
    this.setState({ fileList })
  };
  componentWillMount(){
   const product = this.props.product
   const imgs = product.imgs || []
   if(imgs.length>0){
     const fileList = imgs.map((img,index)=>({
        uid:-index+'',
        name:img,
        url :'http://localhost:5000/upload/'+img
     }))
     this.setState({
      fileList
     })
   }
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name='image'
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
