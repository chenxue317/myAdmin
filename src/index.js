import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import{getStorage,setStorage} from './utils/storageUtils'
/* 浏览器一加载就将localStorage中的key以及value写入到user中
 */
let user = getStorage();
setStorage(user)

ReactDom.render(<App/>,document.getElementById('root'))


