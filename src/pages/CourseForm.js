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
    getFieldDecorator("id");
    getFieldDecorator("photo");
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

// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
  let obj = {};
  for(let key in props.initData){
    let val = props.initData[key];
    obj[key] = Form.createFormField({value:val})
  }
  return obj;
}

export default Form.create({
  mapPropsToFields
})(connect(state=>state)(CourseForm));