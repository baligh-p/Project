import React, { useState, useRef, useEffect } from 'react'
import "../AddType/AddType.scss"
import useNotify from "../../CustomElement/UseNotify"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../../CustomElement/axios'
import Loader from '../Loader/Loader'
const AddDirection = () => {
    const direction = useRef(null)
    const [isLoadingDir, setIsLoadingDir] = useState(false)
    const [user, setUser] = useRecoilState(UserAtom)
    const notify = useNotify()
    const [directions, setDirections] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)
    const [selectedDirection, setSelectedDirection] = useState(null)
    const [selectedDirectionForModifing, setSelectedDirectionForModifing] = useState({})
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)


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
    const handleAddDirection = (e) => {
        e.preventDefault()
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


    useEffect(() => {
        const getDir = () => {
            customAxios.get(`/dir/getDir`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                if (Array.isArray(response.data)) {
                    setDirections(response.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
        }

        customAxios.get(`/dir/getDir`, {
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
                                getDir()
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
                        setDirections(response.data)
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
    }, [selectedDirection, isLoadingDir, isLoadingUpdate])
    const deleteDirection = (idDirection) => {
        setIsDeleting(true)
        const deleteDirection = () => {
            customAxios.delete(`/dir/deleteDirection/${idDirection}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                setIsDeleting(false)
                setSelectedDirection({})
                if (response.data.success) {
                    notify("success", "La direction a étè supprimée ")
                }
                else {
                    notify("warning", "error de suppression de direction")
                }
            })
        }

        customAxios.delete(`/dir/deleteDirection/${idDirection}`, {
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
                                deleteDirection()
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
                    setSelectedDirection({})
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
        deleteDirection(selectedDirection.idDirection)
    }
    return (
        <div className='t-flex lg:t-w-[79.5%] t-w-full lg:t-mt-auto t-h-screen t-ml-auto t-flex-col t-justify-center t-items-center'>
            {(selectedDirection?.idDirection) && <div className='t-fixed t-top-0 t-z-50 t-left-0 t-h-screen t-w-full t-bg-neutral-900/20 t-flex t-items-center t-justify-center'>
                <div className='t-bg-white t-box-content t-shadow-lg t-shadow-neutral-300 t-h-[290px] md:t-w-[450px] t-w-10/12 t-rounded-md t-p-5'>
                    <div onClick={() => { if (!isDeleting) setSelectedDirection({}); }} className='t-ml-auto t-relative t-bottom-4 t-left-4 t-p-0.5 hover:t-bg-stone-300 t-rounded-full t-cursor-pointer t-fill-[#002e67]/75 t-w-min' >
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                            <path d="m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z" />
                        </svg>
                    </div>
                    <div className='t-w-full t-h-full t-flex t-items-center t-justify-start t-flex-col'>
                        <p className='t-tracking-widest t-text-[22px] t-text-[#002e67] t-mb-6 t-w-full t-text-center t-font-[900] t-whitespace-nowrap'> Supprission De Direction ?</p>
                        <h2 className='t-tracking-widest t-text-[15px] t-w-11/12 t-mx-auto t-text-center t-font-[600] t-text-[#002e67]/75'>Etes-vous sûr de supprimer <span className='t-font-bold t-text-[#002e67]/90'>{selectedDirection.directionName}</span> ?</h2>
                        <p className='t-tracking-widest t-mt-1 t-text-[13px] t-w-11/12 t-mx-auto t-text-center t-font-[600] t-text-[#002e67]/75'>Vous ne pouvez pas annuler cette action</p>
                        <div className='t-w-full t-my-auto t-flex t-justify-around t-items-center'>
                            <button onClick={() => { if (!isDeleting) setSelectedDirection({}); }} disabled={isDeleting} className='t-p-2 t-min-w-[40%] t-flex t-items-center t-justify-center t-rounded-full t-fill-white t-text-white hover:t-fill-gray-500 hover:t-text-gray-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-gray-500 hover:t-bg-white t-bg-gray-500 t-cursor-pointer t-w-min'>
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
            <div className='lg:t-h-[95%] t-h-full lg:t-p-7 t-py-7 t-px-0 lg:t-w-3/5 t-w-full t-bg-white'>
                <form className='t-flex t-h-full lg:t-relative lg:-t-top-10 t-flex-col t-items-end t-space-y-2 lg:t-justify-end t-justify-center t-mx-auto lg:t-w-8/12 t-w-11/12 md:t-w-8/12 t-z-20'>
                    <div className='t-flex t-items-center t-justify-end t-w-full t-relative'>
                        <div className='t-flex t-flex-col t-w-full t-mx-auto'>
                            <label onClick={(e) => { e.target.parentNode.children[1].focus() }} className='t-relative t-w-min t-h-0 t-duration-150 t-left-2 t-text-blue-500 t-cursor-text t-select-none  lg:t-translate-y-[18px] t-translate-y-[15px] t-text-[15px] lg:t-text-sm'>Direction</label>
                            <input ref={direction} onFocus={handleFocus} onBlur={handleBlur} type="text" className="t-bg-white t-rounded-md t-duration-150 t-outline-none t-text-[17px] lg:t-text-base t-h-10 t-px-2 t-py-[24px] lg:t-py-[25px] t-border-2 t-border-blue-500" />
                        </div>
                        {(!isLoadingDir) && <button onClick={handleAddDirection} className='t-flex t-px-5  t-space-x-1 t-h-full t-absolute t-items-center t-justify-centert-h-[54px] t-z-30 t-rounded-md t-fill-white t-bg-blue-500'>
                            <svg className='t-h-4 t-w-4' xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 32 32" viewBox="0 0 32 32"><path d="M2.4375,17.9375h11.625v11.625c0,1.06854,0.86896,1.9375,1.9375,1.9375s1.9375-0.86896,1.9375-1.9375v-11.625h11.625c1.06854,0,1.9375-0.86896,1.9375-1.9375s-0.86896-1.9375-1.9375-1.9375h-11.625V2.4375C17.9375,1.36896,17.06854,0.5,16,0.5s-1.9375,0.86896-1.9375,1.9375v11.625H2.4375C1.36896,14.0625,0.5,14.93146,0.5,16S1.36896,17.9375,2.4375,17.9375z" /></svg>
                        </button> || (<Loader className="t-absolute t-ml-14" height="20px" size="20px" border="4px" color="#60a5fa" />)}
                    </div>
                    <div className='customScrollBarDark t-bg-white t-shadow-md t-border-2 t-border-blue-500 t-overflow-y-auto t-rounded-lg t-h-3/5 t-w-full'>
                        {directions.map((element, index) => {
                            const defaultValue = element.directionName

                            const updateName = async (element) => {
                                await setSelectedDirectionForModifing(element)
                                await document.querySelectorAll(".directionLine")[index].children[0].focus()
                            }


                            const cancelModify = () => {
                                setSelectedDirectionForModifing({})
                                document.querySelectorAll(".directionLine")[index].children[0].value = defaultValue
                            }

                            const submitUpdate = () => {
                                const newName = document.querySelectorAll(".directionLine")[index].children[0].value
                                if (newName) {
                                    setIsLoadingUpdate(true)
                                    const updateDirection = () => {
                                        customAxios.put(`/dir/updateName/${selectedDirectionForModifing.idDirection}/${newName}`, {}, {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.access_tkn}`,
                                                "Content-Type": "application/json"
                                            },
                                        }).then((response) => {
                                            setIsLoadingUpdate(false)
                                            setSelectedDirectionForModifing({})
                                            if (response.data.success) {
                                                notify("success", "La direction a étè modifiée ")
                                            }
                                            else {
                                                notify("warning", "error de modification de direction")
                                            }
                                        })
                                    }

                                    customAxios.put(`/dir/updateName/${selectedDirectionForModifing.idDirection}/${newName}`, {}, {
                                        headers: {
                                            Authorization: `Bearer ${localStorage.access_tkn}`,
                                            "Content-Type": "application/json"
                                        },
                                    })
                                        .then((response) => {
                                            setIsLoadingUpdate(false)
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
                                                            updateDirection()
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
                                                setIsLoadingUpdate(false)
                                                setSelectedDirectionForModifing({})
                                                if (response.data.success) {
                                                    notify("success", "La direction a étè modifiée ")
                                                }
                                                else {
                                                    notify("warning", "error de modification de direction")
                                                }
                                            }
                                            else {
                                                notify("error", "Erreur d'execution de requete")
                                            }
                                        })
                                        .catch((err) => {
                                            setIsLoadingUpdate(false)
                                            if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                                        })
                                }
                            }


                            return <div key={index} className={`directionLine ${(selectedDirectionForModifing.idDirection && element.idDirection != selectedDirectionForModifing?.idDirection) ? "t-opacity-40 t-border-b-0" : ""} t-h-12 t-select-none t-flex t-items-center t-border-b-2 t-border-neutral-300`}>
                                {(element.idDirection != selectedDirectionForModifing?.idDirection) && <h2 className="t-select-none t-flex t-items-center t-bg-white t-border-0 t-outline-none t-px-4 t-h-full t-w-full">{defaultValue}</h2> || <input defaultValue={element?.directionName} type="text" className="t-select-none t-bg-white t-border-0 t-outline-none t-px-4 t-h-full t-w-full" />}
                                {(!selectedDirectionForModifing?.idDirection) && (<div onClick={() => { updateName(element) }} className='t-p-0.5 t-ml-auto t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                        <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                    </svg>
                                </div>)}
                                {(!selectedDirectionForModifing?.idDirection) && (<div onClick={() => { setSelectedDirection(element) }} className='t-p-0.5 t-mx-1 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                </div>)}
                                {(selectedDirectionForModifing?.idDirection && selectedDirectionForModifing?.idDirection == element.idDirection) &&
                                    <>{(!isLoadingUpdate) &&
                                        (<div onClick={submitUpdate} className='t-p-0.5 t-mr-1 t-rounded-full t-fill-white hover:t-fill-green-400 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-green-400 hover:t-bg-white t-bg-green-400 t-cursor-pointer t-w-min'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z" /></svg>
                                        </div>) ||
                                        (<Loader height="23px" size="23px" border="3px" color="#4ade80" />)}</>}
                                {(selectedDirectionForModifing?.idDirection && selectedDirectionForModifing?.idDirection == element.idDirection) && (<div onClick={cancelModify} className='t-p-0.5 t-mx-1 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z" /></svg>
                                </div>)}
                            </div>
                        })}
                    </div>
                </form>
            </div >
        </div >
    )
}

export default AddDirection