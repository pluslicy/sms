import React from 'react'
import {connect} from 'react-redux'

class CourseSaga extends React.Component {

  componentDidMount(){
    this.props.dispatch({
      type:"RELOAD_COURSE_ASYNC"
    })
  } 

  render(){
    return (
      <div>
        <h2>课程管理saga版本</h2>
        {JSON.stringify(this.props.courseState)}
      </div>
    )
  }
}

export default connect(state=>state)(CourseSaga);