import React, { useEffect } from 'react'
import '../layout/Loader/loader.css'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../slice/userSlice'

const DeleteUser = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()


    const {id} = useParams()

    const {error:deleteError , isDeleted} = useSelector((state)=>state.profile)

    useEffect(()=>{
        if(deleteError){
          alert.error(deleteError)
          dispatch(clearErrors());
        }
        if(isDeleted){
          alert.success(`User having id = ${id} deleted Successfully with status code 204`)
          navigate("/")
          dispatch(DELETE_USER_RESET())
        }
        dispatch(deleteUser(id))
  },[dispatch, alert, deleteError, isDeleted, navigate])
  return (
    <>
    <div className='loading'>
        <div>

        </div>
      </div>
      <div className="loadingText">
        <h1>Website is Loading,Please Wait....</h1>
        <p>Sorry for inconvenience</p>
      </div>
    </>
  )
}

export default DeleteUser