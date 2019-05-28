import React from 'react';
import {List,Form,Input,Button} from 'antd'
import {connect} from 'react-redux'

import {
  delMemo,
  saveMemo
} from '../store/memoReducer'

class Memo extends React.Component {

  constructor(props){
    super(props);
  }
  
  delHandler(payload){
    // 通过dispath分发一个动作，引发对应reducer的执行，进而改变state
   this.props.dispatch(delMemo(payload))
  }
  handleSubmit(event){
    event.preventDefault();
    // 校验表单并且获取数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(saveMemo(values.content))
      }
    });
  }

  render(){
    let {getFieldDecorator} = this.props.form;
    console.log("render",this.props);
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
          dataSource={this.props.memoState.list}
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
// 将store中的state映射到当前组件的props上
let mapStateToProps = (item)=>{
  console.log("===",item);
  return item;
}

// 通过connect函数从state状态树中获取状态然后挂载到this.props
export default connect(mapStateToProps)( Form.create()(Memo) ) ;