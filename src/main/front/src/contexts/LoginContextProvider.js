import {createContext, useContext, useState} from "react";
import Cookies from "js-cookie";
import reissue from "../services/reissue";

//Context 생성
//Context : 트리 단계마다 명시적으로 props를 넘겨주지 않아도 컴포넌트 트리 전체에 데이터 제공 가능
// => 즉, 전역적으로 데이터를 공유할 수 있는 기능이라 생각하면 됨!
export const LoginContext = createContext();
//출력하고 싶은 이름
LoginContext.displayName = 'LoginContextName'

const LoginContextProvider = ( {children} ) => {
    //context value : 로그인 여부, 로그아웃 함수
    const [isLogin, setIsLogin] = useState(!window.localStorage.getItem("accessToken"));

    //유저 정보 - 객체로 초기화
    const [userInfo, setUserInfo] = useState( window.localStorage.getItem("id"));

    //권한 정보
    const [roles, setRoles] = useState( {isUser : false, isRegister: false, isAdmin: false})

    //아이디 저장
    const [rememberUserId, setRememberUserId] = useState();

    /*
    //로그인 체크 - 쿠키에 jwt가 있는지 확인하고, jwt로 사용자 정보 요청
    const loginCheck = async () => {

        //쿠키에서 jwt 토큰 가져오기
        const accessToken = localStorage.getItem("accessToken")

        console.log(`accessToken : ${accessToken}`);

        //header에 jwt 담기
        //accessToken이 없는 경우
        if(!accessToken) {
            console.log(`로컬 스토리지에 accessToken이 없음`)
            await reissue();
            return;
        }

        try {
            //accessToken이 있는 경우
            //사용자 정보 요청
            let response = localStorage.getItem("id");
            let data = response.data;

            //인증 성공 => 로그인 세팅
            loginSetting(data, accessToken);

        }catch (error) {
            console.error('인증실패  : ', error);
            logoutSetting();
        }
    }

     */

    /*
    //로그인 세팅
    //userData, accessToken(jwt)
    const loginSetting = (userData, accessToken) => {
        const { idx, id, authList } = userData
        const roleList = authList.map((auth) => auth.auth)

        //로그인 여부
        setIsLogin(true);

        //유저정보 세팅
        const updateUserInfo = {idx, id, roleList}
        setUserInfo(updateUserInfo);

        //권한정보 세팅
        const updateRoles = { isUser : false, isAdmin : false }

        roleList.forEach( (role) => {
            if( role == 'ROLE_USER') updateRoles.isUser = true
            if( role == 'ROLE_ADMIN') updateRoles.isAdmin = true
        })


    }

     */


    /*

    //로그아웃 세팅
    const logoutSetting = () => {
        //쿠키 초기화
        Cookies.remove("refreshToken")

        //로그인 여부 : false
        setIsLogin(false)

        //유저 정보 초기화
        setUserInfo(null)

        //권한 정보 초기화
        setRoles(null)

    }

     */


    const logout = () => {
        setIsLogin(false)
    }


    return (
        <LoginContext.Provider value={ {isLogin, setIsLogin, userInfo, setUserInfo, logout} }>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext);
export default LoginContextProvider;
