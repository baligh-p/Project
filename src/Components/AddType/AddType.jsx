import React, { useRef, useState, useEffect } from 'react'
import "./AddType.scss"
import useNotify from "../../CustomElement/UseNotify"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../../CustomElement/axios'
import Loader from '../Loader/Loader'
const AddType = () => {

    const type = useRef(null)
    const mark = useRef(null)
    const selecteType = useRef(null)

    const [user, setUser] = useRecoilState(UserAtom)
    const [isLoadingType, setIsLoadingType] = useState(false)
    const [isLoadingMark, setIsLoadingMark] = useState(false)
    const [typesList, setTypesList] = useState([])
    const [selectMarkForDelete, setSelectMarkForDelete] = useState({})
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [selectedElementForUpdate, setSelectedElementForUpdate] = useState({})
    const [colors, setColors] = useState([])


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

    }, [isLoadingType, isLoadingMark, isDeleting, isUpdating])


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

    const generateRandomDarkColor = () => {
        const randRed = Math.floor(Math.random() * 156) + 100
        const randGreen = Math.floor(Math.random() * 156) + 100
        const randBlue = Math.floor(Math.random() * 156) + 100
        return { borderColor: `rgb(${randRed},${randGreen},${randBlue})`, bg: `rgba(${randRed},${randGreen},${randBlue},0.4)` }

    }
    const deleteMark = (idType, idMark) => {
        setIsDeleting(true)
        const deleteRefresh = () => {
            customAxios.delete(`/mark/deleteMark/${idType}/${idMark}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                setIsDeleting(false)
                setSelectMarkForDelete({})
                if (response.data.success) {
                    notify("success", "La direction a étè supprimée ")
                }
                else {
                    notify("warning", "error de suppression de direction")
                }
            })
        }

        customAxios.delete(`/mark/deleteMark/${idType}/${idMark}`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                setIsDeleting(false)
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
                                deleteRefresh()
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
                    setSelectMarkForDelete({})
                    if (response.data.success) {
                        notify("success", "La direction a étè supprimée ")
                    }
                    else {
                        notify("warning", "error de suppression de direction")
                    }
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
            .catch((err) => {
                setIsDeleting(false)
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
            })
    }
    const confirmDelete = () => {
        deleteMark(selectMarkForDelete.typeId, selectMarkForDelete.mark.idMark)
    }


    const confirmUpdate = (idMark, newName) => {
        if (newName.length) {
            setIsUpdating(true)
            const updateRefresh = () => {
                customAxios.put(`/mark/updateName/${idMark}/${newName}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.access_tkn}`,
                        "Content-Type": "application/json"
                    },
                }).then((response) => {
                    setIsUpdating(false)
                    setSelectedElementForUpdate({})
                    if (response.data.success) {
                        notify("success", "La marque a étè modifiée ")
                    }
                    else {
                        notify("warning", "error de modification de marque")
                    }
                })
            }

            customAxios.put(`/mark/updateName/${idMark}/${newName}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            })
                .then((response) => {
                    setIsUpdating(false)
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
                                    updateRefresh()
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
                        setSelectedElementForUpdate({})
                        if (response.data.success) {
                            notify("success", "La marque a étè modifiée ")
                        }
                        else {
                            notify("warning", "error de modification de marque")
                        }
                    }
                    else {

                        notify("error", "Erreur d'execution de requete")
                    }
                })
                .catch((err) => {
                    setIsUpdating(false)
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }
    }

    useEffect(() => {
        var cls = []
        for (let index = 0; index < 50; index++) {
            cls.push(generateRandomDarkColor())
        }
        setColors(cls)
    }, [])

    return (
        <div className='t-flex t-flex-col lg:t-flex-row lg:t-w-[79.5%] t-w-full lg:t-mt-auto t-mt-[5rem] t-h-screen t-ml-auto t-items-center t-justify-start'>
            {(selectMarkForDelete?.mark?.idMark) && <div className='t-fixed t-top-0 t-z-50 t-left-0 t-h-screen t-w-full t-bg-neutral-900/20 t-flex t-items-center t-justify-center'>
                <div className='t-bg-white t-box-content t-shadow-lg t-shadow-neutral-300 t-h-[290px] md:t-w-[450px] t-w-10/12 t-rounded-md t-p-5'>
                    <div onClick={() => { if (!isDeleting) setSelectMarkForDelete({}); }} className='t-ml-auto t-relative t-bottom-4 t-left-4 t-p-0.5 hover:t-bg-stone-300 t-rounded-full t-cursor-pointer t-fill-[#002e67]/75 t-w-min' >
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                            <path d="m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z" />
                        </svg>
                    </div>
                    <div className='t-w-full t-h-full t-flex t-items-center t-justify-start t-flex-col'>
                        <p className='t-tracking-widest t-text-[22px] t-text-[#002e67] t-mb-6 t-w-full t-text-center t-font-[900] t-whitespace-nowrap'> Supprission De Marque ?</p>
                        <h2 className='t-tracking-widest t-text-[15px] t-w-11/12 t-mx-auto t-text-center t-font-[600] t-text-[#002e67]/75'>Etes-vous sûr de supprimer <span className='t-font-bold t-text-[#002e67]/90'>{selectMarkForDelete.mark.markName}</span> ?</h2>
                        <p className='t-tracking-widest t-mt-1 t-text-[13px] t-w-11/12 t-mx-auto t-text-center t-font-[600] t-text-[#002e67]/75'>Vous ne pouvez pas annuler cette action</p>
                        <div className='t-w-full t-my-auto t-flex t-justify-around t-items-center'>
                            <button onClick={() => { if (!isDeleting) setSelectMarkForDelete({}); }} disabled={isDeleting} className='t-p-2 t-min-w-[40%] t-flex t-items-center t-justify-center t-rounded-full t-fill-white t-text-white hover:t-fill-gray-500 hover:t-text-gray-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-gray-500 hover:t-bg-white t-bg-gray-500 t-cursor-pointer t-w-min'>
                                <p>Annuler</p>
                            </button>
                            <button onClick={confirmDelete} disabled={isDeleting} className={` ${(isDeleting) ? "" : "hover:t-fill-red-500 hover:t-text-red-500 hover:t-border-red-500 hover:t-bg-white"} t-p-2 t-min-w-[40%] t-flex t-items-center t-justify-center t-rounded-full t-fill-white t-text-white  t-border-2 t-duration-300 t-delay-75 t-border-transparent t-bg-red-500 t-cursor-pointer t-w-min`}>
                                {(isDeleting) && (<Loader className="lg:t-mx-0 t-mx-auto" height="30px" size="25px" border="3px" color="white" />) || (<><p>Supprimer</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg></>)}
                            </button>

                        </div>
                    </div>
                </div>
            </div>}
            <div className='lg:t-p-7 t-py-7 t-px-0 lg:t-w-3/5 t-w-full t-bg-white'>
                <div className='t-w-full t-flex t-flex-col lg:t-py-0 t-py-7 t-justify-center t-items-center'>
                    <h2 className='t-text-[19px] t-font-bold t-self-start t-text-neutral-700 t-relative t-left-5 t-mb-7'>Ajouter un Type</h2>
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
                    <h2 className='t-text-[19px] t-font-bold t-self-start t-text-neutral-700 t-relative t-left-5 t-mb-7'>Ajouter une Marque</h2>
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
            <div className='t-hidden customScrollBarDark t-overflow-y-auto t-max-h-[70%] t-w-1/3 lg:t-flex t-flex-col t-space-y-6'>


                {typesList.map((element, index2) => {
                    const color = colors[index2]

                    return (<details key={index2} style={{ backgroundColor: color?.bg, borderColor: color?.borderColor }} className="question t-w-full t-py-4 t-px-5 t-border-l-[7px] t-border-grey-lighter">
                        <summary className="t-flex t-text-lg t-items-center t-font-bold">{element.typeName}
                            <button className="t-ml-auto  -t-z-10">
                                <svg className="t-fill-current t-opacity-75 t-w-4 t-h-4 -t-mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
                            </button>
                        </summary>

                        <div className="t-mt-2  t-pl-2 t-pr-0.5 t-leading-normal t-space-y-4 t-text-md ">
                            {element.marks.map((mark, index) => {

                                const defaultValue = mark?.markName

                                const updateName = async () => {
                                    await setSelectedElementForUpdate({ "mark": mark, "typeId": element.idType })
                                    await document.querySelectorAll(".markline" + index2)[index].children[0].focus()
                                }

                                const cancelModify = () => {
                                    setSelectedElementForUpdate({})
                                    document.querySelectorAll(".markline" + index2)[index].children[0].value = defaultValue
                                }
                                return (<div key={index} className={`${"markline" + index2} t-flex t-items-center`}>

                                    {(mark?.idMark != selectedElementForUpdate?.mark?.idMark || selectedElementForUpdate?.typeId != element.idType) && <h2 className='t-bg-transparent t-border-0 t-outline-none t-w-full t-h-full'>{mark?.markName}</h2> || <input type="text" defaultValue={mark?.markName} className='t-bg-transparent t-border-0 t-outline-none t-w-full t-h-full' />}
                                    {(!selectedElementForUpdate?.mark?.idMark) && (
                                        <><div onClick={() => { setSelectMarkForDelete({ "mark": mark, "typeId": element.idType }) }} className='t-ml-auto t-mr-0.5 t-rounded-full t-fill-red-600 t-cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                        </div>
                                            <div onClick={updateName} className='t-ml-1 t-rounded-full t-fill-blue-600 t-cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                                    <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                                </svg>
                                            </div>
                                        </>)
                                    }
                                    {(selectedElementForUpdate?.mark?.idMark && selectedElementForUpdate?.mark?.idMark == mark.idMark && selectedElementForUpdate?.typeId == element.idType) && (

                                        <>
                                            {(!isUpdating)
                                                && (<div onClick={() => { confirmUpdate(selectedElementForUpdate?.mark?.idMark, document.querySelectorAll(".markline" + index2)[index].children[0].value) }} className='t-ml-auto t-mr-1 t-rounded-full t-fill-green-500 t-cursor-pointer'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" /></svg>
                                                </div>)
                                                || (<Loader height="17px" size="17px" border="3px" color="#4ade80" />)}
                                            <div onClick={cancelModify} className='t-mr-1 t-rounded-full t-fill-red-600 t-cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" /></svg>
                                            </div>
                                        </>)}
                                </div>)
                            })}
                        </div>

                    </details>)
                })}

            </div>
        </div >
    )
}

export default AddType