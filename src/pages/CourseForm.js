import React from 'react'
import {Form,Input,Select} from 'antd' 
import {
  reloadTeacher
} from '../store/teacherReducer'
import {connect} from 'react-redux'
class CourseForm extends React.Component {
  componentWillMount(){
    this.props.dispatch(reloadTeacher())
  }
  render(){
    let {getFieldDecorator} = this.props.form;
    return (
      <div className="course_form">
        <Form>
          <Form.Item label="课程名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input course name!' }],
            })(
              <Input placeholder="course name" />,
            )}
          </Form.Item>
          <Form.Item label="课程介绍">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: 'Please input course description!' }],
            })(
              <Input placeholder="course description" />,
            )}
          </Form.Item>
          <Form.Item label="学分">
            {getFieldDecorator('credit', {
              rules: [{ required: true, message: 'Please input course credit!' }],
            })(
              <Input placeholder="course credit" />,
            )}
          </Form.Item>
          <Form.Item label="任课老师">
          {getFieldDecorator('teacherId', {
            rules: [{ required: true, message: '请选择任课老师' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
            >
              {
                this.props.teacherState.list.map((item)=>{
                  return  <Select.Option key={item.id} value={item.id}>{item.realname}</Select.Option>
                })
              }
            </Select>
            )}
          </Form.Item>
      </Form>
      </div>
    );
  }
}

export default Form.create()(connect(state=>state)(CourseForm));