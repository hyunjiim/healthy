import logo from './logo.svg';
import React from 'react';
import './App.css';
import axios from 'axios';
import LoginForm from "./view/login";
import JoinForm from "./view/join";
import {Route, Routes} from "react-router-dom";
import Main from "./view/main";
import Question from "./view/question";
import QuestionForm from "./view/questionform";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            {/* 문의게시판 목록 */}
            <Route path="/question" element={<Question />} />
            {/* 문의게시판 등록 */}
            <Route path="/question/form" element={<QuestionForm />} />
            {/* 회원가입 */}
            <Route path='/join' element={<JoinForm/>} />
            {/* 로그인 */}
            <Route path='/login' element={<LoginForm/>} />
        </Routes>
    );
}

export default App;