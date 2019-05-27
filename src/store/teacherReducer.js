// reducer，用于将action与modal关联起来
// state 状态初始化
let initState = {
  list:[{name:"terry"}],
  loading:false,
  visible:false,
}
function teacherReducer(state=initState,action){
  switch(action.type){
    case "BEGIN_LOADING":
      state.loading = true;
      return state;
    case "GET_TEACHER":
      let name = "hello"+Math.round(Math.random()*100);
      state = {
        list:[...state.list,{name}]
      }
      return state;
    default:
      return state;
  }
}
export default teacherReducer;