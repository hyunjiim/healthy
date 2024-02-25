import { Link } from 'react-router-dom';
import axios from 'axios';
import {useEffect} from "react";

const React = require('react');


const CrewList = () => {
    const [crewList, setCrewList] = React.useState([]);

    useEffect(() => {
        axios.get('/crew')
            .then(response => setCrewList(response.data.crewList))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {/* 크루리스트 사이드*/}
            <section className="breadcrumb-section set-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>크루모집</h2>
                                <div className="breadcrumb__option">
                                    <Link href="../../public/index.html">우리동네 위치</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* 크루리스트 리스트*/}
            <section className="blog spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-5">
                            <div className="blog__sidebar">
                                <div className="blog__sidebar__item">
                                    <h4>Categories</h4>
                                    <ul>
                                        <li><Link to="">전체보기</Link></li>
                                        <li><Link to="">러닝</Link></li>
                                        <li><Link to="">등산</Link></li>
                                        <li><Link to="">배드민턴</Link></li>
                                        <li><Link to="">헬스</Link></li>
                                    </ul>
                                </div>
                                <div className="blog__sidebar__item">
                                    <h4>최신 크루</h4>
                                    <div className="blog__sidebar__recent">
                                        <Link to="" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="img/blog/sidebar/sr-1.jpg" alt="" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>09 Kinds Of Vegetables<br /> Protect The Liver</h6>
                                                <span>MAR 05, 2019</span>
                                            </div>
                                        </Link>
                                        <Link to="" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="img/blog/sidebar/sr-2.jpg" alt="" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>Tips You To Balance<br /> Nutrition Meal Day</h6>
                                                <span>MAR 05, 2019</span>
                                            </div>
                                        </Link>
                                        <Link to="" className="blog__sidebar__recent__item">
                                            <div className="blog__sidebar__recent__item__pic">
                                                <img src="img/blog/sidebar/sr-3.jpg" alt="" />
                                            </div>
                                            <div className="blog__sidebar__recent__item__text">
                                                <h6>4 Principles Help You Lose <br />Weight With Vegetables</h6>
                                                <span>MAR 05, 2019</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-7">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="blog__item">
                                        {crewList.map((crew, idx) => {
                                            return (
                                                <div className="col-lg-6 col-md-6 col-sm-6" key={crew.img1}>
                                                    <div className="blog__item">
                                                        <div className="blog__item__pic">
                                                            <img src="img/blog/blog-2.jpg" alt=""/>
                                                        </div>
                                                        <div className="blog__item__text">
                                                            <ul>
                                                                <li key={crew.startDate}><i
                                                                    className="fa fa-calendar-o"></i>{crew.startDate}</li>
                                                                <li key={crew.count}><i
                                                                    className="fa fa-comment-o"></i> 모집인원 {crew.count}/{crew.enjoyCount}
                                                                </li>
                                                                <li><i className="fa fa-comment-o"></i> 찜</li>
                                                            </ul>
                                                            <h5><Link to="/crew/detail/${crew.idx}"
                                                                      key={crew.subject}>{crew.subject}</Link></h5>
                                                            <p key={crew.content}>{crew.content}내용 </p>
                                                            <Link to="/crew/detail" className="blog__btn">참여하기</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                                {/* 페이징처리*/}
                                <div className="col-lg-12">
                                    <div className="product__pagination blog__pagination">
                                        <Link to=""><i className="fa fa-long-arrow-left"></i></Link>
                                        <Link to="">1</Link>
                                        <Link to="">2</Link>
                                        <Link to="">3</Link>
                                        <Link to=""><i className="fa fa-long-arrow-right"></i></Link>
                                    </div>
                                    <div>
                                        <Link className="blog__btn">등록하기</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CrewList;