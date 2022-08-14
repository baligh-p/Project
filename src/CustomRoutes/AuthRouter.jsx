import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAtom } from '../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../CustomElement/axios'
const AuthRouter = () => {
    const [user, setUser] = useRecoilState(UserAtom)
    useEffect(() => {
        console.log("route render");
        if (user.isLogged) {
            const url = !localStorage.clid ? `/user/getUserByName/${user.username}` : `/user/getUser/${localStorage.clid}`
            const getUser = () => {
                customAxios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`
                    }
                }).then((res) => {
                    console.log(res.data)
                    setUser({ ...user, id: res.data.id, username: res.data.username, role: res.data.role })
                    localStorage.clid = res.data.id
                })
            }

            customAxios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`
                }
            }).then((response) => {
                if (response.data.type && response.data.type == "token") {
                    if (response.data.error.startsWith("The Token has expired on")) {
                        customAxios.get("/tkn/refresh", {
                            headers: {
                                Authorization: `Bearer ${localStorage.refresh_tkn}`
                            }
                        }).then(async (res) => {
                            if (res.data.type != "token") {
                                localStorage.access_tkn = res.data.access_token
                                localStorage.refresh_tkn = res.data.refresh_token
                                getUser()
                            }
                            else {
                                setUser({ isLogged: false })
                            }
                        })
                    } else {
                        setUser({ isLogged: false })
                    }
                }
                else if (!response.data.success) {
                    getUser()
                }
            })
                .catch((err) => {
                    /*other erros :: Unautorized*/
                })
        }
    }, [])

    if (user.isLogged) return (<Outlet />)
    else return <Navigate to="/Login" />
}

export default AuthRouter