import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContextProvider'

const Header = () => {

    // isLogin : 로그인 여부 - Y(true), N(false)
    // logout() : 로그아웃 함수 - setLogin(false)
    const {isLogin, login,  logout} = useContext(LoginContext);

    return (
        <header>
            <div className='logo'>
                <Link to="/">
                    금오공대컴공생
                </Link>
            </div>
                
            <div className="util">
                {
                    isLogin 
                    ?
                    /* 로그인시 */
                    <ul>
                        <li><Link to="/user">마이페이지</Link></li>
                        <li><button className='link' onClick={ () => logout() }>로그아웃</button></li>
                    </ul>
                    :
                    /* 비로그인시 */
                    <ul>
                        <li><Link to="/login">로그인</Link></li>
                        <li><Link to="/join">회원가입</Link></li>
                    </ul>
                }
                
                
            </div>
        </header>
        
    )
}

export default Header