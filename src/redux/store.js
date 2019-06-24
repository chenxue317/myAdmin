import {createStore} from 'redux'
import {counter} from './reducer'
//创建一个store对象，并暴露出去
export default createStore(counter)