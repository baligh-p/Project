import React, { useState, useRef, useEffect } from 'react'
import { customAxios } from '../../CustomElement/axios'
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import Loader from '../Loader/Loader'
import useNotify from '../../CustomElement/UseNotify'

const UpdateLine = React.memo(({ display, removeLigne, setFirstGet, data, firstGet }) => {

    const [user, setUser] = useRecoilState(UserAtom)

    const [isLoading, setIsLoading] = useState(false)
    const [typesList, setTypesList] = useState([])
    const [selectedType, setSelectedType] = useState(null)
    const [end, setEnd] = useState(false)

    const bureau = useRef(null)
    const type = useRef(null)
    const mark = useRef(null)
    const noms = useRef(null)


    const notify = useNotify()

    const defaultTypeNdMark = (typs) => {
        if (data) {
            type.current.value = data.type.idType
            setSelectedType(() => typs.filter((element) => element.idType == data.type.idType)[0])
            mark.current.value = data.mark?.idMark == null ? "none" : data.mark.idMark
        }
    }


    useEffect(() => {
        const getTypesRequest = () => {
            customAxios.get(`/type/getTypes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                },
            }).then((res) => {
                if (res.status == 200) {
                    setTypesList(res.data)
                    defaultTypeNdMark(res.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
        }
        customAxios.get(`/type/getTypes`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
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
                                getTypesRequest()
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
                    setTypesList(response.data)
                    defaultTypeNdMark(response.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
            .catch((err) => {
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
            })

    }, [])


    useEffect(() => {
        if (!firstGet && end) {
            removeLigne()
            setEnd(false)
            notify("success", "Adresse IP est modifiée")
        }
    }, [firstGet])




    const updateLineRequest = (data) => {
        customAxios.put("/ip/updateIP", data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
                'Content-Type': "application/json"
            }
        }).then((response) => {
            if (response.data.success == true) {
                setIsLoading(false)
                setFirstGet()
                setEnd(true)
            }
            else if (response.data.success == false) {
                setIsLoading(false)
                notify("error", "Adresse ip n'existe pas")
            }
        })
    }

    const updateLine = (data) => {

        setIsLoading(true)
        customAxios.put("/ip/updateIP", data, {
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
                                updateLineRequest(data)
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
                else if (response.data.success == true) {
                    setEnd(true)
                    setIsLoading(false)
                    setFirstGet()
                }
                else if (response.data.success == false) {
                    setIsLoading(false)
                    notify("error", "Adresse ip n'existe pas")
                }
            })
            .catch((err) => {
                /*other erros :: Unautorized*/
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                setIsLoading(false)
            })
    }

    const handleSubmitUpdate = () => {
        const datas = JSON.stringify({
            idUser: localStorage.clid,
            idAddress: data.idAddress,
            bureau: bureau.current.value,
            noms: noms.current.value,
            idType: type.current.value,
            idMark: mark.current.value == "none" ? null : mark.current.value,
        })
        var submit = true
        if (!bureau.current.value) {
            submit = false
            notify("warning", "Le champ BUREAU est Obligatoire")
        }
        if (submit) {
            updateLine(datas)
        }
    }

    return (
        <tr style={{ display: display ? "" : "none", zIndex: "100" }} className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
            <td className="t-h-[70px] t-m-0 t-p-0 ">
                <input placeholder='Adresse IP' disabled={true} defaultValue={data.address} type="text" className='t-h-full t-w-full t-outline-none t-border-r dark:t-border-gray-700 t-p-1.5 t-box-border t-text-center' />
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0 ">
                <input placeholder='Bureau' ref={bureau} defaultValue={data.bureau} type="text" className='t-h-full t-w-full t-outline-none t-border-r dark:dark:t-border-gray-700 t-p-1.5 t-box-border t-text-center' />
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0 ">
                <input placeholder='Direction' disabled={true} defaultValue={data.direction} type="text" className='t-h-full t-border-r dark:t-border-gray-700 t-w-full t-outline-none t-p-1.5 t-box-border t-text-center' />
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0">
                <select ref={type} onChange={() => { setSelectedType(() => typesList.filter((element) => element.idType == type.current.value)[0]) }} className="t-cursor-pointer t-h-full t-bg-white t-outline-none t-border-r dark:t-border-gray-700 t-text-blue-500
                                    t-text-[13px] t-w-full t-text-center">
                    {typesList?.map((element, index) => {
                        return <option key={index} className='t-bg-white t-text-blue-500 t-text-[14px]' value={element.idType}>{element.typeName}</option>
                    })}
                </select>
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0">
                <select ref={mark} className="t-cursor-pointer t-h-full t-bg-white t-outline-none t-border-r dark:t-border-gray-700 t-text-blue-500
                                    t-text-[13px] t-w-full t-text-center">
                    <option className='t-bg-white t-text-blue-500 t-text-[14px]' value="none">none</option>
                    {selectedType?.marks.map((element, index) => {
                        return <option key={index} className='t-bg-white t-text-blue-500 t-text-[14px]' value={element.idMark}>{element.markName}</option>
                    })}
                </select>
            </td>
            <td className="t-h-[70px] t-m-0 t-p-0 t-flex t-justify-start t-items-start ">
                <textarea ref={noms} defaultValue={data.noms} placeholder='Noms' className='customTextAreaScrollBar t-resize-none t-h-[70px] t-w-[140px] t-text-center t-border-r dark:t-border-gray-700 t-outline-none t-p-1.5 t-box-border' />
            </td>
            <td className=" t-m-0 t-px-3 t-py-0 t-min-w-[135px] t-items-center t-justify-center">
                <div className='t-h-full t-w-full t-flex t-space-x-2 t-justify-center t-items-center'>
                    {(!isLoading && !firstGet) && (<><div onClick={removeLigne} className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" /></svg>
                    </div>
                        <div onClick={handleSubmitUpdate} className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-green-400 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-green-400 hover:t-bg-white t-bg-green-400 t-cursor-pointer t-w-min'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" /></svg>
                        </div></>) || (<Loader height="35px" size="35px" border="3px" color="#4ade80" />)}
                </div>
            </td>
        </tr >
    )
})

export default UpdateLine