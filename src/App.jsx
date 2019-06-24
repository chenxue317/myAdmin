import React,{Component} from "react";
import {inCrement,deCrement} from './redux/actions'
export default class App extends Component{
  constructor(props){
    super(props)
    this.myRef = React.createRef()
  }
  test1=()=>{
    const number = this.myRef.current.value*1
    this.props.store.dispatch(inCrement(number))
  }
  test2=()=>{
    const number = this.myRef.current.value*1
    this.props.store.dispatch(deCrement(number))
  }
  test3=()=>{
    if(this.props.store.getState()%2===1){
      const number = this.myRef.current.value*1
      this.props.store.dispatch(inCrement(number))
    }
  }
  test4=()=>{
    setTimeout(()=>{
      const number = this.myRef.current.value*1
      this.props.store.dispatch(inCrement(number))
    },1000)
   
  }
  render(){
    const count = this.props.store.getState()
    
    return(
    <div>
      <p>click{count}times</p>
      <span>
        <select ref={this.myRef}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <button onClick={this.test1}>+</button>
        <button onClick={this.test2}>-</button>
        <button onClick={this.test3}>increment if odd</button>
        <button onClick={this.test4}>incrementAsync</button>
      </span>
    </div>
    )
  }
}