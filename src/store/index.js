import {combineReducers,createStore,applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../store/saga'

import thunk from 'redux-thunk'
import studentReducer from './studentReducer'
import teacherReducer from './teacherReducer'
import courseReducer from './courseReducer'
import memoReducer from './memoReducer'

// 合并reducers
let rootReducer = combineReducers({
  studentState:studentReducer,
  teacherState:teacherReducer,
  memoState:memoReducer,
  courseState:courseReducer
})

let sagaMiddleware = createSagaMiddleware();
// 创建仓库并且暴露给外部
export default createStore(
  rootReducer
  , applyMiddleware(thunk)
  // , applyMiddleware(sagaMiddleware)
)

// 动态运行saga
// sagaMiddleware.run(rootSaga)