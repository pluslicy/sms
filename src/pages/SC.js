import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd'

class SC extends React.Component {
  // 添加教师
  addHandler(){
    
  }

  render(){
    let {teacherState} = this.props;
    console.log("sc props",this.props);
    return (
      <div className="sc">
        <h2>选课管理</h2>
        <div>
          <Button onClick={this.props.addHandler}>添加</Button>
        </div>
        <ul>
          {teacherState.list.map((item,index)=>{
            return <li key={index}>{item.name}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("state---",state);
  return state;
}


let mapDispatchToProps = dispatch=>{
  return {
    addHandler:()=>{
      let action = {type:'GET_TEACHER'}
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SC);