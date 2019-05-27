import React from 'react'
import axios from '../http'
import {Button} from 'antd'

class Course extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
  }

  componentWillMount(){
    let promise = axios.get('/course/findAll');
    promise.then((result)=>{
      console.log("请求结果：",result);
      this.setState({
        list:result.data
      });
    })
    promise.catch((error)=>{
      alert(JSON.stringify(error));
    })
    promise.finally(()=>{
    })

  }

  delHandler(){
    let url = "/course/findById"
    axios
    .get(url,{
      params:{id:0}
    })  // 返回一个promise对象
    .then((result)=>{
      console.log("---",result);
    })  // 返回一个promise对象

  }

  addHandler(){
    let data = {
      name:'思想政治',
      description:"test..."
    }
    let url = "/course/saveOrUpdate"
    axios.post(
      url,  //请求地址
      data // 数据，手动转换为查询字符串
    )
    .then((result)=>{
      console.log("success",result);
    })
    .catch((error)=>{
      console.log("error",error);
    })
  }

  render(){
    let {list} = this.state;
    return (
      <div className="course">
        <h2>课程管理</h2>
        <div>
          <Button onClick={this.delHandler.bind(this)}>删除</Button> &nbsp;
          <Button onClick={this.addHandler.bind(this)}>添加</Button>
        </div>
        {JSON.stringify(list)}
      </div>
    )
  }
}

export default Course;