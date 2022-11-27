import React, { useState, useRef, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { customAxios } from '../../CustomElement/axios'
import useNotify from '../../CustomElement/UseNotify'
import { useRecoilState } from "recoil"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { Navigate } from 'react-router-dom'
const AddUser = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [role, setRole] = useState("ROLE_USER")
    const [name, setName] = useState("")
    const [valid, setValid] = useState(false)
    const [validConfirm, setValidConfirm] = useState(false)
    const [validChange, setValidChange] = useState(false)
    const [validConfirmChange, setValidConfirmChange] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [users, setUsers] = useState([])
    const changerPWDContainer = useRef(null)
    const [isLoadingChangePWD, setIsLoadingChangePWD] = useState(false)
    const [changePassword, setChangePassword] = useState("")
    const [confirmChange, setConfirmChange] = useState("")

    const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null)

    const [user, setUser] = useRecoilState(UserAtom)

    const notify = useNotify()

    const container = useRef(null)



    useEffect(() => {


        const getRequest = () => {
            customAxios.get(`/user/getUsers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                if (Array.isArray(response.data)) {
                    setUsers(response.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
        }
        if (!toggle) {
            customAxios.get(`/user/getUsers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    if (response.data.type && response.data.type == "token") {
                        if (response.data.error.startsWith("The Token has expired on")) {
                            customAxios.get("/tkn/refresh", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.refresh_tkn}`,
                                },
                            }).then(async (res) => {
                                if (res.data.type != "token") {
                                    localStorage.access_tkn = res.data.access_token
                                    localStorage.refresh_tkn = res.data.refresh_token
                                    //fn
                                    getRequest()
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
                    else if (response.status == 200) {
                        if (Array.isArray(response.data)) {
                            setUsers(response.data)
                        }
                        else {
                            notify("error", "Erreur d'execution de requete")
                        }
                    }
                    else {
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }
    }, [toggle])


    useEffect(() => {
        if (password.length < 6 && password != "") {
            setValid(false)
        }
        else {
            setValid(true)
        }
        if (password != confirm) {
            setValidConfirm(true)
        }
        else {
            setValidConfirm(false)
        }
    }, [password, confirm])

    useEffect(() => {
        if (changePassword.length < 6 && changePassword != "") {
            setValidChange(false)
        }
        else {
            setValidChange(true)
        }
        if (changePassword != confirmChange) {
            setValidConfirmChange(true)
        }
        else {
            setValidConfirmChange(false)
        }
    }, [changePassword, confirmChange])



    const handleFocus = (e) => {
        const input = e.target
        if (input.value == "") {
            const label = input.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(-4px)"
            label.style.left = "0px"
            label.style.fontSize = "12px"
            input.classList.replace("t-border-stone-200", "t-border-blue-400")
            label.classList.replace("t-text-stone-700", "t-text-blue-400")
        }
    }
    const handleBlur = (e) => {
        const input = e.target
        const label = input.parentNode.children[0]
        if (input.value == "") {
            label.style.left = ""
            label.style.transform = ""
            label.style.fontSize = ""
            input.classList.replace("t-border-blue-400", "t-border-stone-200")
            label.classList.replace("t-text-blue-400", "t-text-stone-700")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        var submit = true
        if (!username || password != confirm || !name || !role) {
            submit = false
        }
        if (submit) {
            setToggle(true)
            setIsLoading(true)
            const data = JSON.stringify({
                username: username,
                password: password,
                name: name,
                role: role,
            })

            const postRequest = (data) => {
                customAxios.post(`/saveUser`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    setIsLoading(false)
                    if (response.data.id) {
                        setToggle(false)
                        setName("")
                        setPassword("")
                        setRole("ROLE_USER")
                        setUsername("")
                        setConfirm("")
                        container.current.reset()
                        container.current.style.display = "none"
                        notify("success", "Utilisateur est Ajouté avec succés")
                    }
                    else if (response.data.success == "false") {
                        notify("warning", "Nom d'utilisateur deja existe")
                    }
                    else {
                        notify("error", "Erreur d'execution de requéte")
                    }
                })
            }

            customAxios.post(`/saveUser`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    if (response.data.type && response.data.type == "token") {
                        if (response.data.error.startsWith("The Token has expired on")) {
                            customAxios.get("/tkn/refresh", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.refresh_tkn}`,
                                },
                            }).then(async (res) => {
                                if (res.data.type != "token") {
                                    localStorage.access_tkn = res.data.access_token
                                    localStorage.refresh_tkn = res.data.refresh_token
                                    //fn
                                    postRequest(data)
                                }
                                else {
                                    setUser({ isLogged: false, id: null, username: null, role: null })
                                    localStorage.clid = ""
                                }
                            }).catch((err) => {
                                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                            })
                        } else {
                            setIsLoading(false)
                            setUser({ isLogged: false, id: null, username: null, role: null })
                            localStorage.clid = ""
                        }
                    }
                    else if (response.status == 200) {
                        setIsLoading(false)
                        if (response.data.id) {
                            setToggle(false)
                            setName("")
                            setPassword("")
                            setRole("ROLE_USER")
                            setUsername("")
                            setConfirm("")
                            container.current.reset()
                            container.current.style.display = "none"
                            notify("success", "Utilisateur est Ajouté avec succés")
                        }
                        else if (response.data.success == "false") {
                            notify("warning", "Nom d'utilisateur deja existe")
                        }
                        else {
                            notify("error", "Erreur d'execution de requéte")
                        }
                    }
                    else {
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    setIsLoading(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }

    }


    const formatData = (d) => {
        var date = d.split("T")[0].split("-")
        date = date[2] + "/" + date[1] + "/" + date[0]
        var time = d.split("T")[1].split(":")
        time = (time[0] != "23" ? (Number(time[0]) + 1) : "00") + ":" + time[1]
        return time + " " + date
    }

    const changePwd = async (user) => {
        await setSelectedUserForUpdate(user)
        changerPWDContainer.current.style.display = "flex"
    }
    const handleResetPWD = (e) => {
        e.preventDefault()
        var submit = true
        if (changePassword != confirmChange || changePassword.length < 6) {
            submit = false
        }
        if (submit) {
            setIsLoadingChangePWD(true)
            const data = JSON.stringify({
                userId: selectedUserForUpdate.id,
                newPassword: changePassword,
                oldPassword: null,
            })

            const postRequest = (data) => {
                customAxios.put(`/user/adminChangePassword`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    setIsLoadingChangePWD(false)
                    if (response.data.success) {
                        setChangePassword("")
                        setConfirmChange("")
                        changerPWDContainer.current.reset()
                        changerPWDContainer.current.style.display = "none"
                        notify("success", "mot de passe de " + selectedUserForUpdate.username + " est modifié avec succé")
                    }
                    else {
                        notify("error", "Erreur d'execution de requéte")
                    }
                })
            }

            customAxios.put(`/user/adminChangePassword`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.type && response.data.type == "token") {
                        if (response.data.error.startsWith("The Token has expired on")) {
                            customAxios.get("/tkn/refresh", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.refresh_tkn}`,
                                },
                            }).then(async (res) => {
                                if (res.data.type != "token") {
                                    localStorage.access_tkn = res.data.access_token
                                    localStorage.refresh_tkn = res.data.refresh_token
                                    //fn
                                    postRequest(data)
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
                    else if (response.status == 200) {
                        setIsLoadingChangePWD(false)
                        if (response.data.success) {
                            setChangePassword("")
                            setConfirmChange("")
                            changerPWDContainer.current.reset()
                            changerPWDContainer.current.style.display = "none"
                            notify("success", "mot de passe de " + selectedUserForUpdate.username + " est modifié avec succé")
                        }
                        else {
                            notify("error", "Erreur d'execution de requéte")
                        }
                    }
                    else {
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setIsLoadingChangePWD(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }
    }
    if (user?.role == "ROLE_ADMIN") return (
        <div className='lg:t-w-[79.5%] t-w-full t-h-full t-ml-auto t-relative lg:t-top-[25px] t-top-[5rem]'>
            <div className='t-w-10/12 t-mb-5 t-mx-auto t-space-x-16 t-hidden lg:t-flex'>
                <div className='wdj t-bg-blue-500 t-flex t-items-center t-justify-center t-h-28 t-shadow-lg t-shadow-neutral-300 t-rounded-md t-w-52'>
                    <div className='t-flex-none'>
                        <svg className='t-fill-white t-h-20 t-w-20 t-mr-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101"><path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z" /></svg>
                    </div>
                    <div className='t-ml-2 t-overflow-hidden'>
                        <p className='t-text-[25px] t-text-white t-font-body t-font-bold t-break-words'>{users ? users?.filter((element) => element.role != "ROLE_ADMIN").length : 0}</p>
                        <p className='t-text-[15px] t-text-white t-font-body'>Utilisateurs</p>
                    </div>
                </div>

                <div className='wdj t-bg-pink-500 t-flex t-items-center t-justify-center t-h-28 t-shadow-lg t-shadow-neutral-300 t-rounded-md t-w-52'>
                    <img src="/assets/icons/setting.png" className='t-h-16 t-w-16' />
                    <div className='t-ml-7 t-overflow-hidden'>
                        <p className='t-text-[25px] t-text-white t-font-body t-font-bold t-break-words'>{users ? users?.filter((element) => element.role == "ROLE_ADMIN").length : 0}</p>
                        <p className='t-text-[15px] t-text-white t-font-body'>Admins</p>
                    </div>
                </div>
            </div>
            <div className='t-w-[97%] addUserTable t-mx-auto t-flex t-flex-col'>
                <form ref={container} onClick={(e) => { if (e.target == container.current) container.current.style.display = "none" }} style={{ display: "none" }} className='lg:t-w-[79.5%] lg:t-min-screen t-w-full lg:t-h-full t-bg-neutral-200/30 lg:t-fixed t-overflow-scroll t-z-20 t-top-0 t-right-0 t-flex t-items-center t-justify-center'>
                    <div className='t-bg-white lg:t-w-1/2 t-w-full t-shadow-lg t-shadow-neutral-200 lg:t-rounded-lg t-p-6'>
                        <div onClick={() => { container.current.style.display = "none" }} className='t-w-full t-flex t-justify-end t-relative t-bottom-7 t-left-5 lg:t-left-7 t-cursor-pointer t-h-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                                <path d="m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z" />
                            </svg>
                        </div>
                        <div className='t-w-full t-mb-7'>
                            <h2 className='t-tracking-widest t-text-center t-mx-auto t-font-bold t-text-blue-500 t-text-[28px]'>Ajouter un Utilisateur</h2>
                        </div>
                        <div className='t-z-10 lg:t-w-8/12 t-w-[97%] md:t-w-7/12 t-mx-auto'>
                            <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-6'>
                                <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-1 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Nom</label>
                                <input onInput={(e) => { setName(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="text" className={` t-bg-white t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-1 t-border-b-2 t-border-stone-200`} />
                            </div>
                            <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-6'>
                                <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-1 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Nom d'Utilisateur</label>
                                <input onInput={(e) => { setUsername(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="text" className="t-bg-white t-duration-150 t-outline-none t-h-10 t-text-[17px] lg:t-text-base t-px-1 t-border-b-2 t-border-stone-200 before:t-z-50 before:t-left-0" />
                            </div>
                            <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-6'>
                                <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-1 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Mot de passe</label>
                                <input onInput={(e) => { setPassword(e.target.value); }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-1 t-border-b-2 t-border-stone-200" />
                            </div>
                            <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-8'>
                                <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-1 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Confirmer Mot de Passe</label>
                                <input onInput={(e) => { setConfirm(e.target.value); }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-1 t-border-b-2 t-border-stone-200" />
                            </div>
                        </div>
                        <div className='t-mx-auto lg:t-w-8/12 t-w-[97%] md:t-w-7/12 t-mb-3'>
                            <select className='t-w-full t-text-center t-p-1.5 t-cursor-pointer t-outline-none t-border-2 t-border-blue-400 t-text-blue-400' defaultValue="ROLE_USER" onChange={(e) => { setRole(e.target.value) }}>
                                <option value="ROLE_USER">Utilisateur</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                        {!valid && <div className={`t-fill-red-500 t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-mt-6 t-flex t-items-center t-space-x-1 `}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                            </svg>
                            <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold'>Le Mot de Passe doit avoir au minimum 6 caracteres</p>
                        </div>}
                        {validConfirm && <div className={`t-fill-red-500 t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-flex t-items-center t-space-x-1 `}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                            </svg>
                            <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold'>Veuillez confirmer correctement votre mot de passe</p>
                        </div>}
                        <div className='t-z-10 t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-mt-10'>
                            {!isLoading && (<button onClick={handleSubmit} disabled={!username || password.length < 6 || password != confirm || !name || !role} className={`t-will-change-auto ${(username && password.length >= 6 && password == confirm && name && role) ? "hover:t-text-blue-400 hover:t-bg-white hover:t-shadow-none" : "t-opacity-30 t-cursor-not-allowed"} t-border-blue-400 t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-28 t-w-full t-text-white t-bg-blue-400 t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Créer</button>)
                                || (<Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
                        </div>
                    </div>
                </form>
                {/*  */}
                <form ref={changerPWDContainer} onClick={(e) => { if (e.target == changerPWDContainer.current) changerPWDContainer.current.style.display = "none" }} style={{ display: "none" }} className='lg:t-w-[79.5%] lg:t-min-screen t-w-full lg:t-h-full t-bg-neutral-200/30 lg:t-fixed t-overflow-scroll t-z-20 t-top-0 t-right-0 t-flex t-items-center t-justify-center'>
                    <div className='t-bg-white lg:t-w-1/2 t-w-full t-shadow-lg t-shadow-neutral-200 lg:t-rounded-lg t-p-6'>
                        <div onClick={() => { changerPWDContainer.current.style.display = "none" }} className='t-w-full t-flex t-justify-end t-relative t-bottom-7 t-left-5 lg:t-left-7 t-cursor-pointer t-h-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                                <path d="m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z" />
                            </svg>
                        </div>
                        <div className='t-w-full t-mb-7'>
                            <h2 className='t-tracking-widest t-text-center t-mx-auto t-font-bold t-text-blue-500 t-text-[25px] '>Changer mot de <span className='t-text-neutral-800'>{selectedUserForUpdate?.username}</span></h2>
                        </div>
                        <div className='t-z-10 lg:t-w-8/12 t-w-[97%] md:t-w-7/12 t-mx-auto'>
                            <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-6'>
                                <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-1 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Mot de passe</label>
                                <input onInput={(e) => { setChangePassword(e.target.value); }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-1 t-border-b-2 t-border-stone-200" />
                            </div>
                            <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-8'>
                                <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-1 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Confirmer Mot de Passe</label>
                                <input onInput={(e) => { setConfirmChange(e.target.value); }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-1 t-border-b-2 t-border-stone-200" />
                            </div>
                        </div>
                        {!validChange && <div className={`t-fill-red-500 t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-mt-6 t-flex t-items-center t-space-x-1 `}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                            </svg>
                            <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold'>Le Mot de Passe doit avoir au minimum 6 caracteres</p>
                        </div>}
                        {validConfirmChange && <div className={`t-fill-red-500 t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-flex t-items-center t-space-x-1 `}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                            </svg>
                            <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold'>Veuillez confirmer correctement votre mot de passe</p>
                        </div>}
                        <div className='t-z-10 t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-mt-10'>
                            {!isLoadingChangePWD && (<button onClick={handleResetPWD} disabled={changePassword.length < 6 || changePassword != confirmChange} className={`t-will-change-auto ${(changePassword.length >= 6 && changePassword == confirmChange) ? "hover:t-text-blue-400 hover:t-bg-white hover:t-shadow-none" : "t-opacity-30 t-cursor-not-allowed"} t-border-blue-400 t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-28 t-w-full t-text-white t-bg-blue-400 t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Créer</button>)
                                || (<Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
                        </div>
                    </div>
                </form>
                <div className='lg:t-w-10/12 lg:t-mx-auto t-mt-5'>
                    <button onClick={() => { container.current.style.display = "flex" }} className='t-text-white opacityAnimation t-shadow-md t-duration-200  t-fill-white hover:t-fill-blue-500 t-flex t-items-center t-justify-end t-delay-75 t-ml-auto lg:t-mr-5 t-rounded-md t-bg-blue-500 t-border-2 t-border-blue-500 hover:t-bg-white hover:t-text-blue-500 t-h-min lg:t-px-4 t-px-1 t-py-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" /></svg>
                        <p className='t-text-[14px]'>Ajouter</p>
                    </button>
                </div>
                <div className="t-overflow-x-auto customScrollBar t-h-min t-relative lg:t-w-10/12 t-w-full t-shadow-lg t-shadow-neutral-200 t-mx-auto t-mt-5 t-rounded-lg">
                    <table className="t-w-full t-text-sm t-text-left t-text-gray-500 dart-k:text-gray-400">
                        <thead className="t-text-xs t-text-gray-700 t-uppercase t-bg-gray-50 dark:t-bg-gray-700 dark:t-text-gray-400">
                            <tr>
                                <th scope="col" className="t-py-3 t-px-6">
                                    nom Utilisateur
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Nom
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Role
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Date Création
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((element, index) => {
                                return <tr key={index} className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                    <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                        {element.username}
                                    </th>
                                    <td className="t-py-4 t-px-6">
                                        {element.name}
                                    </td>
                                    <td className="t-py-4 t-px-6">
                                        {element.role.split("_")[1] != "ADMIN" ? "UTILISATEUR" : "ADMIN"}
                                    </td>
                                    <td className="t-py-4 t-px-6">
                                        {element.createdAt && (formatData(element.createdAt))}
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
    else {
        return <Navigate to="/" />
    }
}

export default AddUser