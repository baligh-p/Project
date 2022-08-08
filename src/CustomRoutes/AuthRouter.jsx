import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const AuthRouter = () => {
    const [isLogged, setIsLogged] = useState(true)
    if (isLogged) return (<Outlet />)
    else return <Navigate to="/login" />
}

export default AuthRouter