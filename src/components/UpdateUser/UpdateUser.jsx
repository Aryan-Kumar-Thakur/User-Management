import React, { useEffect, useRef, useState } from 'react'
import './updateUser.css'
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
// import { updateProfile, clearErrors, loadUser } from '../../actions/userActions';
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from '../../slice/userSlice';
// import MetaData from '../layout/MetaData';

const UpdateUser = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()



    const { user, loading, error } = useSelector(
        (state) => state.userDetails
    )

    const {
        loading: updateLoading,
        error: updateError,
        user: updatedUser,
      } = useSelector((state) => state.profile);

    const [firstname, setfirstName] = useState("")
    const [lastname, setlastName] = useState("")
    const [email, setEmail] = useState("")


    const { id } = useParams()

    useEffect(() => {
        if (!user.first_name) {
            dispatch(getUserDetails(id))
        }
        else {
            setfirstName(user.first_name);
            setlastName(user.last_name);
            setEmail(user.email);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
          }
      
          if (updatedUser.updatedAt) {
            alert.success(`User having id = ${id} Updated Successfully`);
            navigate("/");
            dispatch(UPDATE_USER_RESET());
          }
    }, [dispatch, alert, error, navigate, updatedUser, updateError, user, id])

    // const loading = false

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser(id, firstname, lastname, email))
      };
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <div className="newProductContainer">
                        {loading ? (
                            <Loader />
                        ) : (
                            <form
                                className="createProductForm"
                                onSubmit={updateUserSubmitHandler}
                            >
                                <h1>Update User</h1>

                                <div>
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        required
                                        value={firstname}
                                        onChange={(e) => setfirstName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <PersonIcon />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        value={lastname}
                                        onChange={(e) => setlastName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <Button
                                    id="createProductBtn"
                                    type="submit"
                                    // disabled={
                                    //     updateLoading ? true : false || role === "" ? true : false
                                    // }
                                >
                                    Update
                                </Button>
                            </form>
                        )}
                    </div>
        </>
    )
}
        </>
    )
}

export default UpdateUser