import React from 'react';
import {BrowserRouter,Switch,Route,Link} from 'react-router-dom'

import './App.css';

import Student from './pages/Student'
import StudentDetails from './pages/StudentDetils'
import Course from './pages/Course'
import Teacher from './pages/Teacher'
import SC from './pages/SC'
import Memo from './pages/Memo'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav_left">
          <div className="title">
            智慧校园-学生选课
          </div>
          <ul className="nav">
            <li>
              <Link to="/student">学生管理</Link>
            </li>
            <li>
              <Link to="/teacher">教师管理</Link>
            </li>
            <li>
              <Link to="/course">课程管理</Link>
            </li>
            <li>
              <Link to="/sc">选课管理</Link>
            </li>
            <li>
              <Link to="/memo">备忘录</Link>
            </li>
          </ul>
        </div>
        <div className="content">
        <Switch>
          <Route path="/student" component={Student}/>
          <Route path="/studentDetails" component={StudentDetails}/>
          <Route path="/course" component={Course}/>
          <Route path="/teacher" component={Teacher}/>
          <Route path="/sc" component={SC}/>
          <Route path="/memo" component={Memo}/>

          
        </Switch>
        </div>

       
      </BrowserRouter> 
    </div>
  );
}

export default App;
