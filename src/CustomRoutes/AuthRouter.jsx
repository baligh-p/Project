import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAtom } from '../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
const AuthRouter = () => {
    const [user, setUser] = useRecoilState(UserAtom)
    if (user.isLogged) return (<Outlet />)
    else return <Navigate to="/Login" />
}

export default AuthRouter