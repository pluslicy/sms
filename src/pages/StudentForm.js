import React from 'react'
import {Form,Input,Radio,Upload,Icon,Button,message} from 'antd'

class StudentForm extends React.Component {


  
  render(){
    const props = {
      name: 'file',
      action: 'http://134.175.154.93:8099/manager/file/upload',
      headers: {
        authorization: 'authorization-text',
      },
      onChange:(info) => {
        if (info.file.status !== 'uploading') {
          // 上传成功后附件服务器返回来的结果
          let response = info.file.response.data;
          let url = "http://134.175.154.93:8888/"+response.groupname+"/"+response.id;
          // 将url设置到表单中
          this.props.form.setFieldsValue({
            photo:url
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  
    
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator("id");
    getFieldDecorator("type");
    getFieldDecorator("status");
    getFieldDecorator("photo");
    return (
      <div className="student_form">
      <Form className="login-form">
        <Form.Item label="姓名">
          {getFieldDecorator('realname', {
            rules: [{ required: true, message: 'Please input your realname!' }],
          })(
            <Input placeholder="Realname" />,
          )}
        </Form.Item>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input placeholder="Username" />,
          )}
        </Form.Item>
        <Form.Item label="性别" className="collection-create-form_last-form-item">
          {getFieldDecorator('gender', {
            initialValue: '男',
          })(
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input type="password" placeholder="Password" />,
          )}
        </Form.Item>
        <Form.Item label="头像">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
      </div>
    )
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
})(StudentForm);