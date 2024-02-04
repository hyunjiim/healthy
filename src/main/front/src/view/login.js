import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';
import '../styles/css/bootstrap.min.css';
import '../styles/css/font-awesome.min.css';
import '../styles/css/style.css';
import {useNavigate} from 'react-router-dom';
import Modal from "react-modal";

const LoginForm = () => {
    const navigate = useNavigate();

    //입력 초기값 설정
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    //입력값 검사
    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const LoginFunc = (e) => {
        if(id == ""){
            alert("아이디를 입력해주세요.");
            setIsId(false);
        }else{
            setIsId(true);
        }

        if(password == ""){
            alert("비밀번호를 입력해주세요.");
            setIsPassword(false);
        }else{
            setIsPassword(true);
        }

    }

    return (
        <>
            <div>
                <h3 style={{ textAlign: 'center' }}>
                    로그인
                </h3>
            </div>

            <section className="checkout spad" style={{ padding: '50px' }}>
                <div className="container">
                    <div className="checkout__form">
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="checkout__input" style={{ textAlign: 'center' }}>
                                            <label style={{ textAlign: 'left', width: '500px' }}>아이디 &nbsp;<span style={{ color: 'red' }}>*</span></label><br />
                                            <input type="text" style={{ width: '500px' }} value={id} onChange={(e) => setId(e.target.value)}/>
                                        </div>
                                        <div className="checkout__input" style={{ textAlign: 'center' }}>
                                            <label style={{ textAlign: 'left', width: '500px' }}>비밀번호&nbsp;<span style={{ color: 'red' }}>*</span></label><br />
                                            <input type="password" style={{ width: '500px' }} value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <img src="img/kakao_login.png" style={{width: '150px', marginRight:'10px'}}/>
                                            <img src="img/naver_login.png" style={{width: '150px', height: '35px', marginRight:'10px'}}/>
                                            <img src="img/google_login.png" style={{width: '150px'}}/>
                                        </div>
                                        <br/>
                                        <div style={{textAlign: 'center'}}>
                                            <button type="submit" style={{ textAlign: 'center' }} className="site-btn cart-btn-right" onClick={() => LoginFunc()}>로그인</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginForm;