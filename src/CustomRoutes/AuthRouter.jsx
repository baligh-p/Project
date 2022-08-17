import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAtom } from '../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../CustomElement/axios'
import Loader from '../Components/Loader/Loader'
import Notification from '../Components/Notification/Notification'
import UseNotify from "../CustomElement/UseNotify"
const AuthRouter = () => {
    const [user, setUser] = useRecoilState(UserAtom)


    const notify = UseNotify()

    useEffect(() => {
        if (user.isLogged) {
            const url = !localStorage.clid ? `/user/getUserByName/${user.username}` : `/user/getUser/${localStorage.clid}`
            const getUser = () => {
                customAxios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`
                    }
                }).then((res) => {
                    setUser({ ...user, id: res.data.id, username: res.data.username, role: res.data.role })
                    localStorage.clid = res.data.id
                }).catch((err) => {
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
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
                                setUser({ isLogged: false, id: null, username: null, role: null })
                                localStorage.clid = ""
                            }
                        }).catch((err) => {
                            if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                        })
                    } else {
                        setUser({ isLogged: false, id: null, username: null, role: null })
                        localStorage.clid = ""
                    }
                }
                else if (!response.data.success) {
                    getUser()
                }
            })
                .catch((err) => {
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }
    }, [])

    if (user.isLogged) {
        if (!user.role) {
            return <div className='t-h-screen t-w-full t-items-center t-justify-center t-flex t-bg-white'>
                <Loader className="lg:t-mx-0 t-mx-auto" height="70px" size="60px" border="7px" color="#60a5fa" />
            </div>
        }
        else {
            return (<><Notification /><Outlet /></>)
        }
    }
    else return <Navigate to="/Login" />
}

export default AuthRouter