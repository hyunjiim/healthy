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

const JoinForm = () => {
    const navigate = useNavigate();

    //입력 초기값 설정
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [address3, setAddress3] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    //오류메세지 초기값 설정
    const [idMessage, setIdMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [addressMessage, setAddressMessage] = useState("");
    const [birthMessage, setBirthMessage] = useState("");
    const [genderMessage, setGenderMessage] = useState("");
    const [phoneMessage, setPhoneMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [heightMessage, setHeightMessage] = useState("");
    const [weightMessage, setWeightMessage] = useState("");
    //유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isBirth, setIsBirth] = useState(false);
    const [isGender, setIsGender] = useState(false);
    const [isAddress, setIsAddress] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [isHeight, setIsHeight] = useState(false);
    const [isWeight, setIsWeight] = useState(false);


    const onChangeId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idPattern = /^[a-zA-Z][a-zA-Z0-9]{4,12}$/;

        if (!idPattern.test(currentId)) {
            setIdMessage("아이디는 4-12사이 대소문자 또는 숫자만 입력해야하며 대소문자로 시작해야합니다.");
            setIsId(false);
        } else {
            setIdMessage("");
            setIsId(true);
        }

    }
    const onChangePassword = (e) => {
        const currentPassword = e.target.value;
        setPassword(currentPassword);
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;

        if (!passwordPattern.test(currentPassword)) {
            setPasswordMessage("비밀번호는 8-12 사이로, 대소문자, 특수문자, 숫자를 모두 포함해야합니다.");
            setIsPassword(false);
        } else {
            setPasswordMessage("");
            setIsPassword(true);
        }

    }
    const onChangePasswordConfirm = (e) => {
        const currentPasswordConfirm = e.target.value;
        setPasswordConfirm(currentPasswordConfirm);
        if (password !== currentPasswordConfirm) {
            setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
            setIsPasswordConfirm(false);
        } else {
            setPasswordConfirmMessage("");
            setIsPasswordConfirm(true);
        }

    }
    const onChangeName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        const namePattern = /^[가-힣]{2,6}$/;

        if (!namePattern.test(currentName)) {
            setNameMessage("이름은 2글자 이상 6글자 이하의 한글로 입력해야합니다.");
            setIsName(false);
        } else {
            setNameMessage("");
            setIsName(true);
        }
    }
    const onChangeEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (!emailPattern.test(currentEmail)) {
            setEmailMessage("이메일 형식이 올바르지 않습니다.");
            setIsEmail(false);
        } else {
            setEmailMessage("");
            setIsEmail(true);
        }
    }

    const onChangeBirth = (e) => {
        const currentBirth = e.target.value;
        setBirth(currentBirth);

        if (birth == "") {
            setBirthMessage("생년월일을 입력해주세요.");
            setIsBirth(false);
        } else {
            setBirthMessage("");
            setIsBirth(true);
        }
    }
    const onChangeGender = (e) => {

    }

    const onChangePhone = (getNumber) => {
        const currentPhone = getNumber;
        setPhone(currentPhone);
        const phonePattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (!phonePattern.test(currentPhone)) {
            setPhoneMessage("올바른 형식이 아닙니다. - 을 꼭 넣어주세요.");
            setIsPhone(false);
        } else {
            setPhoneMessage("");
            setIsPhone(true);
        }
    }

    const addHyphen = (e) => {
        const currentNumber = e.target.value;
        setPhone(currentNumber);
        if (currentNumber.length == 3 || currentNumber.length == 8) {
            setPhone(currentNumber + "-");
            onChangePhone(currentNumber + "-");
        } else {
            onChangePhone(currentNumber);
        }
    }
    const onChangeHeight = (e) => {
        const currentHeight = e.target.value;
        setHeight(currentHeight);
        {/* 1자리부터 3자리의 숫자이며, 소숫점 자리 숫자가 0 또는 1번 나타날 수 있음(소숫점 한 자리 수까지) */ }
        const heightPattern = /\b\d{2,3}(\.\d)?\b/;

        if (!heightPattern.test(currentHeight)) {
            setHeightMessage("신장은 소숫점 1자리까지의 숫자만 작성할 수 있습니다.");
            setIsHeight(false);
        } else {
            setHeightMessage("");
            setIsHeight(true);
        }
    }
    const onChangeWeight = (e) => {
        const currentWeight = e.target.value;
        setWeight(currentWeight);
        {/* 1자리부터 3자리의 숫자이며, 소숫점 자리 숫자가 0 또는 1번 나타날 수 있음(소숫점 한 자리 수까지) */ }
        const weightPattern = /\b\d{2,3}(\.\d)?\b/;

        if (!weightPattern.test(currentWeight)) {
            setWeightMessage("체중은 소숫점 1자리까지의 숫자만 작성할 수 있습니다.");
            setIsWeight(false);
        } else {
            setWeightMessage("");
            setIsWeight(true);
        }

    }

    const onChangeAddress = (newAddress1, newAddress2, newAddress3) => {
        setAddress1(newAddress1);
        setAddress2(newAddress2);
        setAddress3(newAddress3);
    }

    const register = () => {

        const joinBody = {
            id: id,
            password: password,
            name: name,
            address1: address1,
            address2: address2,
            address3: address3,
            birth: birth,
            gender: gender,
            email: email,
            phone: phone,
            height: height,
            weight: weight
        };

        axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
        axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

        axios
            .post('/join', joinBody)
            .then((response) => {
                console.log('응답:', response);
                if(response.status == 200) {
                    console.log('응답 데이터:', response.data);
                    alert(response.data.name + "님 환영합니다!");
                    navigate('/login');
                } else {
                    console.log('잘못된 상태코드 :', response.status);
                }
            })
            .catch((error) => {
                console.log('오류 발생 : ', error.response);
            })
    }

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
                <div className="container">
                    <div className="checkout__form">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className='row'>
                                        <div className="checkout__input" style={{ width: '80%', marginLeft: '15px' }}>
                                            <p>아이디 &nbsp;<span>*&nbsp;&nbsp;</span><span className='idMessage'>{idMessage}</span></p>
                                            <input type="text" id='id' name='id' value={id} onChange={onChangeId} />
                                        </div>
                                        <div className="checkout__input" style={{ marginLeft: '25px', marginTop: '45px' }}>
                                            <button type="button" id='duplicate-id-check' className='site-btn cart-btn cart-btn-right' style={{ backgroundColor: '#F2B950' }}>아이디 중복체크</button>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>비밀번호&nbsp;<span>*&nbsp;&nbsp;</span><span className='passwordMessage'>{passwordMessage}</span></p>
                                        <input type="text" id='password' name='password' value={password} onChange={onChangePassword} />
                                    </div>
                                    <div className="checkout__input">
                                        <p>비밀번호 확인&nbsp;<span>*&nbsp;&nbsp;</span><span className='passwordConfirmMessage'>{passwordConfirmMessage}</span></p>
                                        <input type="text" id='passwordConfirm' name='passwordConfirm' value={passwordConfirm} onChange={onChangePasswordConfirm} className="checkout__input__add" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>이 름 <span>*&nbsp;&nbsp;</span><span className='nameMessage'>{nameMessage}</span></p>
                                        <input type="text" id='name' name='name' value={name} onChange={onChangeName} />
                                    </div>
                                    <Postcode onChangeAddress={onChangeAddress} />
                                    <div className="checkout__input">
                                        <p>생년월일<span>*&nbsp;&nbsp;</span><span className='birthMessage'>{birthMessage}</span></p>
                                        <input type="date" id='birth' name='birth' value={birth} onChange={onChangeBirth} />
                                    </div>

                                    <div>
                                        <p style={{ color: 'black' }}>성 별<span style={{ color: 'red' }}>*&nbsp;&nbsp;</span><span style={{ color: 'red' }} className='genderMessage'>{genderMessage}</span></p>
                                        남<input style={{ textAlign: 'left' }} type="radio" id="male" name="gender" onChange={(e) => setGender(e.target.value)} value="1" />&nbsp;&nbsp;&nbsp;
                                        여<input style={{ textAlign: 'left' }} type="radio" id="female" name="gender" onChange={(e) => setGender(e.target.value)} value="2" />
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>핸드폰 번호<span>*&nbsp;&nbsp;</span><span className='phoneMessage'>{phoneMessage}</span></p>
                                                <input type="text" id='phone' name='phone' value={phone} onChange={addHyphen} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>Email<span>*&nbsp;&nbsp;</span><span className='emailMessage'>{emailMessage}</span></p>
                                                <input type="text" id='email' name='email' value={email} onChange={onChangeEmail} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>신 장<span>*&nbsp;&nbsp;</span><span className='heightMessage'>{heightMessage}</span></p>
                                                <input type="text" id='height' name='height' value={height} onChange={onChangeHeight} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>체 중<span>*&nbsp;&nbsp;</span><span className='weightMessage'>{weightMessage}</span></p>
                                                <input type="text" id='weight' name='weight' value={weight} onChange={onChangeWeight} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <button type="button" className="site-btn btn-join" style={{ textAlign: 'center' }} onClick={(e) => register()}>회원가입</button>
                                    </div>

                                </div>
                            </div>
                    </div>
                </div>
            </section>
            {/* Checkout Section End */}
        </>
    );
};

const Postcode = ({ onChangeAddress }) => {
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
            <input value={postcode} id='address1' name='address1' readOnly placeholder="우편번호" />
            <button type='button' className='site-btn cart-btn cart-btn-right' onClick={toggle}>우편번호 검색</button>
            <br />
            <input value={address} id='address2' name='address2' readOnly placeholder="도로명 주소" />
            <br />
            <Modal isOpen={isOpen} ariaHideApp={false}>
                <DaumPostcode onComplete={completeHandler} height="100%" />
            </Modal>
            <input type="text" id='address3' name='address3' onChange={changeHandler} value={addressDetail} placeholder="상세주소" />
            <br />
        </div>
    )
}

export default JoinForm;