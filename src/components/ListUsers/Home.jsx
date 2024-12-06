import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import Users from './Users'
import Footer from '../layout/Footer/Footer'


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, isAuthenticated, user, error } = useSelector(
        (state) => state.authentication
    )

    const [showAlert, setShowAlert] = useState(loading)

    const navigate = useNavigate()


    useEffect(() => {

        setTimeout(() => {
            setShowAlert(false);
        }, 10000);

        if (!user) {
            navigate("/login")
        }

        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }
    }, [dispatch, error, alert, navigate, user])

    return (
        <>
            {loading ? <Loader /> :
                <>
                        <Users />
                </>
            }
        </>
    )
}

export default Home