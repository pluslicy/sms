import React from 'react'
import axios from '../http'
import {Table,Button,message} from 'antd'
import {connect} from 'react-redux'

class Teacher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
    console.log("teacher-props",this.props);
    console.log("teacher-props",this.state);
  }
  componentWillMount(){
    axios.get('/teacher/findAll')
    .then((result)=>{
      this.setState({
        list:result.data
      })
    })
  }
  deleteHandler(id){
    axios.get('/student/deleteById',{
      params:{id}
    })
    .then((result)=>{
      if(result){
        message.success(result.statusText)
        
      }
    })
  }

  render(){
    let columns = [{
      title:'姓名',
      dataIndex:"realname"
    },{
      title:'用户名',
      dataIndex:"username"
    },{
      title:'性别',
      dataIndex:"gender"
    },{
      title:'操作',
      render:(text,record)=>{
        return (
          <div>
            <Button type="link" onClick={this.deleteHandler.bind(this,record.id)}>删除</Button>
          </div>
        )
      } 
    }]

    return (
      <div className="teacher">
        <h2>教师管理</h2>
        <Table rowKey="id" size="small" columns={columns} dataSource={this.state.list}/>
      </div>
    )
  }
}

export default connect(state=>state)(Teacher);