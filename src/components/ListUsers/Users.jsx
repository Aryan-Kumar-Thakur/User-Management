import React, { useEffect, useState } from 'react'
import "./users.css"
import { useSelector, useDispatch } from "react-redux"
import { getallUsers } from '../../actions/userActions'
import Loader from '../layout/Loader/Loader'
import UserCard from './UserCard'
import Pagination from "react-js-pagination"
import { useAlert } from "react-alert"
import { CLEAR_ERRORS } from '../../slice/authenticationSlice'


const Users = () => {
    const dispatch = useDispatch();
    const alert = useAlert()

    const [currentPage, setcurrentPage] = useState(1)

    const { users, loading, error, usersCount, resultPerPage } = useSelector(state => state.allUsers)


    const setCurrentPageNo = (e) => {
        setcurrentPage(e);
    }



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERRORS())
        }
        dispatch(getallUsers(currentPage))
    }, [dispatch, error, currentPage])

    let count = usersCount
    return (
        <>
            {loading ? <Loader /> :
                <>
                {/* <MetaData title="PRODUCTS -- SHIPSHOP"></MetaData> */}
                    <div className="products-page">
                        <h2 className="productsHeading">Users</h2>
                        <div className="products">
                            {users &&
                                users.map((user) => (
                                    <UserCard key={user.id} user={user} />
                                ))}
                        </div>
                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={usersCount}
                                    onChange={setCurrentPageNo}
                                    size="lg"
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </div>
                </>
            }
        </>
    )
}

export default Users