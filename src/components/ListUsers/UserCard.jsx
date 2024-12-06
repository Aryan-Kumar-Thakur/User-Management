import React, { useEffect, useState } from 'react'
import "./userCard.css"
import { Link, useNavigate } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { DELETE_USER_RESET } from '../../slice/userSlice';
import { clearErrors } from '../../actions/authenticationActions';



const UserCard = ({ user }) => {

    return (
        <>
            <div className='productCard'>
                <img src={user.avatar} alt={user.first_name} />
                <p>{user.first_name + " " + user.last_name}</p>
                <div className='btn'>
                    <Link to={`/update/${user.id}`} className='editbtn'><EditIcon /></Link>
                    <Link to={`/delete/${user.id}`} className='delbtn'><DeleteIcon /></Link>
                </div>
            </div>
        </>
    )
}

export default UserCard