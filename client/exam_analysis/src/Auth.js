import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';




function Auth() {

    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [devMode, setDevMode] = useState(true);

    console.log(cookies);

    /** handel submit of form */
    async function handleSubmit (e) {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const data = response.json();
        console.log(data);
    }

    /** For Development, get Hashed Password, since not making sign up */
    async function getHashedPW (e) {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        const data = await response.json();
        console.log(`$$$ Data get Hashed PW: ${JSON.stringify(data)}`);

        if (data.detail) {
            setError(data.detail);
        } else {
            setCookie('Email', data.email);
            setCookie('AuthToken', data.token);

            window.location.reload();
        }
    } 

    return (
        <div className="auth-container">
            <div className='auth-container-box'>
                <form>
                    <h2>Please Log In to Access Exam Analysis</h2>
                    <input type="email" placeholder='email' 
                        onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='password' 
                        onChange={(e) => setPassword(e.target.value)}/>
                    <input type='submit' onClick={(e) => handleSubmit(e)}/>
                    {error && <p>{error}</p>}
                    {devMode && <input type='submit' onClick={(e) => getHashedPW(e)} />}
                </form>
            </div>

        </div>
    );
}

export default Auth;


