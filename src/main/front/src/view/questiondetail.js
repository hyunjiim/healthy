import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/css/bootstrap.min.css';
//import '../styles/css/elegant-icons.css';
import '../styles/css/font-awesome.min.css';
//import '../styles/css/jquery-ui.min.css';
//import '../styles/css/nice-select.css';
// import '../styles/css/owl.carousel.min.css';
//import '../styles/css/slicknav.min.css';
import '../styles/css/style.css';
import axios from 'axios';
import Question from './question';
import { useNavigate } from 'react-router-dom';

const QuestionDetail = () => {
    return(
        <>
        
        {/* Security 적용하면 관리자 권한인지 체크 후, 답변이 있으면 Answer를, 답변이 없으면 AnswerForm을 출력 */}
        <Answer/>
        <AnswerForm/>
        </>
    );

}

const Answer = () => {
    return(
        <>
        </>
    );
};

const AnswerForm = () => {
    return(
        <>
        </>
    );

};

export default QuestionDetail;