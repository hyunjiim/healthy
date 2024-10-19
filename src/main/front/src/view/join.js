import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios, {post} from 'axios';
import qs from 'qs';
import '../styles/css/bootstrap.min.css';
import '../styles/css/font-awesome.min.css';
import '../styles/css/style.css';
import { useNavigate } from 'react-router-dom';
//다음 주소 api 사용 >> npm install react-daum-postcode >> npm audit fix(보안상 문제 해결)
import DaumPostcode from 'react-daum-postcode';
import Modal from "react-modal";
import {useForm} from "react-hook-form";
import selectStyle from './crewreg'
import {getValue} from "@testing-library/user-event/dist/utils";


const JoinForm = () => {
    const navigate = useNavigate();

    //입력값들을 다루기 위해 state을 선언하여 코드를 작성해 보니 핸들링 함수, 유효성 검사르 위한 검증코드 등 작성해야하는 코드가 길어지고, 가독성에 좋지 않다고 생각됨. useForm을 사용하게 됨
    //뿐만 아니라 모든 값이 state로 연결되어 있으며 하나의 값이 변할때 마다 여러 개의 자식 컴포넌트 들에서 무수히 많은 리랜더링 발생
    // => 불필요한 랜더링 발생
    //UseForm : form의 validation을 도와주는 라이브러리
    //=> 설치 방법 : npm install react-hook-form

    const {
        register ,
        handleSubmit,
        watch,  //사용자가 현재 입력하고 있는 값을 실시간으로 감시 >> useEffect 함수 안에 subscription, unsubscription 방식으로 작성
        setValue,
        getValues,
        setError,
        clearErrors,
        formState:{isSubmitting, errors}} = useForm({ //회원가입 버튼이 두번 클릭되어 양식이 2번 제출되는 것을 막기 위해 버튼 비활성화 >> 이벤트 처리 완료 후 활성화
        mode: 'onBlur',   //동작 제출 전 검증 방법 - onSubmit : 사용자가 form 제출 시에만 유효성 검사 진행 - onChange 모드로 했을 경우 다수의 리랜더링이 발생할 수 있어 성능에 영향을 끼칠 수 있음
        reValidateMode: 'onChange', //동작 제출 후 오류가 발생했을 때 검증 방법
        defaultValues: {},  //초기값 설정
        resolver: undefined,    //유효성 검사 라이브러리(로직)
        context: undefined, //resolver 관련하여 유효성 검사 라이브러리인 Yup의 context로 사용
        criteriaMode: "all",  //register로 등록된 form의 에러 모두 감지
        shouldFocusError: true  //유효성 검사에 실패한 필드로 포커스 자동 이동
    });

    //유효성 검사 패턴
    const idPattern = /^[a-zA-Z][a-zA-Z0-9]{4,12}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
    const namePattern = /^[가-힣]{2,6}$/;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    {/* 1자리부터 3자리의 숫자이며, 소숫점 자리 숫자가 0 또는 1번 나타날 수 있음(소숫점 한 자리 수까지) */ }
    const weightPattern = /\b\d{2,3}(\.\d)?\b/;
    {/* 1자리부터 3자리의 숫자이며, 소숫점 자리 숫자가 0 또는 1번 나타날 수 있음(소숫점 한 자리 수까지) */ }
    const heightPattern = /\b\d{2,3}(\.\d)?\b/;


    //생일 년, 월, 일 옵션 리스트
    const START_YEAR = new Date().getFullYear() - 100;
    //Array.from : 유사 배열 객체를 배열로 바꾸는 데 사용되며,
    // => Static Method이기 때문에 instance로 생성된 배열에 대해 사용할 수 없음
    //첫 번째 인자 : {length: X }
    //두 번째 인자 : (value, index) => (함수)
    const YEAR_OPTION = Array.from({ length: 82}, (_, i) => `${i + START_YEAR}`);
    const MONTH_OPTION = Array.from({length: 12}, (_, i) => `${i + 1}`);
    const DAY_OPTION = Array.from({length: 31}, (_, i) => `${i + 1}`);

    //아이디 중복 확인
    const [isCheckId, setIsCheckId] = useState(false);
    const [checkUserIdMessage, setCheckUserIdMessage] = useState('');
    const checkUserId = async () => {
        try{
            const id = getValues('id');
            const response = await axios.get(`/userIdCheck?id=${id}`);
            if(response.data == "success"){
                clearErrors('id');
                setCheckUserIdMessage('사용 가능한 아이디입니다.');
                setIsCheckId(true);

            } else if(response.data == "fail") {
                setError('id', {
                    type : 'manual',
                    message: '이미 사용 중인 아이디 입니다.'
                });
                setCheckUserIdMessage('');
                setIsCheckId(false);
            }
        } catch (error) {
            console.error('아이디 중복 검사 오류 : ', error);
            setError('id', {
                type: 'manual',
                message: '아이디 중복 검사 중 오류가 발생했습니다.'
            });
            setCheckUserIdMessage('');
            setIsCheckId(false);
        }
    }

    const onChangeAddress = (newAddress1, newAddress2, newAddress3) => {
        setValue("address1", newAddress1);
        setValue("address2", newAddress2);
        setValue("address3", newAddress3);
    }

    const onSubmit = (data) => {
        if(!isCheckId){
            alert('이미 사용 중인 아이디 입니다.');
            return;
        }

        const birth = `${data.year}-${data.month.padStart(2, '0')}-${data.day.padStart(2, '0')}`;

        const joinBody = {
            ...data,
            birth
        };


        axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

        axios
            .post(`/join?auth=${data.auth}`, joinBody)
            .then((response) => {
                console.log('응답:', response);
                if(response.status === 200) {
                    console.log('응답 데이터:', response.data);
                    alert("회원가입 되었습니다. 환영합니다!");
                    navigate('/login');
                } else {
                    console.log('잘못된 상태코드 :', response.status);
                }
            })
            .catch((error) => {
                console.log('오류 발생 : ', error.response);
            })
    }

    //getValues >> useWatch >> watch 순으로 고려!
    //getValues : 폼의 값을 가져오기 위해 사용되는 함수로, watch와 유사한 기능을 제공하지만,
    //getValues의 경우 입력을 감시하지 않기 때문에 입력값에 변경이 있어도 업데이트되지 않음
    // => getValues: (payload?: string | string[]) => Object
    //useWatch : ref의 변화를 감지해 watch와 같은 역할 수행
    // =>

    return (
        <>
            {/* Breadcrumb Section Begin */}
            <section className="breadcrumb-section set-bg" data-setbg="img/breadcrumb.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>회원가입</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Breadcrumb Section End */}

            {/* Checkout Section Begin */}
            <section className="checkout spad">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="checkout__form">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='row'>
                                        <div className="checkout__input" style={{ width: '80%', marginLeft: '15px' }}>
                                            <p>아이디 &nbsp;<span>*&nbsp;&nbsp;</span>{errors.id && <span className='idMessage'>{errors.id.message}</span>}{checkUserIdMessage && <span style={{color : 'green'}} >{checkUserIdMessage}</span>}</p>
                                            <input
                                                type="text"
                                                id='id'
                                                placeholder="아이디를 입력해주세요."
                                                {...register("id", {
                                                    required: '아이디는 필수 입력입니다.',
                                                    pattern: {value: idPattern, message: '아이디는 반드시 영문자로 시작해야 하며, 4-12자의 영문자 또는 숫자로 이루어져야 합니다.'}})}
                                                aria-invalid={errors.id? "true" : "false"}
                                            />
                                        </div>
                                        <div className="checkout__input" style={{ marginLeft: '25px', marginTop: '45px' }}>
                                            <button type="button"
                                                    id='duplicate-id-check'
                                                    className='site-btn cart-btn cart-btn-right'
                                                    style={{ backgroundColor: '#F2B950' }}
                                                    onClick={checkUserId}
                                                    >아이디 중복체크</button>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>비밀번호&nbsp;<span>*&nbsp;&nbsp;</span>{errors.password && <span className='passwordMessage'>{errors.password.message}</span>}</p>
                                        <input
                                            type="text"
                                            id='password'
                                            placeholder="비밀번호를 입력하세요."
                                            {...register("password", {
                                                required: '비밀번호는 필수 입력입니다.',
                                                pattern: {value: passwordPattern, message: '비밀번호는 8-12자이며, 영문자, 숫자, 특수문자를 포함해야 합니다.'}})}
                                            aria-invalid={errors.password? "true" : "false"}
                                        />
                                    </div>
                                    <div className="checkout__input">
                                        <p>비밀번호 확인&nbsp;<span>*&nbsp;&nbsp;</span>{errors.passwordConfirm && <span className='passwordConfirmMessage'>{errors.passwordConfirm.message}</span>}</p>
                                        <input
                                            type="text"
                                            id='passwordConfirm'
                                            placeholder="비밀번호를 다시한번 입력해주세요."
                                            className="checkout__input__add"
                                            {...register("passwordConfirm", {
                                                required: '비밀번호 확인은 필수 입력입니다.',
                                                validate: {
                                                    check: value => {
                                                        if(getValues("password") !== value){
                                                            return "위의 비밀번호와 맞지 않습니다."
                                                        }
                                                    }
                                                }
                                            })}
                                            aria-invalid={errors.password? "true" : "false"}
                                        />
                                    </div>

                                    <div>
                                        <p style={{ color: 'black' }}>일반 회원/트레이너 등록<span style={{ color: 'red' }}>*&nbsp;&nbsp;</span>{errors.auth && <span style={{ color: 'red' }} className='genderMessage'>{errors.auth.message}</span>}</p>
                                        일반회원
                                        <input
                                            style={{ textAlign: 'left' }}
                                            type="radio"
                                            id="auth"
                                            {...register("auth", {
                                                required: '권한을 선택해주세요.'
                                            })} 
                                            value="ROLE_USER"
                                        />&nbsp;&nbsp;&nbsp;
                                        트레이너
                                        <input 
                                            style={{ textAlign: 'left' }} 
                                            type="radio" 
                                            id="auth"
                                            {...register("auth", {
                                                required: '권한을 선택해주세요.'
                                            })} 
                                            value="ROLE_REGISTER" />
                                    </div>
                                    <br />

                                    <div className="checkout__input">
                                        <p>닉네임<span>*&nbsp;&nbsp;</span><span className='nameMessage'></span></p>
                                        <input
                                            type="text"
                                            id='name'
                                            placeholder="닉네임을 입력해주세요."
                                            {...register("name",{
                                                required: '닉네임은 필수 입력입니다.',
                                                pattern: {value: namePattern, message: '닉네임은 2-6자의 한글이어야 합니다.'}})}
                                            aria-invalid={errors.name? "true" : "false"}
                                        />
                                    </div>
                                    <Postcode onChangeAddress={onChangeAddress} register={register} />
                                    <div className="checkout__input">
                                        <p>생일<span>*&nbsp;&nbsp;</span><span className='birthMessage'></span></p>
                                        <select
                                            id='year'
                                            {...register("year", {
                                                required: '생일은 필수 입력입니다.'
                                            })}>
                                            {YEAR_OPTION.map((year, index) => (
                                                <option key={index}>{year}</option>
                                            ))}
                                        </select>&nbsp;&nbsp;
                                        <select
                                            id='month'
                                            {...register("month", {
                                                required: '생일은 필수 입력입니다.'
                                            })}>
                                            {MONTH_OPTION.map((month, index) => (
                                                <option key={index}>{month}</option>
                                            ))}
                                        </select>&nbsp;&nbsp;
                                        <select
                                            id='day'
                                            {...register("day", {
                                                required: '생일은 필수 입력입니다.'
                                            })}>
                                            {DAY_OPTION.map((day, index) => (
                                                <option key={index}>{day}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <p style={{ color: 'black' }}>성 별<span style={{ color: 'red' }}>*&nbsp;&nbsp;</span>{errors.gender && <span style={{ color: 'red' }} className='genderMessage'>{errors.gender.message}</span>}</p>
                                        남<input
                                            style={{ textAlign: 'left' }}
                                            type="radio"
                                            id="male"
                                            {...register("gender", {required: '성별을 선택해주세요.'})}
                                            value="1" />&nbsp;&nbsp;&nbsp;
                                        여<input
                                            style={{ textAlign: 'left' }}
                                            type="radio"
                                            id="female"
                                            {...register("gender", {required: '성별을 선택해주세요.'})}
                                            value="2" />
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>휴대폰 번호<span>*&nbsp;&nbsp;</span>{errors.phone && <span className='phoneMessage'>{errors.phone.message}</span>}</p>
                                                <input
                                                    type="text"
                                                    id='phone'
                                                    {...register("phone", {
                                                        required: '휴대폰 번호는 필수 입력입니다.',
                                                        pattern: {value: phonePattern, message: '올바른 전화번호 형식(예: 010-1234-5678)을 입력해주세요.'}})}
                                                    aria-invalid={errors.phone? "true" : "false"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>Email<span>*&nbsp;&nbsp;</span>{errors.email && <span className='emailMessage'>{errors.email.message}</span>}</p>
                                                <input
                                                    type="text"
                                                    id='email'
                                                    {...register("email",{
                                                        required: '이메일은 필수 입력입니다.',
                                                        pattern: {value: emailPattern, message: '올바른 이메일 주소를 입력해주세요.'}})}
                                                    aria-invalid={errors.email? "true" : "false"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>신 장<span>*&nbsp;&nbsp;</span>{errors.height && <span className='heightMessage'>{errors.height.message}</span>}</p>
                                                <input
                                                    type="text"
                                                    id='height'
                                                    {...register("height", {
                                                        required: '신장은 필수 입력입니다.',
                                                        pattern: {value: heightPattern, message: '신장은 소숫점 1자리까지의 숫자만 입력할 수 있습니다.'}})}
                                                    aria-invalid={errors.height? "true" : "false"}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>체 중<span>*&nbsp;&nbsp;</span>{errors.weight && <span className='weightMessage'>{errors.weight.message}</span>}</p>
                                                <input
                                                    type="text"
                                                    id='weight'
                                                    {...register("weight", {
                                                        required: '체중은 필수 입력입니다.',
                                                        pattern: {value: weightPattern, message: '체중은 소숫점 1자리까지의 숫자만 입력할 수 있습니다.'}})}
                                                    aria-invalid={errors.weight? "true" : "false"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <button type="submit" disabled={isSubmitting} className="site-btn btn-join" style={{ textAlign: 'center' }}>회원가입</button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                </form>
            </section>
            {/* Checkout Section End */}
        </>
    );
};

//register가 Postcode 컴포턴트 내에 정의되지 않아 'Line 330:21:  'register' is not defined  no-undef'란 오류 발생
//=> JoinForm 컴포턴트에서 register를 함께 받아 오류 수정
const Postcode = ({ onChangeAddress, register }) => {
    const [postcode, setPostcode] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const completeHandler = data => {
        setPostcode(data.zonecode);
        setAddress(data.address);
        setAddressDetail("");
        setIsOpen(false);
        onChangeAddress(data.zonecode, data.address, "");
    }

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const changeHandler = e => {
        setAddressDetail(e.target.value);
    };

    return (
        <div className="checkout__input">
            <input
                value={postcode}
                id='address1'
                {...register("address1", {
                    required : '우편번호는 필수 입력입니다.'
                })}
                readOnly
                placeholder="우편번호" />
            <button
                type='button'
                className='site-btn cart-btn cart-btn-right'
                onClick={toggle}>우편번호 검색</button>
            <br />
            <input
                value={address}
                id='address2'
                {...register("address2", {
                    required : '도로명 주소는 필수 입력입니다.'
                })}
                readOnly
                placeholder="도로명 주소" />
            <br />
            <Modal isOpen={isOpen} ariaHideApp={false}>
                <DaumPostcode onComplete={completeHandler} height="100%" />
            </Modal>
            <input
                type="text"
                id='address3'
                {...register("address3",{
                    required : '상세주소를 입력해주세요.'
                })}
                onChange={changeHandler}
                value={addressDetail}
                placeholder="상세주소" />
            <br />
        </div>
    )
}

export default JoinForm;