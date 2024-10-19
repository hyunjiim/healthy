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
import Crew from './view/crewreg';
import CrewList from './view/crew';
import CrewBoard from './view/crewdetail';
import LoginContextProvider, {useLogin} from "./contexts/LoginContextProvider";

function App() {
    const { isLogin } = useLogin();

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            {/* 문의게시판 목록 */}
            <Route path="/question" element={<Question />} />
            {/* 문의게시판 등록 */}
            <Route path="/question/form" element={<QuestionForm />} />
            {/* 회원가입 */}
            {!isLogin && <Route path='/join' element={<JoinForm/>} />}
            {/* 로그인 */}
            {!isLogin && <Route path='/login' element={<LoginForm/>} />}
            {/* 크루 등록 */}
            <Route path="/crew/reg" element={<Crew />} />
            {/* 크루 목록 */}
            <Route path="/crew" element={<CrewList />} />
            {/* 크루 상세보기 */}
            <Route path="/crew/detail" element={<CrewBoard />} />
            {/* 크루 댓글달기 */}
            {/*<Route path="/crew/comment" element={<Crew />} />*/}
            {/* 크루 댓글수정 */}
     {/*       <Route path="/crew/update/:idx" element={<Crew />} />*/}
        </Routes>
    );
}

export default App;