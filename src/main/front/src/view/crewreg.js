
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Crew = () => {
    
    const navigate = useNavigate();
    
    
    // 초기값 설정
    const [reg, setReg] = React.useState({
        subject: '',
        crewCount: '',
        category: '',
        creationDate: '',
        deadline: '',
        content: '',
    });
    
    //비구조화 할당시키기
    const { subject, crewCount, creationDate, deadline, content } = reg;
    
    //onchange 이벤트 발생시 기능 구현
    const onChange = (e) => {
       // alert("등록시도");
        setReg({
            // 기존의 reg 라는 뜻 = ... 용법 사용 => 기존 값을 유지하기 위해 추가
            ...reg,
            [e.target.name]: e.target.value,


        });
        console.log(subject,crewCount,creationDate,deadline);
    };
    
    //등록하기 버튼을 누르면 axios를 통해 비동기 통신
    const saveCrew = async () => {
        const headers = {
            'Content-Type' : 'application/json'
        }
        try {
            // Axios를 사용하여 서버에 POST 요청 보내기
            const response = await axios.post('http://localhost:3000/crew', reg);
            alert("response"+response);
            // 성공적으로 서버 응답을 받은 경우
            console.log(response);
            alert('등록 완료');

            // 페이지 이동 (React Router의 navigate 사용)
            navigate('/crew');
        } catch (error) {
            // 오류 발생 시
            alert(reg.subject);
            console.error('AxiosError:', error);
            alert('등록 실패');
        }
    };


    //셀렉트 태그시 이벤트 발생을 위한 코드 작성
    const categoryList = [
        { value: "running", name: "러닝" }
        , { value: "hiking", name: "등산" }
        , { value: "badminton", name: "배드민턴" }
        , { value: "fitness", name: "헬스" }
    ];
    const [category, setCategory] = React.useState("러닝");
    
    const categoryCheck = (e) => {
        setCategory(e.target.value);
    };
    
    const selectStyle = {
        control : (provide, state) => ({
            ...provide,
            width: '1000px'
        }),
    };
    
    
    return (
        <section className="checkout spad">
            <div className="container">
                <div className="checkout__form">
                    <h4 className="text-center">크루 등록</h4>
                    <form className="regForm" onSubmit={(e) => onChange(e) }>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="checkout__input">
                                    <label htmlFor="name">등록자 아이디</label>
                                    <input type="text"
                                           id="id"
                                           name="name"
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <label htmlFor="name">크루명<span>*</span></label>
                                            <input
                                                style={{color:"black"}}
                                                placeholder="크루명을 입력해주세요."
                                                type="text"
                                                name='subject'
                                                value={reg.subject}
                                                onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>모집 인원<span>*</span></p>
                                            <input
                                            style={{color:"black"}}
                                                placeholder="숫자만 입력 가능합니다."
                                                type="number"
                                                name='crewCount'
                                                value={reg.crewCount}
                                                onChange={onChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout__input">
                                    <p>카테고리<span>*</span></p>
                                    <label>
                                        <select styles={selectStyle}
                                            value={category} onChange={categoryCheck}>
                                            {categoryList.map((item) => {
                                                return (
                                                    <option value={item.value} key={item.value}>
                                                        {item.name}
                                                    </option>)
                                            })}
                                        </select>
                                    </label>
                                </div>
                                <div className="checkout__input">
                                    <p>위치<span>*</span></p>
                                    <input type="text" style={{color:"black"}} placeholder="Street Address" className="checkout__input__add" />
                                </div>
                                <div className="checkout__input">
                                    <p>모집 기간<span>*</span></p>
                                    <input
                                        type="date"
                                        name='creationDate'
                                        value={reg.creationDate}
                                        onChange={onChange}
                                        style={{color:"black"}}
                                        />
                                    <input
                                        style={{color:"black"}}
                                        type="date"
                                        name='deadline'
                                        value={reg.deadline}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="checkout__input">
                                    <p>내용<span>*</span></p>
                                    <textarea
                                        style={{width: "100%", height: "270px", resize:"none", border: "1px solid #ebebeb"}}
                                        placeholder="크루 소개글을 작성해주세요."
                                        name="content"
                                        cols="30"
                                        rows="10"
                                        value={reg.content}
                                        onChange={onChange}
                                    ></textarea>
                                </div>
                                {/* <div className="checkout__input">
                                    <p>파일 첨부<span>*</span></p>
                                    <input class="checkout__input" type="text" />
                                    <button class="site-btn" onClick={uploadCrew}>파일첨부</button>
                                </div> */}
                                <hr />
                                <div style={{textAlign:"center"}}>
                                <button 
                                    onClick={saveCrew} 
                                    className="site-btn text-center"
                                    >등록</button>
                                    </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Crew;