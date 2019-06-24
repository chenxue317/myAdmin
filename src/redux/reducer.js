import { INCREMENT, DECREMENT } from './action-types'
//reducer函数，传两个参数state，action，该函数的作用，就是利
const initCount = 1
export const counter = (state = initCount,action)=>{
  switch (action.type) {
    case INCREMENT://
      return  state+action.count
    case DECREMENT:
      return state-action.count
    default:// 一般都是第一次进行页面渲染的时候才用到
      return state
  }
}