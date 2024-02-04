import React from 'react';
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
            {/* Humberger Begin */}
            <div className="humberger__menu__overlay"></div>
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo">
                    <Link to="#"></Link>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li><Link to="#"><i className="fa-regular fa-comment-dots"></i><span>3</span></Link></li>
                        <li><Link to="#"><i className="fa fa-shopping-bag"></i> <span>3</span></Link></li>
                    </ul>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__language">
                        <Link to="/mypage">마이페이지</Link>
                    </div>
                    <div className="header__top__right__auth">
                        <Link to="#"><i className="fa fa-user"></i> 로그인/회원가입</Link>
                    </div>
                </div>
                <nav className="humberger__menu__nav mobile-menu">
                    <ul>
                        <li className="active"><Link to="#" >Home</Link></li>
                        <li><Link to="#">운동</Link></li>
                        <li><Link to="#">식단</Link>
                            <ul className="header__menu__dropdown">
                                <li><Link to="#" >Shop Details</Link></li>
                                <li><Link to="#">Shoping Cart</Link></li>
                                <li><Link to="#">Check Out</Link></li >
                                <li><Link to="#">Blog Details</Link></li >
                            </ul >
                        </li >
                        <li><Link to="#" >크루모집</Link></li >
                        <li><Link to="/question" >문의게시판</Link></li >
                    </ul >
                </nav >
                <div id="mobile-menu-wrap"></div>
                <div className="header__top__right__social">
                    <Link to="#"><i className="fa fa-facebook"></i></Link>
                    <Link to="#"><i className="fa fa-twitter"></i></Link>
                    <Link to="#"><i className="fa fa-linkedin"></i></Link>
                    <Link to="#"><i className="fa fa-pinterest-p"></i></Link>
                </div>
            </div >

            {/* //Humberger End */}
            {/* Header */}
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__language">
                                        <div>마이페이지</div>
                                    </div>
                                    <div className="header__top__right__auth">
                                        <Link to="#">로그인/회원가입</Link>
                                    </div>
                                    <div className="header__top__right__auth">
                                        <Link to="#">로그아웃</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <Link to="#"><img src="img/logo.png" alt="#" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link to="#">Home</Link></li>
                                    <li><Link to="#">운동</Link></li>
                                    <li><Link to="#">식단</Link>
                                        <ul className="header__menu__dropdown">
                                            <li><Link to="#">Shop Details</Link></li>
                                            <li><Link to="#">Shoping Cart</Link></li>
                                            <li><Link to="#">Check Out</Link></li>
                                            <li><Link to="#">Blog Details</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link to="#" >크루모집</Link></li>
                                    <li><Link to="#">문의게시판</Link></li>
                                </ul>
                            </nav >
                        </div >
                        <div class="col-lg-3">
                            <div class="header__cart">
                                <ul>
                                    <li><Link to="#">크루</Link></li>
                                    <li><Link to="#">구독하기</Link></li>
                                    <li><Link to="#"><i class="fa fa-comment-dots"></i> <span>3</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div >
                    <div className="humberger__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div >
            </header >
        </>

    );
};

export default Header;