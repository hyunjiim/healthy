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

const QuestionForm = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('crew');

    {/* select 태그 관련 */}
    const options = [
        { value: 'crew', label: '크루 관련' },
        { value: 'sub', label: '구독 관련' },
        { value: 'video', label: '영상 관련' },
        { value: 'chat', label: '채팅 관련' },
        { value: 'etc', label: '기타' },
    ];

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const registQuestion = async () => {
        await axios.post('http://localhost:3000/question', Question).then((res) => {
            alert('문의글이 등록되었습니다.');
        });
    };

    
    const cancelRegist = () => {
        alert('작성 취소');
        navigate('/question');
    }

    return (
        <section className="checkout spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="contact__form__title">
                            <h2>문의글 작성하기</h2>
                        </div>
                    </div>
                </div>
                <div className="checkout__form">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className='row'>
                                    <div className="checkout__input" style={{ width: '75%', marginLeft: '15px' }}>
                                        <p>제 목&nbsp;<span><input type="text" placeholder="제목" /></span></p>
                                    </div>
                                    <div className="checkout__input" style={{marginLeft: '25px'}}>
                                        <p>구 분&nbsp;<span><select value={selectedOption} onChange={handleSelectChange}>
                                            <option value="" disabled>Select an option</option>
                                            {options.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select></span></p>
                                    </div>
                                </div>

                                <div className="checkout__input">
                                    <p>내 용 <span>*</span></p>
                                    <textarea className="question_textarea" placeholder="문의글 내용"></textarea>
                                </div>

                                <div className="checkout__file">
                                    <p>파일 첨부&nbsp;</p>
                                    <input type="file" />
                                </div>

                                <div style={{ width: '100%', textAlign: 'center' }}>
                                    <button onClick={registQuestion} className="site-btn" style={{ textAlign: 'center' }}>작성하기</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default QuestionForm;