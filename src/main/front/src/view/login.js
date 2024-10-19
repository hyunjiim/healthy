import React, {useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import qs from 'qs';
import '../styles/css/bootstrap.min.css';
import '../styles/css/font-awesome.min.css';
import '../styles/css/style.css';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from "react-modal";
import {useForm} from "react-hook-form";

//JWT - accessToken과 refreshToken이 존재하며 유저 인증에 사용
// => accessToken : 실질적인 인증 정보를 가지고 있으며, 일정 시간이 지나면 만료하는 구조
// => refreshToken : 서버에 보내 새로윤 accessToken을 발급해 돌려 줌 - 로그인 유지
//accessToken과 refreshToken 저장 위치
// => accessToken : 쿠키에 저장할 경우 CSRF 공격에 취약, Local Storage에 저장할 경우 XSS에 취약하므로 로컬 변수에 저장하는 것이 최선
// but! 로컬변수에 저장 시 새로고침할 때 마다 토큰을 재발급해야하는 문제 발생
// => refreshToken : accessToken과 취약점은 동일하나 CSRF 공격으로는 발급받은 AccessToken을 수령할 방법이 없으므로 httpOnly 쿠키로 저장하는 것이 최선
const LoginForm = () => {
    //const { login } = useContext(LoginContext)
    const navigate = useNavigate();
    const location = useLocation();

    //로컬 스토리지(Local Storage) : 웹 브라우저에 데이터를 저장하는 객체로, 유저가 지우지 않는 이상 브라우저에 계속 남음
    //세션 스토리지(Session Storage) : 웹 브라우저에 데이터를 저장하는 객체로, 브라우저 탭을 닫을 경우 사라짐

    const {
        register,
        handleSubmit,
        setError,
        clearError,
        formState:{isSubmitting, errors}} = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues:{},
        criteriaMode: 'all',
        shouldFocusError: true
    });

    const idPattern = /^[a-zA-Z][a-zA-Z0-9]{4,12}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;

    const onSubmit = (data) => {
        const joinBody = {
            ...data
        };

        console.log(joinBody);

        axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

        axios.post('/login', joinBody)
            .then((response) => {
                console.log('응답:', response);
                if(response.status === 200) {
                    alert("로그인 성공");
                    const data = response.data;
                    const { id } = data;

                    window.localStorage.setItem("accessToken", response.headers.get("accessToken"));
                    window.localStorage.setItem("id", id);

                    navigate('/');
                } else {
                    console.log('잘못된 상태코드 :', response.status);
                }
            })
            .catch((error) => {
                console.log('오류 발생 : ', error.response);
            });
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="checkout__input" style={{ textAlign: 'center' }}>
                                            <label style={{ textAlign: 'left', width: '500px' }}>아이디 &nbsp;<span style={{ color: 'red' }}>*</span></label><br />
                                            {/* 아이디 저장 기능 구현 후 추가
                                                rememberUserId           */}
                                            <input type="text" style={{ width: '500px' }}
                                                   id="id"
                                                   placeholder="아이디"
                                                   autoComplete="id"
                                                   {...register("id", {
                                                       required: '아이디는 필수 입력입니다.',
                                                       pattern: {value: idPattern, message: '아이디는 반드시 영문자로 시작해야 하며, 4-12자의 영문자 또는 숫자로 이루어져야 합니다.'}
                                                   })}
                                                   aria-invalid={errors.id? "true" : "false"}
                                            />
                                        </div>
                                        <div className="checkout__input" style={{ textAlign: 'center' }}>
                                            <label style={{ textAlign: 'left', width: '500px' }}>비밀번호&nbsp;<span style={{ color: 'red' }}>*</span></label><br />
                                            <input type="password"
                                                   style={{ width: '500px' }}
                                                   id="password"
                                                   placeholder="비밀번호"
                                                   {...register("password", {
                                                       required: '비밀번호는 필수 입력입니다.',
                                                       pattern: {value: passwordPattern, message: '비밀번호는 8-12자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.'}})}
                                                   autoComplete="password"
                                                   aria-invalid={errors.password? "true" : "false"}
                                            />
                                        </div>
                                        <div style={{textAlign: 'center'}}>
                                            <img src="img/kakao_login.png" style={{width: '150px', marginRight:'10px'}}/>
                                            <img src="img/naver_login.png" style={{width: '150px', height: '35px', marginRight:'10px'}}/>
                                            <img src="img/google_login.png" style={{width: '150px'}}/>
                                        </div>
                                        <br/>
                                        <div style={{textAlign: 'center'}}>
                                            <button type="submit" style={{ textAlign: 'center' }} className="site-btn cart-btn-right">로그인</button>
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