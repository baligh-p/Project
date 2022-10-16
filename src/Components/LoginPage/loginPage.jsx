import React, { useState, useEffect } from 'react'
import Loader from "../Loader/Loader"
import { customAxios } from '../../CustomElement/axios'
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [valid, setValid] = useState(true)
    const [user, setUser] = useRecoilState(UserAtom)

    const handleFocus = (e) => {
        const input = e.target
        if (input.value == "") {
            const label = input.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(3px)"
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

    useEffect(() => {
        if (!username.length && !password.length) setValid(true)
        else if (username && password.length > 5) setValid(true)
        else setValid(false)
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (valid) {
            setIsLoading(true)
            var data = new FormData()
            data.append("username", username)
            data.append("password", password)
            customAxios.post("/login", data).then((res) => {
                if (res.status == 200) {
                    if (res.data.success == "true") {
                        localStorage.access_tkn = res.data.access_token
                        localStorage.refresh_tkn = res.data.refresh_token
                        setUser({ isLogged: true, username: res.data.username })
                    }
                    else {
                        setValid(false)
                        setIsLoading(false)
                    }
                }
            }).catch((err) => {

            })
        }

    }
    return (
        <div className='t-min-h-screen t-flex t-items-center t-justify-center t-font-body'>
            <div className='t-w-full lg:t-fixed t-lg:inset-0 t-min-h-full t-flex t-items-center t-justify-center'>
                <div className='t-min-h-screen lg:t-flex t-hidden t-w-7/12 t-bg-neutral-900 selection:t-bg-white selection:t-text-blue-300'>
                    <div className='t-mx-auto t-relative t-right-10 t-flex t-flex-col t-items-center t-justify-center'>
                        <img className='t-h-[70vh] t-mb-1 t-w-[37vw]' src="/assets/icons/loginration.png" alt="" />
                        <h1 className='t-text-[32px] t-text-white t-w-10/12 t-text-center t-mx-auto'>IPManager</h1>
                    </div>
                </div>
                <form className='selection:t-bg-blue-300 selection:t-text-white t-py-5 lg:t-py-12 lg:t-w-5/12 t-w-full t-shadow-lg t-shadow-black/20 lg:t-relative t-bottom-5 t-rounded-lg t-right-24 t-bg-white t-min-h-screen lg:t-min-h-min t-flex t-flex-col t-items-center t-justify-center'>
                    <div className='t-z-10 lg:t-mb-10 t-mb-20 t-w-full t-flex t-flex-col t-items-center t-justify-center'>
                        <h2 className='t-text-blue-400 t-font-bold t-text-5xl lg:t-text-4xl'>Se connecter</h2>
                    </div>
                    <div className='t-z-10 lg:t-w-6/12 t-w-10/12 md:t-w-8/12'>
                        <div className='t-flex t-space-y-1 t-flex-col t-w-full t-mb-10 lg:t-mb-7'>
                            <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[21px] t-translate-y-[23px] t-text-[15px] lg:t-text-sm'>Nom d'Utilisateur</label>
                            <input onInput={(e) => { setUsername(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="text" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-h-10 t-text-[17px] lg:t-text-base t-px-2 t-py-[28px] lg:t-py-[25px] t-border-2 t-border-stone-200 before:t-z-50 before:t-left-0" />
                        </div>
                        <div className='t-flex t-space-y-1 t-flex-col t-w-full'>
                            <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-h-0 t-duration-150 t-left-2 t-cursor-text t-select-none t-text-stone-700 lg:t-translate-y-[21px] t-translate-y-[23px] t-text-[15px] lg:t-text-sm'>Mot de passe</label>
                            <input onInput={(e) => { setPassword(e.target.value) }} onFocus={handleFocus} onBlur={handleBlur} type="password" className="t-bg-white t-duration-150 t-rounded-md t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[28px] lg:t-py-[25px] t-border-2 t-border-stone-200" />
                        </div>
                    </div>
                    <div className={`t-fill-red-500 lg:t-w-6/12 t-w-10/12 md:t-w-8/12 ${valid ? "t-opacity-0" : ""} t-flex t-items-center t-space-x-1 t-mt-7 t-mb-2 lg:t-mb-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M12 17.2q.5 0 .838-.338.337-.337.337-.837 0-.5-.337-.837-.338-.338-.838-.338-.5 0-.837.338-.338.337-.338.837 0 .5.338.837.337.338.837.338ZM10.85 13h2.3V6.875h-2.3ZM12 22.2q-2.125 0-3.988-.8-1.862-.8-3.237-2.175Q3.4 17.85 2.6 15.988 1.8 14.125 1.8 12t.8-3.988q.8-1.862 2.175-3.237Q6.15 3.4 8.012 2.6 9.875 1.8 12 1.8t3.988.8q1.862.8 3.237 2.175Q20.6 6.15 21.4 8.012q.8 1.863.8 3.988t-.8 3.988q-.8 1.862-2.175 3.237Q17.85 20.6 15.988 21.4q-1.863.8-3.988.8Zm0-2.275q3.325 0 5.625-2.3t2.3-5.625q0-3.325-2.3-5.625T12 4.075q-3.325 0-5.625 2.3T4.075 12q0 3.325 2.3 5.625t5.625 2.3ZM12 12Z" />
                        </svg>
                        <p className='t-text-red-500 t-select-none t-text-[12px] t-font-semibold t-whitespace-nowrap'>Nom d'utilisateur ou mot de passe invalides</p>
                    </div>
                    <div className='t-z-10 lg:t-w-6/12 t-w-10/12 md:t-w-8/12 t-mt-5'>
                        {!isLoading && (<button onClick={handleSubmit} disabled={!username || !password} className={`t-will-change-auto ${(username && password) ? "hover:t-text-blue-400 hover:t-bg-white hover:t-shadow-none" : "t-opacity-30 t-cursor-not-allowed"} t-border-blue-400 t-border-2 t-duration-200 t-delay-75 t-h-12 lg:t-w-28 t-w-full t-text-white t-bg-blue-400 t-text-lg t-rounded-md t-shadow-lg t-shadow-blue-300`}>Connecter</button>)
                            || (<Loader className="lg:t-mx-0 t-mx-auto" height="40px" size="35px" border="6px" color="#60a5fa" />)}
                    </div>
                    <div className='-t-z-10 t-hidden lg:t-flex t-h-full t-w-full t-bg-blue-100/90 -t-right-11 t-absolute t-mt-16 t-rounded-lg t-mr-2'></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage