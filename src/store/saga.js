import {call,takeEvery,put} from 'redux-saga/effects'
import axios from '../http'

// effects
function* reloadCourseAsync(){
  alert(1);
  let teacherResult = yield call(axios.get,"/teacher/findAll")
  let courseResult = yield call(axios.get,"/course/findAll");
  yield put({ type:"RELOAD_COURSE", payload:courseResult.data })
}

export default function* rootSaga(){
  // 将effects映射为一个action type
  yield takeEvery("RELOAD_COURSE_ASYNC",reloadCourseAsync)
}
