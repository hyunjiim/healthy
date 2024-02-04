import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../styles/css/bootstrap.min.css';
//import '../styles/css/elegant-icons.css';
import '../styles/css/font-awesome.min.css';
//import '../styles/css/jquery-ui.min.css';
//import '../styles/css/nice-select.css';
// import '../styles/css/owl.carousel.min.css';
//import '../styles/css/slicknav.min.css';
import '../styles/css/style.css';
import { Link, useNavigate } from 'react-router-dom';

const Question = () => {
    const navigate = useNavigate();
    //state : 자료를 잠시 저장할 때 사용
    // => 이유: 일반 변수는 값이 변경되었을 경우 html에 자동으로 변경되지 않지만,
    //state는 자동으로 재랜더링하기 때문에 state를 사용 
    //형식)자료형 [state 함수, state변경용 함수] = useState(보관할 자료)
    const [questionList, setQuestionList] = useState([]);

    const getQuestionList = async () => {
        const resp = await (await axios.get('http://localhost:3000/question')).data;
        setQuestionList(resp.data);
    };

    const registForm = () => {
        navigate('/question/form');
    }

    //두 번째 매개변수에 빈 배열 선언시, 마운트될 때 한번만 실행
    useEffect(() => {
        getQuestionList();
    }, []);

    return (
        <>
            {/*<PagePreloder />*/}

            {/*Breadcrumb Section Begin*/}
            <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url('img/question/questionback.jpg')` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>문의게시판</h2>
                                <div className="breadcrumb__option">
                                    {/* <a href="./index.html"></a> */}
                                    <span>궁금한 사항이 있다면 문의해주세요.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Breadcrumb Section End */}

            {/* Shoping Cart Section Begin */}
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="shoping__product">제 목</th>
                                            <th>작성자</th>
                                            <th>작성일</th>
                                            <th>답변여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questionList.map((question) => (
                                            <tr key={question.idx}>
                                                <td className="shoping__cart__item">
                                                    {/* 임의로 넣어둔 값 나중에 /question/detail/${question.idx} 로 변경할 것 */}
                                                    <Link to={'/question'}>{question.title}</Link>
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {question.userId}
                                                </td>
                                                <td className="shoping__cart__quantity">
                                                    {question.creationDate}
                                                </td>
                                                <td className="shoping__cart__total">
                                                    {/* question.answerContent가 존재하는 경우 '답변완료', 아닌 경우 '대기' */}
                                                    $110.00
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <a href="#" className="primary-btn cart-btn">CONTINUE SHOPPING</a>
                                <button onClick={registForm} className="primary-btn cart-btn cart-btn-right"><span className="icon_loading"></span>
                                    문의글 작성</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};


const PagePreloder = () => {
    return (
        <div id="preloder">
            <div className="loader"></div>
        </div>
    )
}

export default Question

