import axios from '../http'
// reducer，用于将action与modal关联起来
// state 状态初始化
let initState = {
  list:[],
  loading:false,
  visible:false,
}

export function reloadTeacher(){
  return function(dispatch){
    axios.get('/teacher/findAll')
    .then(({data})=>{
      dispatch({
        type:'RELOAD_TEACHER',
        payload:data
      })
    })
  }
}



function teacherReducer(state=initState,action){
  switch(action.type){
    case "BEGIN_LOADING":
      state.loading = true;
      return state;
    case "RELOAD_TEACHER":
        state = {
          list:action.payload
        }
        return state;
    case "GET_TEACHER":
      return state;
    default:
      return state;
  }
}
export default teacherReducer;