import _ from 'lodash'
// 初始化状态
let initState = {
  list:["要备redux的课程","中午出门打伞","晚上要看电影","ttt"],
  loading:false
}
// action generator
export function delMemo(payload){
  return {
    type:"DEL_MEMO",
    payload
  }
}
export function saveMemo(payload){
  return {
    type:"SAVE_MEMO",
    payload
  }
}

// reducer
function memoReducer(state=initState,action){
  switch(action.type){
    case "DEL_MEMO":
      _.remove(state.list,item=>item===action.payload)
      return {
        ...state,
        list:state.list
      };
    case "SAVE_MEMO":
      return {
        ...state,
        list:[...state.list,action.payload]
      };
    default:
      return state;
  }
}
export default memoReducer;

