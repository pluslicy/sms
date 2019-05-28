import React from 'react';
import {List,Form,Input,Button} from 'antd'
import _ from 'lodash'

class Memo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list:["要备redux的课程","中午出门打伞","晚上要看电影"]
    }
  }
  
  delHandler(text){
    // alert(text); //要备redux的课程
    _.remove(this.state.list,function(item){
      return item === text;
    })
    this.setState({
      list:this.state.list
    })
  }
  handleSubmit(event){
    event.preventDefault();
    // 校验表单并且获取数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // alert('Received values of form: '+JSON.stringify(values) );
        this.setState({
          list:[...this.state.list,values.content]
        })
      }
    });
  }

  render(){
    let {getFieldDecorator} = this.props.form;
    return (
      <div className="memo">
        <h2>备忘录</h2>
        <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
          <Form.Item>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input your content!' }],
            })(
              <Input placeholder="content" />,
            )}
          </Form.Item>
         
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
        <List
          size="small"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.state.list}
          renderItem={item => (
          <List.Item actions={[<a>edit</a>, <a onClick={this.delHandler.bind(this,item)}>del</a>]}>
            {item}
          </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Form.create()(Memo) ;