import studentReducer from './studentReducer'
import teacherReducer from './teacherReducer'

import {combineReducers,createStore} from 'redux'
// 合并reducers
let rootReducer = combineReducers({
  studentState:studentReducer,
  teacherState:teacherReducer
})

// 创建仓库并且暴露给外部
export default createStore(rootReducer)