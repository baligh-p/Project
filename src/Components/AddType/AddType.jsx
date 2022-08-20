import React, { useRef, useState, useEffect } from 'react'
import "./AddType.scss"
import useNotify from "../../CustomElement/UseNotify"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../../CustomElement/axios'
import Loader from '../Loader/Loader'
const AddType = () => {

    const direction = useRef(null)
    const type = useRef(null)
    const mark = useRef(null)
    const selecteType = useRef(null)

    const [user, setUser] = useRecoilState(UserAtom)
    const [isLoadingType, setIsLoadingType] = useState(false)
    const [isLoadingDir, setIsLoadingDir] = useState(false)
    const [isLoadingMark, setIsLoadingMark] = useState(false)
    const [typesList, setTypesList] = useState([])

    const notify = useNotify()


    const handleFocus = (e) => {
        const input = e.target
        if (input.value == "") {
            const label = input.parentNode.children[0]
            label.style.left = ""
            label.style.transform = "translateY(0px)"
            label.style.fontSize = "12px"
        }
    }
    const handleBlur = (e) => {
        const input = e.target
        const label = input.parentNode.children[0]
        if (input.value == "") {
            label.style.left = ""
            label.style.transform = ""
            label.style.fontSize = ""
        }
    }


    useEffect(() => {
        if (!isLoadingType) {
            const getTypesRequest = () => {
                customAxios.get(`/type/getTypes`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`,
                    },
                }).then((res) => {
                    if (res.status == 200) {
                        setTypesList(res.data)
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
                    }
                    else {
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }

    }, [isLoadingType])


    const handleAddMark = () => {

        const data = JSON.stringify({
            markName: mark.current.value,
            typeId: selecteType.current.value
        })

        if (mark.current.value) {

            const postMark = () => {
                setIsLoadingMark(true)
                customAxios.post(`/mark/addMark`, data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`,
                        "Content-Type": "application/json"
                    },
                })
                    .then((response) => {
                        setIsLoadingMark(false)
                        if (response.status == 200) {
                            if (response.data.success == "true") {
                                notify("success", "Marque est ajoutée avec succés")
                            } else {
                                notify("warning", "Marque déja existe")
                            }
                        } else {
                            notify("error", "Erreur d'execution de requete")
                        }
                    })
            }

            setIsLoadingMark(true)
            customAxios.post(`/mark/addMark`, data, {
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
                                    postMark(data)
                                }
                                else {
                                    setUser({ isLogged: false, id: null, username: null, role: null })
                                    localStorage.clid = ""
                                }
                            }).catch((err) => {
                                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                            })
                        } else {
                            setIsLoadingMark(false)
                            setUser({ isLogged: false, id: null, username: null, role: null })
                            localStorage.clid = ""
                        }
                    }
                    else if (response.status == 200) {
                        setIsLoadingMark(false)
                        if (response.data.success == "true") {
                            notify("success", "Marque est ajoutée avec succés")
                        } else {
                            notify("warning", "Marque déja existe")
                        }

                    }
                    else {
                        setIsLoadingMark(false)
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    setIsLoadingMark(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })

        }


    }
    const postDirection = (data) => {
        customAxios.post(`/dir/addDir`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
                "Content-Type": "application/json"
            },
        }).then((response) => {
            setIsLoadingDir(false)
            if (response.data.success) {
                direction.current.value = ""
                direction.current.focus()
                notify("success", "la Direction est ajoutée avec succés")
            }
            else {
                notify("warning", "Direction deja existe")
            }
        })
    }
    const handleAddDirection = () => {

        const data = JSON.stringify({
            directionName: direction.current.value
        })

        if (direction.current.value) {
            setIsLoadingDir(true)
            customAxios.post(`/dir/addDir`, data, {
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
                                    postDirection(data)
                                }
                                else {
                                    setUser({ isLogged: false, id: null, username: null, role: null })
                                    localStorage.clid = ""
                                }
                            }).catch((err) => {
                                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                            })
                        } else {
                            setIsLoadingDir(false)
                            setUser({ isLogged: false, id: null, username: null, role: null })
                            localStorage.clid = ""
                        }
                    }
                    else if (response.status == 200) {
                        setIsLoadingDir(false)
                        if (response.data.success) {
                            direction.current.value = ""
                            direction.current.focus()
                            notify("success", "la Direction est ajoutée avec succés")
                        }
                        else {
                            notify("warning", "Direction deja existe")
                        }
                    }
                    else {
                        setIsLoadingDir(false)
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    setIsLoadingDir(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }


    }
    const postType = (data) => {
        customAxios.post(`/type/addType`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
                "Content-Type": "application/json"
            },
        }).then((response) => {
            setIsLoadingType(false)
            if (response.data.exist == false) {
                notify("success", "Type est ajouté avec succés")
                type.current.value = ""
                type.current.focus()
            }
            else {
                notify("warning", "Type déja existe")
            }
        })
    }
    const handleAddType = () => {
        const data = JSON.stringify({
            typeName: type.current.value
        })

        if (type.current.value) {
            setIsLoadingType(true)
            customAxios.post(`/type/addType`, data, {
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
                                    postType(data)
                                }
                                else {
                                    setUser({ isLogged: false, id: null, username: null, role: null })
                                    localStorage.clid = ""
                                }
                            }).catch((err) => {
                                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                            })
                        } else {
                            setIsLoadingType(false)
                            setUser({ isLogged: false, id: null, username: null, role: null })
                            localStorage.clid = ""
                        }
                    }
                    else if (response.status == 200) {
                        setIsLoadingType(false)
                        if (response.data.exist == false) {
                            notify("success", "Type est ajouté avec succés")
                            type.current.value = ""
                            type.current.focus()
                        }
                        else {
                            notify("warning", "Type déja existe")
                        }
                    }
                    else {
                        setIsLoadingType(false)
                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    setIsLoadingType(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })

        }


    }
    return (
        <div className='t-flex lg:t-w-[79.5%] t-w-full lg:t-mt-auto t-mt-[5rem] t-h-screen t-ml-auto t-z-40 t-flex-col t-justify-center t-items-center'>
            <div className='lg:t-h-[95%] t-h-full lg:t-p-7 t-py-7 t-px-0 lg:t-w-3/5 t-w-full t-bg-white'>
                <h1 className='t-tracking-widest t-font-body t-text-neutral-800 t-w-full t-text-center t-mb-10 t-font-bold t-text-[28px]'>Ajouter Des Attributs</h1>
                <div className='t-w-full t-flex t-flex-col lg:t-py-0 t-py-7 t-justify-center t-items-center'>
                    <form className='t-flex t-flex-col t-items-end t-space-y-2 t-justify-end t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-z-20'>
                        <div className='t-flex t-flex-col t-w-full t-mx-auto'>
                            <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-w-min t-h-0 t-duration-150 t-left-2 t-text-blue-500 t-cursor-text t-select-none  lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Direction</label>
                            <input ref={direction} onFocus={handleFocus} onBlur={handleBlur} type="text" className="t-bg-white t-rounded-md t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[24px] lg:t-py-[25px] t-border-2 t-border-blue-500" />
                        </div>
                        {(!isLoadingDir) && <button onClick={handleAddDirection} className='t-flex t-space-x-1 t-items-center t-justify-centert-h-[54px] t-z-30 t-p-2 t-rounded-md t-fill-white t-bg-blue-500'>
                            <svg className='t-h-4 t-w-4' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32"><path d="M2.4375,17.9375h11.625v11.625c0,1.06854,0.86896,1.9375,1.9375,1.9375s1.9375-0.86896,1.9375-1.9375v-11.625h11.625c1.06854,0,1.9375-0.86896,1.9375-1.9375s-0.86896-1.9375-1.9375-1.9375h-11.625V2.4375C17.9375,1.36896,17.06854,0.5,16,0.5s-1.9375,0.86896-1.9375,1.9375v11.625H2.4375C1.36896,14.0625,0.5,14.93146,0.5,16S1.36896,17.9375,2.4375,17.9375z" /></svg>
                            <p className='t-text-white'>Ajouter</p>
                        </button> || (<Loader className="lg:t-mx-0 t-mx-auto" height="30px" size="30px" border="6px" color="#60a5fa" />)}
                    </form>
                    <div className='t-w-8/12 t-my-5 t-bg-stone-500/40 t-h-px t-mx-auto'></div>
                    <form className='t-flex t-flex-col t-items-end t-space-y-2 t-justify-end t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-z-20'>
                        <div className='t-flex t-flex-col t-w-full t-mx-auto'>
                            <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-w-min t-h-0 t-duration-150 t-left-2 t-text-blue-500 t-cursor-text t-select-none  lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Type</label>
                            <input ref={type} onFocus={handleFocus} onBlur={handleBlur} type="text" className="t-bg-white t-rounded-md t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[24px] lg:t-py-[25px] t-border-2 t-border-blue-500" />
                        </div>
                        {(!isLoadingType) && <button onClick={handleAddType} className='t-flex t-space-x-1 t-items-center t-justify-centert-h-[54px] t-z-30 t-p-2 t-rounded-md t-fill-white t-bg-blue-500'>
                            <svg className='t-h-4 t-w-4' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32"><path d="M2.4375,17.9375h11.625v11.625c0,1.06854,0.86896,1.9375,1.9375,1.9375s1.9375-0.86896,1.9375-1.9375v-11.625h11.625c1.06854,0,1.9375-0.86896,1.9375-1.9375s-0.86896-1.9375-1.9375-1.9375h-11.625V2.4375C17.9375,1.36896,17.06854,0.5,16,0.5s-1.9375,0.86896-1.9375,1.9375v11.625H2.4375C1.36896,14.0625,0.5,14.93146,0.5,16S1.36896,17.9375,2.4375,17.9375z" /></svg>
                            <p className='t-text-white'>Ajouter</p>
                        </button> || (<Loader className="lg:t-mx-0 t-mx-auto" height="30px" size="30px" border="6px" color="#60a5fa" />)}
                    </form>
                    <div className='t-w-8/12 t-my-5 t-bg-stone-500/40 t-h-px t-mx-auto'></div>
                    <form className='t-flex t-flex-col t-items-end t-space-y-2 t-justify-center t-mx-auto lg:t-w-8/12 t-w-10/12 md:t-w-8/12 t-z-20'>
                        <select ref={selecteType} className='t-py-2 t-outline-none t-cursor-pointer t-w-full t-border-blue-500 t-border-2 t-mb-5'>
                            {typesList?.map((element, index) => {
                                return <option key={index} value={element.idType}>{element.typeName}</option>
                            })}
                        </select>
                        <div className='t-flex t-flex-col t-w-full t-mx-auto'>
                            <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-w-min t-h-0 t-duration-150 t-left-2 t-text-blue-500 t-cursor-text t-select-none  lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Marque</label>
                            <input ref={mark} onFocus={handleFocus} onBlur={handleBlur} type="text" className="t-bg-white t-rounded-md t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[24px] lg:t-py-[25px] t-border-2 t-border-blue-500" />
                        </div>
                        {(!isLoadingMark) && <button onClick={handleAddMark} className='t-flex t-space-x-1 t-items-center t-justify-centert-h-[54px] t-z-30 t-p-2 t-rounded-md t-fill-white t-bg-blue-500'>
                            <svg className='t-h-4 t-w-4' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32"><path d="M2.4375,17.9375h11.625v11.625c0,1.06854,0.86896,1.9375,1.9375,1.9375s1.9375-0.86896,1.9375-1.9375v-11.625h11.625c1.06854,0,1.9375-0.86896,1.9375-1.9375s-0.86896-1.9375-1.9375-1.9375h-11.625V2.4375C17.9375,1.36896,17.06854,0.5,16,0.5s-1.9375,0.86896-1.9375,1.9375v11.625H2.4375C1.36896,14.0625,0.5,14.93146,0.5,16S1.36896,17.9375,2.4375,17.9375z" /></svg>
                            <p className='t-text-white'>Ajouter</p>
                        </button> || (<Loader className="lg:t-mx-0 t-mx-auto" height="30px" size="30px" border="6px" color="#60a5fa" />)}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddType