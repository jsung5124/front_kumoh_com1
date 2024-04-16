import React, { createContext, useEffect, useState } from "react";
import api from "../apis/api";
import Cookies from "js-cookie";
import * as auth from "../apis/auth";

export const LoginContext = createContext();
LoginContext.displayName = 'LoginContextName'

const LoginContextProvider = ({ children }) => {

    // State
    // 로그인 여부
    const [isLogin, setLogin] = useState(false);
    // 유저 정보
    const [userInfo, setUserInfo] = useState(false);
    // 권한 정보
    const [roles, setRoles] = useState({isUser : false, isAdmin : false})

    // 로그인 체크
    const loginCheck = async () => {

        const accessToken = Cookies.get("accessToken")
        console.log(`accessToken : ${accessToken}`)
        
        // 토큰이 없음
        if( !accessToken ) {
            console.log(`쿠키에 accessToken이 없음`);
            logoutSetting()
            return
        }

        // 토큰이 있음 -> 헤더에 토큰 담기
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 정보 요청
        let response
        let data
        response = await auth.info()
        data = response.data
        console.log(`data : ${data}`);
        
        //인증 성공
        loginSetting(data, accessToken)

    }


    // 로그인
    // const login = async (username, password) => {
        
    //     console.log(`username : ${username}`);
    //     console.log(`password : ${password}`);

    //     const response = await auth.login(username, password)
    //     const data = response.data
    //     const status = response.staus
    //     const headers = response.headers
    //     const authroization = headers.authroization
    //     const accessToken = authroization.replace("Bearer ","")

    //     console.log(`data : ${data}`);
    //     console.log(`status : ${status}`);
    //     console.log(`headers : ${headers}`);
    //     console.log(`jwt : ${accessToken}`);

    //     // 로그인 성공
    //     if( status == 200 ) {
    //         // 쿠키에 accessToken(jwt) 저장
    //         Cookies.set("accessToken", accessToken)

    //         // 로그인 체크
    //         loginCheck()

    //         alert(`로그인 성공`)
    //     }
    // }

    // 로그인
    const login = async (username, password) => {
        try {
            const CircularJSON = require('circular-json');
            
            const myObject = {
                'userId': username,
                'password': password
            };

            const userData = CircularJSON.stringify(myObject) 

            const response = await auth.login(userData);
            const data = response.data;
            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", "");

            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            console.log(`headers : ${headers}`);
            console.log(`jwt : ${accessToken}`);

            // 로그인 성공
            if (status === 200) {
                // 쿠키에 accessToken(jwt) 저장
                Cookies.set("accessToken", accessToken);

                // 로그인 체크
                loginCheck();

                alert(`로그인 성공`);
            }

            if (status === 401)
            {
                alert(`입력값 오류`);
            }
        } catch (error) {
            if (error.response) {
                // 서버로부터 응답이 왔지만 오류가 있는 경우
                console.error("서버 응답 오류:", error.response.data);
            } else if (error.request) {
                // 요청이 완료되었지만 응답을 받지 못한 경우
                console.error("요청 오류:", error.request);
            } else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
                console.error("오류 메시지:", error.message);
            }
            console.error("로그인 오류:", error);
        }
    };


    // 로그인 세팅
    const loginSetting = (userData, accessToken) => {
        const { no, userId, authList } = userData
        const roleList = authList.mpa((auth) => auth.auth)

        console.log(`no : ${no}`);
        console.log(`userId : ${userId}`);
        console.log(`authList : ${authList}`);
        console.log(`roleList : ${roleList}`);

        // axios 객체의 header
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        

        // 로그인 여부 : true
        setLogin(true)

        // 유저정보 세팅
        const updatedUserInfo = {no, userId, roleList}
        setUserInfo(updatedUserInfo)

        // 권한정보 세팅
        const updatedRoles = { isUser : false, isAdmin : false }

        roleList.forEach( (role) => {
            if( role == 'ROLE_USER' ) updatedRoles.isUser = true
            if( role == 'ROLE_ADMIN' ) updatedRoles.isAdmin = true
        })
        setRoles(updatedRoles)
    }

    // 로그아웃 세팅
    const logoutSetting = () => {
        // axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;

        // 쿠키 초기화
        Cookies.remove("accessToken")

        // 로그인 여부 : false
        setLogin(false)

        // 유저 정보 초기화
        setUserInfo(null)

        // 권한 정보 초기화
        setRoles(null)
    }

    const logout = () => {
        setLogin(false)
    }

    useEffect( () => {
        // setTimeout( () => {
        //     setLogin(true)
        // }, 3000)
    }, [])

    return (
        <LoginContext.Provider value={ {isLogin, login,  logout} }>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider