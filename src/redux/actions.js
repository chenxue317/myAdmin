import {INCREMENT,DECREMENT} from './action-types'
/* 创建action  increment 本质是个函数，返回一个action对象
  action对象有两个属性，type，以及真正的数据*/
export const inCrement = (number) => ({type:INCREMENT,count:number})
export const deCrement = (number) => ({type:DECREMENT,count:number})