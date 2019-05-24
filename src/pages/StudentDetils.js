import React from 'react'
import {Button} from 'antd'

class StudentDetails extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props);
    
  }

  goBack(){
    this.props.history.goBack();
  }
  render(){
    let student = this.props.location.state;
    return (
      <div className="student_details">
        <h2>{this.props.location.state.realname}的详细信息</h2>
        <Button type="link" onClick={this.goBack.bind(this)}>返回</Button>
        
        {JSON.stringify(student)}
        <img alt="图片丢失" src={student.photo} style={{width:"80%",border:"1px solid #ccc",padding:"1em",borderRadius:"5px"}}/>
      </div>
    )
  }
}

export default StudentDetails;