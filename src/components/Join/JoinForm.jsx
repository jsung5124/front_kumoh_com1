import React from 'react'
import './JoinForm.css'

const JoinForm = ({ join }) => {

    const onJoin = (e) => {
        e.preventDefault()
        const form = e.target
        const userId = form.username.value
        const userPw = form.password.value
        const nickname = form.nickname.value
        const email = form.email.value

        console.log(userId, userPw, nickname, email)

        join( {userId, userPw, nickname, email})
    }

    return (
        <div className='form'>
            <h2 className="login-title">회원가입</h2>

            <form className='login-form' onSubmit={ (e) => onJoin(e) }>
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

                <div>
                    <label htmlFor="nickname">Nickname</label>
                    <input type="text" 
                        id='nickname'
                        placeholder='nickname'
                        name='nickname'
                        autoComplete='nickname'
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                        id='email'
                        placeholder='email'
                        name='email'
                        autoComplete='email'
                        required
                    />
                </div>

                <button type = 'submit' className='btn btn--form btn-login'>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default JoinForm