import React from 'react'
import $ from 'jquery'
import {
  Button,
  Table,
  Icon,
  Modal,
  message
} from 'antd'
import StudentForm from './StudentForm'

// 当服务端异常的时候都会执行该回调
$.ajaxSetup({
  error:function(){
    message.error("服务器端异常")
  }
})



class Student extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visible:false,
      pagevm:{},
      ids:[],
      student:{},
      loading:true
    }
  }

  componentWillMount(){
    this.loadStudent();
  }
  // 加载学生信息
  loadStudent(page=1,pageSize=10){
    this.setState({ loading:true
    })
    let url = "http://134.175.154.93:7777/student/pageQuery"
    $.get(url,{
      page,
      pageSize
    },({status,message,data})=>{
      if(status === 200){
        this.setState({ 
          pagevm:data ,
          loading:false
        })
      } else { message.error(message)}
    });
  }
 
  toDetails(record){
    this.props.history.push({
      pathname:'/studentDetails',
      state:record,
    });
    
  }
  // 批量删除
  batchDelete(){
    Modal.confirm({
      title: '确认删除吗？',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:()=> {
        // 编写代码进行删除
        let url = "http://134.175.154.93:7777/student/batchDelete";
        $.ajax({
          url,
          method:"POST",
          data:JSON.stringify(this.state.ids),
          contentType:"application/json",
          success:({status,message:msg})=>{
            if(status === 200){
              message.success(msg)
              this.loadStudent();
            } else {
              message.error(msg)
            }
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  // 通过id删除
  toDelete =(id)=> {
    // let vm = this;
    Modal.confirm({
      title: '确认删除吗？',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:()=> {
        // 编写代码进行删除
        let url = "http://134.175.154.93:7777/student/deleteById?id="+id;
        $.get(url,({status,message:msg})=>{
          if(status === 200){
            message.success(msg)
            this.loadStudent();
          } else {
            message.error(msg)
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 点击添加按钮的执行函数
  toAdd(){
    this.setState({ 
      visible: true, 
      student:{}
    });
  }
  // 点击修改按钮的执行函数
  toEdit(record){
    this.setState({ 
      visible: true, 
      student:record
    });
  }
  // 点击了模态框的确认按钮
  handleOk = e => {
    // 1. 获取表单数据
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let url ="http://134.175.154.93:7777/student/saveOrUpdate";
        $.post(url,values,({status,message})=>{
          if(status === 200){
            message.success(message)
            this.setState({ visible: false, });
            // 页面刷新
            this.loadStudent();
          } else {
            message.error(message);
          }
        })
      }
    });
    // 2. 与后台交互完成保存或更新
    // 3. 关闭模态框，刷新页面
    // this.setState({ visible: false, });
  };
 
  
  // 点击了模态框的取消按钮
  handleCancel = e => {
    this.setState({ visible: false, });
  };

  // ref函数
  studentFormRefs = (form)=>{
    this.form = form;
  }

  // 渲染
  render(){
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ids:selectedRowKeys})
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    const columns = [
      { title: '姓名', dataIndex: 'realname', },
      { title: '用户名', dataIndex: 'username', },
      { title: '性别', dataIndex: 'gender', },
      { 
        title: '操作', 
        width:100,
        align:'center',
        render:(val,record)=>{
          return(
            <div>
              <Icon type="delete" onClick={this.toDelete.bind(this,record.id)} /> &nbsp;
              <Icon type="edit" onClick={this.toEdit.bind(this,record)}/> &nbsp;
              <Icon type="eye" onClick={this.toDetails.bind(this,record)}/>
            </div>
          )
        }
      },
    ];
    // 分页配置
    let pagination ={
      position:'bottom',
      pageSize:10,
      total:this.state.pagevm.total,
      onChange:(page)=>{
        this.loadStudent(page);
      }
    }
    return (
      <div className="student">
        <h2>学生管理</h2>
        {/* 按钮 */}
        <div className="btns">
          <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
          <Button type="danger" onClick={this.batchDelete.bind(this)}>批量删除</Button>
          <Button type="link" onClick={()=>{
            window.location.href="http://134.175.154.93:7777/student/download"
          }}>导出</Button>
        </div>
        {/* 表格 */}
        <Table 
          pagination={pagination} 
          size="small" 
          current={this.state.pagevm.page}
          rowKey="id" 
          rowSelection={rowSelection} 
          columns={columns}
          loading={this.state.loading} 
          dataSource={this.state.pagevm.list} />
        {/* 模态框 */}
        <Modal
          title="修改学生"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <StudentForm initData={this.state.student} ref={this.studentFormRefs}/>
        </Modal>

      </div>
    )
  }
}

export default Student;