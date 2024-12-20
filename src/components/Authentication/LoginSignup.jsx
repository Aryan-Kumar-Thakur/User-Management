import React, { useEffect, useRef, useState } from 'react'
import "./LoginSignup.css"
import Loader from '../layout/Loader/Loader'
import { Link, redirect, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { login, register } from '../../actions/authenticationActions';
import { clearErrors } from '../../actions/authenticationActions';


const LoginSignup = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.authentication
    )

    const redirect = "/"

    const token = localStorage.getItem("token") ?
        JSON.parse(localStorage.getItem("token")) : null

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isAuthenticated && token) {
            alert.success("Login Successfully")
            navigate(redirect)
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect])


    const loginTab = useRef(null)
    const registerTab = useRef(null)
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("eve.holt@reqres.in")
    const [loginPassword, setLoginPassword] = useState("cityslicka")
    const [avatar, setAvatar] = useState("/Profile.png")
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = user;

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("username", name);
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(register(myForm))
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        else {
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder="Email" required value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder="Password" required value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Login" className='loginBtn' />
                            </form>
                            <form className='signUpForm' ref={registerTab} encType='multipart/form-data'
                                onSubmit={registerSubmit}>
                                <div className="signUpName">
                                    <AccountCircleIcon />
                                    <input type="text" placeholder="Name" name='name' required value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input type="email" placeholder="Email" name='email' required value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input type="password" placeholder="Password" name='password' required value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className='signUpBtn' disabled={loading ? true : false} />
                            </form>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default LoginSignup