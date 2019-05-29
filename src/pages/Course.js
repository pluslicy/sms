import React from 'react'
import {Table,Button,Modal} from 'antd'
import {connect} from 'react-redux'
import CourseForm from './CourseForm'
// 导入action generator ; 用于获取action,并且进行分发
import {
  reloadCourse,
  deleteCourse,
  showModal,
  closeModal
} from '../store/courseReducer'


class Course extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      course:{}
    }
  }

  componentWillMount(){
    this.props.dispatch(reloadCourse());
  }

  delHandler(id){
    this.props.dispatch(deleteCourse(id))
  }

  toAddHandler(){
    this.setState({
      course:{
        
       }
    })
    this.props.dispatch(showModal())
  } 

  addHandler(){
   
  }
  editHandler(record){
    this.props.dispatch(showModal())
    this.setState({
      course:record
    })
  }
  handleOk = e => {
    // this.props.dispatch(closeModal())
    this.form.validateFields((err, values) => {
      if (!err) {
        alert('Received values of form: '+JSON.stringify(values));
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.props.dispatch(closeModal())
  };
  courseFormRefs = (form)=>{
    this.form = form;
  }

  render(){
    let columns = [{
      title:"名称",
      dataIndex:"name"
    },{
      title:"介绍",
      dataIndex:"description"
    },{
      title:"学分",
      dataIndex:"credit"
    },{
      title:"任课老师",
      dataIndex:"teacher.realname"
    },{
      title:"操作",
      render:(text,record)=>{
        return (
          <div>
            <a onClick={this.editHandler.bind(this,record)}>edit</a>&nbsp;
            <a onClick={this.delHandler.bind(this,record.id)}>del</a>
          </div>
        )
      }
    }]
    return (
      <div className="course">
        <h2>课程管理</h2>
        <div className="btns">
          <Button onClick={this.toAddHandler.bind(this)}>添加</Button>
        </div>
        <Table 
          loading={this.props.courseState.loading}
          size="small" 
          rowKey="id" 
          columns={columns} 
          dataSource={this.props.courseState.list}/>
        <Modal
          title="添加课程"
          visible={this.props.courseState.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CourseForm initData={this.state.course} ref={this.courseFormRefs}/>
        </Modal>
      </div>
    )
  }
}
let mapStateToProps = (state)=>{
  return state;
}

export default connect(mapStateToProps)(Course);