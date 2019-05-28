import axios from '../http'
import {message} from 'antd'
// 初始化state
let initState = {
  list:[],
  loading:false,
  visible:false
}
// action generator
//  同步action
export function showModal(){
  return {type:"SHOW_MODAL"}
}
export function closeModal(){
  return {type:"CLOSE_MODAL"}
}
export function beginLoading(){
  return { type:"BEGIN_LOADING" }
}
// 重载课程信息,异步
export function reloadCourse(){
  return function(dispatch){
    // 启动加载 
    dispatch(beginLoading())
    axios.get("/course/findAllWithTeacher")
    .then((result)=>{
      dispatch({ type:"RELOAD_COURSE", payload:result.data })
    })
  }
}

export function deleteCourse(id){
  return function(dispatch){
    axios.get("/course/deleteById",{
      params:{id}
    })
    .then(({statusText})=>{
      message.success(statusText);
      // 分发动作重新加载
      dispatch(reloadCourse())
    })
  }
}


// reducer
function courseReducer(state=initState,action){
  switch(action.type){
    case "RELOAD_COURSE":
      return {
        ...state,
        list:action.payload,
        loading:false
      }
    case "BEGIN_LOADING":
      return {
        ...state,
        loading:true
      }
    case "SHOW_MODAL":
      return {
        ...state,
        visible:true
      }
    case "CLOSE_MODAL":
        return {
          ...state,
          visible:false
        }
    default:
      return state;
  }
}
export default courseReducer;