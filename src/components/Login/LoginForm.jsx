import React, { useContext } from 'react'
import './LoginForm.css'
import { LoginContext } from '../../contexts/LoginContextProvider'

const LoginForm = () => {

    const { login } = useContext(LoginContext)

    const onLogin = (e) => {
        e.preventDefault()

        const form = e.target
        const username = form.username
        const password = form.password
        

        login(username, password)
    }

    return (
        <div className='form'>
            <h2 className="login-title">로그인</h2>

            <form className='login-form' onSubmit={ (e) => onLogin(e) }>
                <div>
                    <label htmlFor="name">ID</label>
                    <input type="text" 
                        id='username'
                        placeholder='username'
                        name='username'
                        autoComplete='username'
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        id='password'
                        placeholder='password'
                        name='password'
                        autoComplete='password'
                        required
                    />
                </div>

                <button type = 'submit' className='btn btn--form btn-login'>
                    로그인
                </button>
            </form>
        </div>
    )
}

export default LoginForm