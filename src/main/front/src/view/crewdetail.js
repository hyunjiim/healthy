import React, { useEffect, useState } from "react";
import axios from "axios";
import CrewList from "./crew";
import { useParams } from "react-router-dom";

const CrewDetail = () => {
    const { idx } = useParams();//crew/detail/:idx와 동일한 변수명으로 데이터 꺼낼 수 있음
    const [crewList, setCrewList] = useState({});
    const [changePage, setChangePage] = useState("info");
    
    
    const getCrewList = async () => {
        try {
            const resp = await axios.get(`//localhost:3001/crew/detail/${idx}`);
            setCrewList(resp.data.data);
        } catch (error) {
            console.error('Error fetching crew list:', error);
        }
    };
    
    
    useEffect(() => {
        getCrewList();
    }, []);
    
    const InfoChangePage = () =>{
        setChangePage("info");
    }
    const ReviewChangePage = () =>{
        setChangePage("review");
    }


    return (
        <>
            <section class="product-details spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6">
                            <div class="product__details__pic">
                                <div class="product__details__pic__item">
                                    <img class="product__details__pic__item--large" src="img/product/details/product-details-1.jpg" alt="" />
                                </div>
                                <div class="product__details__pic__slider owl-carousel">
                                    <img data-imgbigurl="img/product/details/product-details-2.jpg" src="img/product/details/thumb-1.jpg" alt="" />
                                    <img data-imgbigurl="img/product/details/product-details-3.jpg" src="img/product/details/thumb-2.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="product__details__text">
                                <h3>{crewList.subject}</h3>
                                <div class="product__details__rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star-half-o"></i>
                                    <span>(18 reviews)</span>
                                </div>
                                <p>{crewList.content}</p>
                                <a href="#" class="primary-btn">참여하기</a>
                                <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
                                <ul>
                                    <li><b>모집기간</b> <span>{crewList.regDate}</span></li>
                                    <li><b>모집인원</b> <span>{crewList.count}/{crewList.enjoyCount}</span></li>
                                    <li><b>위치</b> <span>{crewList.location}</span></li>
                                    <li><b>친구랑 함께하기</b>
                                        <div class="share">
                                            <a href="#"><i class="fa fa-facebook"></i></a>
                                            <a href="#"><i class="fa fa-twitter"></i></a>
                                            <a href="#"><i class="fa fa-instagram"></i></a>
                                            <a href="#"><i class="fa fa-pinterest"></i></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <div className="product__details__tab">
               
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                            aria-selected="false"
                            onClick={InfoChangePage}>Information</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                            aria-selected="false"
                            onClick={ReviewChangePage}>Reviews <span>(1)</span></a>
                    </li>
                </ul>
            </div>
            {changePage === "info" && <CrewInfo />}
            {changePage === "review" && <CrewReview />}
        </>
    );
}

const CrewInfo = () => {
    return (
        <div class="col-lg-12">
            <div class="tab-pane" id="tabs-2" role="tabpanel">
                <div class="product__details__tab__desc">
                    <br>
                    </br>
                    <h2 style={{textAlign:"center"}}>Products Infomation</h2>
                    <br/>
                    <p style={{textAlign:"center"}}>#런린이들의 슬로 러닝 천국</p>
                    <br/>
                </div>
            </div>
        </div>
    );
}


const CrewReview = () => {
    const [contact, setContact] = useState(false);

    const handleContactClick = () => {
        setContact(!contact);
    };
    return (
        <div class="tab-pane" id="tabs-3" role="tabpanel">
            <div class="product__details__tab__desc">
                <br/>
                <h3 style={{textAlign:"center"}}>리뷰글 </h3>
                <div class="blog__details__content">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="blog__details__author">
                                <div class="blog__details__author__text">
                                    
                                    <h6>작성자 id
                                        <span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-half-o"></i>
                                        </span>
                                    </h6>
                                    <br />
                                    <ul>
                                        <li><span>Categories:</span> 러닝</li>
                                    </ul>
                                    <br />
                                    <p>너무 좋았습니다. 다음에 또 하고싶네요</p>
                                </div>

                                {/* <div class="btn" style="text-align: right; width: 100%;"> */}
                                <div>
                                    <button class="site-btn">수정</button>
                                    <button class="site-btn">삭제</button>
                                    <button class="site-btn" onClick={handleContactClick}>답글달기</button>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div class="btn" style="text-align: right; width: 100%;"> */}
                <div>
                    <button type="submit" class="site-btn" onClick={handleContactClick}>리뷰쓰기</button>
                </div>
                {/* <!-- Contact Form Begin --> */}
                {/* contact이 true일 때에만 <Contact /> 컴포넌트를 렌더링 */}
                {contact && <Contact />}
            </div>
        </div>
    );
}

const Contact = () => {
  
    return(
        <div class="contact-form spad">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="contact__form__title">
                                    <h4>리뷰작성</h4>
                                </div>
                            </div>
                        </div>
                        <form action="#">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 text-center">
                                    {/* <textarea style="width: 80%;" placeholder="Your message"></textarea> */}
                                    <textarea></textarea>
                                    <br />
                                    {/* <button style="text-align: center;" */}
                                    <button type="submit" class="site-btn">댓글달기</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

    );
    
};
const CrewBoard = () => {
    return (
        <>
            <CrewDetail />
        </>
    );
}
export default CrewBoard;