import React from 'react'
import ReactDom from 'react-dom'
import App from './App.jsx'
import store from './redux/store'

//将store传递给app组件
ReactDom.render(<App store={store}/>,document.getElementById('root'))
store.subscribe(()=>ReactDom.render(<App store={store}/>,document.getElementById('root')))


