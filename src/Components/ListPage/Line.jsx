import React, { useState, useRef, useEffect } from 'react'
import { customAxios } from '../../CustomElement/axios'
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { NotificationAtom } from '../../SharedStates/NotificationAtom'

const Line = React.memo(({ display, removeLigne, setFirstGet, firstGet }) => {

    const [user, setUser] = useRecoilState(UserAtom)
    const [notification, setNotification] = useRecoilState(NotificationAtom)

    const [isLoading, setIsLoading] = useState(false)

    const address = useRef(null)
    const bureau = useRef(null)
    const type = useRef(null)
    const mark = useRef(null)
    const noms = useRef(null)

    const { direction } = useParams()

    const addIp = (data) => {
        customAxios.post("/ip/addIP", data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
                'Content-Type': "application/json"
            }
        }).then((response) => {
            if (response.data.exist == false) {
                /*success*/
                setIsLoading(false)
                setFirstGet()
            }
            else if (response.data.exist == true) {
                //error message with notification
                setIsLoading(false)
                setNotification({
                    ...notification,
                    visible: true,
                    message: "Adresse IP deja exist",
                    type: "warning"
                })
            }
        })
    }

    const addLigne = (data) => {

        setIsLoading(true)
        customAxios.post("/ip/addIP", data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
                'Content-Type': "application/json"
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
                                addIp(data)
                            }
                            else {
                                setUser({ isLogged: false, id: null, username: null, role: null })
                                localStorage.clid = ""
                            }
                        }).catch((err) => {
                            console.log("refresh token")
                            console.log(err)
                        })
                    } else {
                        setIsLoading(false)
                        setUser({ isLogged: false, id: null, username: null, role: null })
                        localStorage.clid = ""
                    }
                }
                else if (response.data.exist == false) {
                    setIsLoading(false)
                    setFirstGet()
                }
                else if (response.data.exist == true) {
                    setIsLoading(false)
                    setNotification({
                        ...notification,
                        visible: true,
                        message: "Adresse IP deja exist",
                        type: "warning"
                    })

                }
            })
            .catch((err) => {
                /*other erros :: Unautorized*/
                console.log(err)
                setIsLoading(false)

            })
    }


    const handleSubmitAdd = () => {
        var submit = true
        if (Array.from(address.current.value).filter((element) => element == ".").length != 3) {
            submit = false
            address.current.classList.add("errorClass")
        }



        if (submit) {
            const data = JSON.stringify({
                address: address.current.value,
                bureau: bureau.current.value,
                direction: direction,
                noms: noms.current.value,
                idType: "2",
                idMark: "3"
            })
            addLigne(data)
        }
    }


    useEffect(() => {
        if (!display) {
            address.current.value = ""
            bureau.current.value = ""
            type.current.value = "tout"
            mark.current.value = "tout"
            noms.current.value = ""
        }
    }, [display])

    useEffect(() => {
        if (!firstGet) {
            removeLigne()
        }
    }, [firstGet])

    return (
        <tr style={{ display: display ? "" : "none" }} className="t-bg-white t-border t-text-black dark:t-bg-gray-800 t-border-blue-400">
            <td className="t-h-[70px] t-m-0 t-p-0 ">
                <input placeholder='Adresse IP' onInput={(e) => { e.target.classList.remove("errorClass") }} ref={address} type="text" className='t-h-full t-w-full t-outline-none t-border-r t-border-blue-400 t-p-1.5 t-box-border t-text-center' />
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0 ">
                <input placeholder='Bureau' ref={bureau} type="text" className='t-h-full t-w-full t-outline-none t-border-r t-border-blue-400 t-p-1.5 t-box-border t-text-center' />
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0 ">
                <input placeholder='Direction' disabled={true} defaultValue={direction} type="text" className='t-h-full t-border-r t-border-blue-400 t-w-full t-outline-none t-p-1.5 t-box-border t-text-center' />
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0">
                <select ref={type} defaultValue={"tout"} className="t-cursor-pointer t-h-full t-bg-white t-outline-none t-border-r t-border-blue-400 t-text-blue-500
                                    t-text-[13px] t-w-full t-text-center">
                    <option className='t-bg-white t-text-blue-500 t-text-[14px]' value="tout">Tout</option>
                    <option className='t-bg-white t-text-blue-500 t-text-[14px]' value="2">Imprimante</option>
                    <option className='t-bg-white t-text-blue-500 t-text-[14px]' value="3">PC</option>
                </select>
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0">
                <select ref={mark} className="t-cursor-pointer t-h-full t-bg-white t-outline-none t-border-r t-border-blue-400 t-text-blue-500
                                    t-text-[13px] t-w-full t-text-center" defaultValue={"tout"}>
                    <option className='t-bg-white t-text-blue-500 t-text-[14px]' value="tout">Tout</option>
                    <option className='t-bg-white t-text-blue-500 t-text-[14px]' value="2">Asus</option>
                    <option className='t-bg-white t-text-blue-500t-text-[14px]' value="3">HP</option>
                </select>
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0 t-flex t-justify-start t-items-start ">
                <textarea ref={noms} placeholder='Noms' className='customTextAreaScrollBar t-resize-none t-h-[70px] t-w-[140px] t-text-center t-border-r t-border-blue-400 t-outline-none t-p-1.5 t-box-border' />
            </td>
            <td className=" t-m-0 t-px-3 t-py-0 t-min-w-[135px] t-items-center t-justify-center">
                <div className='t-h-full t-w-full t-flex t-space-x-2 t-justify-center t-items-center'>
                    {(!isLoading && !firstGet) && (<><div onClick={removeLigne} className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" /></svg>
                    </div>
                        <div onClick={handleSubmitAdd} className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-green-400 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-green-400 hover:t-bg-white t-bg-green-400 t-cursor-pointer t-w-min'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" /></svg>
                        </div></>) || (<Loader height="35px" size="35px" border="3px" color="#4ade80" />)}
                </div>
            </td>
        </tr>
    )
})

export default Line