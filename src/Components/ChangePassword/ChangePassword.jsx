import React, { useState, useEffect, useRef } from 'react'
import Loader from '../Loader/Loader'
import { customAxios } from '../../CustomElement/axios'
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import useNotify from '../../CustomElement/UseNotify'
import { data } from 'autoprefixer'
const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [validConfirm, setValidConfirm] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [validOldPassword, setValidOldPassword] = useState(true)

    const [user, setUser] = useRecoilState(UserAtom)

    const formulaire = useRef(null)

    const notify = useNotify()

    const handleFocus = (e) => {
        const input = e.target
        if (input.value == "") {
            const label = input.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(3px)"
            label.style.fontSize = "12px"
            input.classList.replace("t-border-stone-200", "t-border-indigo-500")
            label.classList.replace("t-text-stone-700", "t-text-indigo-600")
        }
    }
    const handleBlur = (e) => {
        const input = e.target
        const label = input.parentNode.children[0]
        if (input.value == "") {
            label.style.left = ""
            label.style.transform = ""
            label.style.fontSize = ""
            input.classList.replace("t-border-indigo-500", "t-border-stone-200")
            label.classList.replace("t-text-indigo-600", "t-text-stone-700")
        }
    }


    useEffect(() => {
        password.length < 6 && password != "" ? setValidPassword(false) : setValidPassword(true)
    }, [password])

    useEffect(() => {
        password != confirmPassword ? setValidConfirm(false) : setValidConfirm(true)
    }, [confirmPassword])

    useEffect(() => {
        setValidOldPassword(true)
    }, [oldPassword])

    const handleSubmit = (e) => {
        e.preventDefault()
        var submit = true
        if (password.length < 6 || oldPassword.length < 6 || password != confirmPassword) submit = false

        if (submit) {
            setIsLoading(true)
            const headers = {
                headers: {
                    Authorization: "Bearer " + localStorage.access_tkn,
                    "Content-Type": "application/json"
                }
            }


            const data = JSON.stringify({
                userId: localStorage.clid,
                oldPassword: oldPassword,
                newPassword: password
            })
            const putRequest = () => {
                customAxios.put("/user/changePassword", data, headers).then((response) => {
                    setIsLoading(false)
                    if (response.status == 200) {
                        if (response.data.success) {
                            setConfirmPassword("")
                            setPassword("")
                            setOldPassword("")
                            formulaire.current.reset()
                            const childs = formulaire.current.childNodes[1].childNodes
                            childs.forEach(element => {
                                element.children[1].focus()
                                element.children[1].blur()
                            });
                            notify("success", "Le mot de passe est changé avec succés")
                        } else {
                            setValidOldPassword(false)
                        }
                    }
                    else {
                        notify("error", "Erreur d'execution de requete")
                    }
                })
            }

            customAxios.put("/user/changePassword", data, headers).then((response) => {
                console.log(response)
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
                                putRequest()
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
                    if (response.data.success) {
                        setConfirmPassword("")
                        setPassword("")
                        setOldPassword("")
                        formulaire.current.reset()
                        const childs = formulaire.current.childNodes[1].childNodes
                        childs.forEach(element => {
                            element.children[1].focus()
                            element.children[1].blur()
                        });
                        notify("success", "Le mot de passe est changé avec succés")
                    } else {
                        setValidOldPassword(false)
                    }
                }
                else {
                    setIsLoading(false)
                    notify("error", "Erreur d'execution de requete")
                }
            })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }
    }
    return (
        <div className='lg:t-w-[79.5%] t-bg-neutral-50/20 t-w-full t-min-h-screen t-h-full t-ml-auto t-flex lg:t-items-center t-justify-center'>
            <form ref={formulaire} className='t-bg-white lg:t-border-2 t-border-indigo-300 t-rounded-md lg:t-w-6/12 t-w-full xl:t-min-h-[45vh] t-min-h-[70vh] t-px-5 t-pb-8 lg:t-pt-4 t-pt-[7.5rem] t-mx-auto t-flex t-flex-col'>
                <div className='t-w-full t-flex t-flex-col t-items-center t-justify-center t-space-y-3 t-mb-5'>
                    <img src="/assets/icons/padlock.png" className='t-h-[140px] t-w-[140px]' />
                    <h2 className='t-tracking-wide t-text-[20px] t-text-indigo-500 t-font-extrabold'>Changer Le Mot de passe</h2>
                </div>
                <div className='lg:t-w-8/12 t-w-11/12 t-mx-auto t-flex t-flex-col t-justify-center t-items-center t-space-y-4'>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                        <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[21px] t-text-[15px] lg:t-text-sm'>Mot de passe</label>
                        <input onInput={(e) => { setOldPassword(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[25px] lg:t-py-[22px] t-border-2 t-border-stone-200" />
                    </div>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                        <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[21px] t-text-[15px] lg:t-text-sm'>Nouveau mot de passe</label>
                        <input onInput={(e) => { setPassword(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[25px] lg:t-py-[22px] t-border-2 t-border-stone-200" />
                    </div>
                    <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                        <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[18px] t-translate-y-[21px] t-text-[15px] lg:t-text-sm'>Confirmer mot de passe</label>
                        <input onInput={(e) => { setConfirmPassword(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[25px] lg:t-py-[22px] t-border-2 t-border-stone-200" />
                    </div>
                </div>
                <div className='t-w-8/12 t-mx-auto t-space-y-1 t-my-3'>
                    {(!validOldPassword) && (<div className={`t-fill-red-500 t-w-full t-flex t-items-center t-space-x-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                        </svg>
                        <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold t-whitespace-nowrap'>Le mot de passe est invalide</p>
                    </div>)}
                    {(!validPassword) && (<div className={`t-fill-red-500 t-w-full t-flex t-items-center t-space-x-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                        </svg>
                        <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold t-whitespace-nowrap'>Le mot de passe doit avoir au minimum 6 caracteres</p>
                    </div>)}
                    {(!validConfirm) && (<div className={`t-fill-red-500 t-w-full t-flex t-items-center t-space-x-1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                        </svg>
                        <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold t-whitespace-nowrap'>Confirmer correctement le nouveau mot de passe</p>
                    </div>)}
                </div>
                <div className='t-z-10 t-mx-auto lg:t-w-8/12 t-w-11/12'>
                    <button onClick={handleSubmit} className={`t-will-change-auto ${(true) ? " hover:t-bg-indigo-700" : "t-opacity-30 t-cursor-not-allowed"} t-border-indigo-600 t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-full t-w-full t-text-white t-bg-indigo-600 t-text-lg t-rounded-md t-shadow-lg t-shadow-indigo-500`}>
                        {!isLoading && ("Changer") || (<Loader className="t-mx-auto" height="25px" size="25px" border="3px" color="white" />)}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default ChangePassword