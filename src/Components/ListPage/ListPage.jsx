import React, { useState, useRef, useMemo, useEffect } from 'react'
import SideBar from '../SideBar/SideBar'
import { useParams } from "react-router-dom"
import "./ListPage.scss"
import { customAxios } from "../../CustomElement/axios"
import { useRecoilState } from "recoil"
import { UserAtom } from '../../SharedStates/SharedUserState'
import Loader from '../Loader/Loader'
import Line from './Line'
import useNotify from "../../CustomElement/UseNotify"
const ListPage = () => {
    const [searchValue, setSearchValue] = useState("")

    const [searchMethod, setSearchMethod] = useState("")

    const [typeFilter, setTypeFilter] = useState("tout")

    const [markFilter, setMarkFilter] = useState("tout")

    const [selectedIp, setSelectedIp] = useState({})

    const [ips, setIps] = useState(null)

    const [isDeleting, setIsDeleting] = useState(null)

    const [firstGet, setFirstGet] = useState(false)

    const [addLine, setAddLine] = useState(false)


    const [typesList, setTypesList] = useState([])
    const [markList, setMarkList] = useState([])


    const [user, setUser] = useRecoilState(UserAtom)


    const searchMethodSelect = useRef(null)
    const table = useRef(null)

    const { direction } = useParams()

    const notify = useNotify()

    useEffect(() => {
        setSearchMethod(searchMethodSelect.current.value)
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal


        const getIPs = async () => {
            customAxios.get(("/ip/getIPs/" + direction), {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`
                },
                signal: signal
            })
                .then((res) => {
                    setIps(res.data)
                }).catch((err) => {
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }

        const fetchIps = (first = false) => {
            const headss = {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                },
                signal: signal
            }
            customAxios.get(("/ip/getIPs/" + direction), headss)
                .then((response) => {
                    if (response.data.type && response.data.type == "token") {
                        if (response.data.error.startsWith("The Token has expired on")) {
                            customAxios.get("/tkn/refresh", {
                                headers: {
                                    Authorization: `Bearer ${localStorage.refresh_tkn}`,
                                },
                                signal: signal
                            }).then(async (res) => {
                                if (res.data.type != "token") {
                                    localStorage.access_tkn = res.data.access_token
                                    localStorage.refresh_tkn = res.data.refresh_token
                                    //fn
                                    getIPs()
                                    if (first) {
                                        setFirstGet(false)
                                        setSelectedIp({})
                                    }
                                }
                                else {
                                    setUser({ isLogged: false, id: null, username: null, role: null })
                                    localStorage.clid = ""
                                }
                            }).catch((err) => {
                                console.log("refresh token")
                                console.log(err)
                                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                            })
                        } else {
                            setUser({ isLogged: false, id: null, username: null, role: null })
                            localStorage.clid = ""
                        }
                    }
                    else if (Array.isArray(response.data)) {
                        setIps(response.data)
                        if (first) {
                            setFirstGet(false)
                            setSelectedIp({})
                        }
                    }
                })
                .catch((err) => {
                    if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
                })
        }

        if (ips === null || firstGet) {
            fetchIps(true)
        }
        else {
            var interval = setTimeout(fetchIps, 5000)
        }


        return () => {
            clearTimeout(interval)
            controller.abort()
        }

    }, [ips, firstGet])

    useMemo(() => { if (!firstGet) setFirstGet(true) }, [direction])



    const deleteRequest = (id) => {
        customAxios.delete(`/ip/deleteIP/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
            },
        }).then((response) => {
            if (response.data.success == true) {
                setFirstGet(true)
                setIsDeleting(null)
            }
            else if (response.data.success == false) {
                setIsDeleting(false)
                notify("warning", "Adresse IP n'existe pas")
            }
        }).catch((err) => {
            if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
        })
    }

    const deleteIp = (id) => {
        setIsDeleting(true)
        customAxios.delete(`/ip/deleteIP/${id}`, {
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
                                deleteRequest(id)
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
                else if (response.data.success == true) {
                    setIsDeleting(null)
                    setFirstGet(true)
                }
                else if (response.data.success == false) {
                    setIsDeleting(false)
                    notify("warning", "Adresse IP n'existe pas")
                }
            })
            .catch((err) => {
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
            })
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
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
        }

        const getMarkRequest = () => {
            customAxios.get(`/mark/getMarks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                },
            }).then((res) => {
                if (res.status == 200) {
                    setMarkList(res.data)
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
        customAxios.get(`/mark/getMarks`, {
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
                                getMarkRequest()
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
                    setMarkList(response.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
            .catch((err) => {
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
            })
    }, [])



    const ipDisponible = () => {
        if (ips) {
            const len = ips.length
            const firstOctet = ips[0]?.address.split(".")[0]
            if (firstOctet > 0 && 127 > firstOctet) {
                return (2 ** 24) - 3 - ips.length
            }
            else if (firstOctet > 127 && 200 > firstOctet) {
                return (2 ** 8) - 3 - ips.length
            }
            else {
                return (2 ** 16) - 3 - ips.length
            }
        } else {
            return ""
        }
    }


    const generateFirstIp = () => {

    }

    const confirmDelete = (id, address) => {
        setSelectedIp({ id, address })
    }
    return (
        <div className='t-flex t-font-body t-items-start t-h-full'>
            <SideBar />
            {(selectedIp.id) && <div className='t-fixed t-top-0 t-left-0 t-z-50 t-h-screen t-w-full t-bg-neutral-900/20 t-flex t-items-center t-justify-center'>
                <div className='t-bg-white t-box-content t-shadow-lg t-shadow-neutral-300 t-h-[290px] md:t-w-[450px] t-w-10/12 t-rounded-md t-p-5'>
                    <div onClick={() => { if (!isDeleting && !firstGet) setSelectedIp({}); if (isDeleting === false && !firstGet) setIsDeleting(null) }} className='t-ml-auto t-relative t-bottom-4 t-left-4 t-p-0.5 hover:t-bg-stone-300 t-rounded-full t-cursor-pointer t-fill-[#002e67]/75 t-w-min' >
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                            <path d="m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z" />
                        </svg>
                    </div>
                    <div className='t-w-full t-h-full t-flex t-items-center t-justify-start t-flex-col'>
                        <p className='t-tracking-widest t-text-[22px] t-text-[#002e67] t-mb-6 t-w-full t-text-center t-font-[900] t-whitespace-nowrap'> Supprission d'IP ?</p>
                        <h2 className='t-tracking-widest t-text-[15px] t-w-11/12 t-mx-auto t-text-center t-font-[600] t-text-[#002e67]/75'>Etes-vous sûr de supprimer <span className='t-font-bold t-text-[#002e67]/90'>{selectedIp.address}</span> ?</h2>
                        <p className='t-tracking-widest t-mt-1 t-text-[13px] t-w-11/12 t-mx-auto t-text-center t-font-[600] t-text-[#002e67]/75'>Vous ne pouvez pas annuler cette action</p>
                        <div className='t-w-full t-my-auto t-flex t-justify-around t-items-center'>
                            <button onClick={() => { if (!isDeleting && !firstGet) setSelectedIp({}); if (isDeleting === false && !firstGet) setIsDeleting(null) }} className='t-p-2 t-min-w-[40%] t-flex t-items-center t-justify-center t-rounded-full t-fill-white t-text-white hover:t-fill-gray-500 hover:t-text-gray-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-gray-500 hover:t-bg-white t-bg-gray-500 t-cursor-pointer t-w-min'>
                                <p>Annuler</p>
                            </button>
                            {(isDeleting === null || isDeleting === true) && (<button disabled={isDeleting || firstGet} onClick={(e) => { deleteIp(selectedIp.id); }} className={` ${(isDeleting || firstGet) ? "" : "hover:t-fill-red-500 hover:t-text-red-500 hover:t-border-red-500 hover:t-bg-white"} t-p-2 t-min-w-[40%] t-flex t-items-center t-justify-center t-rounded-full t-fill-white t-text-white  t-border-2 t-duration-300 t-delay-75 t-border-transparent t-bg-red-500 t-cursor-pointer t-w-min`}>
                                {(isDeleting || firstGet) && (<Loader className="lg:t-mx-0 t-mx-auto" height="30px" size="25px" border="3px" color="white" />) || (<><p>Supprimer</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg></>)}
                            </button>)}
                            {(isDeleting === false) && (<p className='t-text-red-600 t-tracking-wider t-text-[17px]'>Ip n'exist pas</p>)}
                        </div>
                    </div>
                </div>
            </div>}
            <div className='lg:t-w-[79.5%] t-w-full t-h-full t-ml-auto t-relative lg:t-top-[10px] t-top-[5rem]'>
                <div className='t-w-10/12 t-mx-auto t-mb-5 t-hidden lg:t-flex'>
                    <div className='wdj  t-bg-indigo-500 t-flex t-items-center t-justify-center t-h-28 t-shadow-lg t-shadow-neutral-300 t-rounded-md t-w-52'>
                        <div className=' t-flex-none'>
                            <img src="/assets/icons/ip.png" className='t-h-20 t-ml-4 t-w-20' />
                        </div>
                        <div className='t-ml-2'>
                            <p className='t-text-[25px] t-text-white t-font-body t-font-bold'>{ipDisponible()}</p>
                            <p className='t-text-[13px] t-text-white t-font-body'>Adresses IP disponibles</p>
                        </div>
                    </div>
                </div>
                <div className='t-mx-auto t-flex t-items-center lg:t-w-10/12 t-w-[96%] t-mb-5'>
                    <div className='t-flex opacityAnimation t-items-center'>
                        <input onInput={(e) => { setSearchValue(() => e.target.value) }} className='t-border-2 t-border-r-0 t-rounded-l-sm t-border-blue-500 focus:t-outline-none 
                        t-py-2 t-px-2 t-box-content lg:t-w-full t-w-full' type="text" placeholder={'Chercher avec ' + searchMethod} />
                        <select ref={searchMethodSelect} onChange={(e) => { setSearchMethod(e.target.value) }} className='t-cursor-pointer t-h-[44px] t-bg-blue-500 t-outline-none t-text-white t-text-[12px] t-w-20 t-text-center t-rounded-r-sm'>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="ip">Adresse IP</option>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="bureau">Bureau</option>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="nom">Noms</option>
                        </select>
                    </div>

                    <div className='md:t-flex opacityAnimation t-hidden t-flex-col t-ml-auto t-mr-5'>
                        <label className='t-text-white t-h-0 t-text-[10px] t-relative t-left-0.5 t-bottom-px'>Type</label>
                        <select defaultValue={"tout"} onChange={(e) => { setTypeFilter(e.target.value) }} className="t-cursor-pointer t-px-1 t-shadow-md t-h-[44px] t-bg-blue-500 t-outline-none t-text-white t-text-[13px] t-w-min t-min-w-[96px] t-text-center t-rounded-sm">
                            <option className='t-bg-white t-text-black t-text-[14px]' value="tout">Tout</option>
                            {typesList?.map((element, index) => {
                                return <option key={index} className='t-bg-white t-text-black t-text-[14px]' value={element.typeName}>{element.typeName}</option>
                            })}
                        </select>
                    </div>

                    <div className='md:t-flex opacityAnimation t-hidden t-flex-col t-mx-5'>
                        <label className='t-text-white t-h-0 t-text-[10px] t-relative t-left-0.5 t-bottom-px'>Mark</label>
                        <select className="t-cursor-pointer t-h-[44px] t-px-1 t-bg-blue-500 t-outline-none t-text-white t-text-[13px] lg:t-w-min t-min-w-[96px] t-text-center t-rounded-sm t-shadow-md" defaultValue={"tout"} onChange={(e) => { setMarkFilter(e.target.value) }}>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="tout">Tout</option>
                            {markList?.map((element, index) => {
                                return <option key={index} className='t-bg-white t-text-black t-text-[14px]' value={element.markName}>{element.markName}</option>
                            })}
                        </select>
                    </div>

                    {<button disabled={addLine} style={{ opacity: !addLine ? 1 : 0 }} onClick={() => { setAddLine(true) }} className='t-text-white opacityAnimation t-shadow-md t-duration-200  t-fill-white hover:t-fill-blue-500 t-flex t-items-center t-justify-center t-delay-75 t-ml-auto lg:t-mr-5 lg:t-rounded-full t-rounded-md t-bg-blue-500 t-border-2 t-border-blue-500 hover:t-bg-white hover:t-text-blue-500 t-h-min lg:t-px-4 t-px-1 lg:t-py-1 t-py-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" /></svg>
                        <p className='t-text-[14px]'>Ajouter</p>
                    </button>}
                </div>
                <div className="customScrollBar tableIp t-font-body t-overflow-auto t-h-min t-shadow-md sm:t-rounded-lg lg:t-w-10/12 t-w-[95%] t-mx-auto">
                    <table className="t-w-full t-text-sm t-text-left t-text-gray-500 dark:t-text-gray-400">
                        <thead className="t-text-xs t-text-gray-700 t-uppercase t-bg-gray-50 dark:t-bg-gray-700 dark:t-text-gray-400">
                            <tr>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Adresse IP
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Bureau
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Direction
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Type
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Marque
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Noms
                                </th>
                                <th scope='col' className='t-py-3 t-px-6 t-flex-1'>
                                    Editer
                                </th>
                            </tr>
                        </thead>
                        <tbody ref={table}>
                            <Line display={addLine} firstGet={firstGet} setFirstGet={() => { setFirstGet(true) }} removeLigne={() => { setAddLine(false) }} />
                            {ips?.filter((element) => {
                                var ret = true
                                if (searchValue) {
                                    if (searchMethod === "ip") {
                                        ret = element.address.startsWith(searchValue)
                                    }
                                    else if (searchMethod === "bureau") {
                                        ret = element.bureau.toUpperCase().startsWith(searchValue.toUpperCase())
                                    }
                                    else {
                                        ret = element.noms.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
                                    }
                                }
                                if (ret && typeFilter != "tout") {
                                    ret = element.type.typeName.toUpperCase() == typeFilter.toUpperCase()
                                }
                                if (ret && markFilter != "tout") {
                                    ret = element.mark?.markName?.toUpperCase() == markFilter.toUpperCase()
                                }
                                return ret
                            }).sort((a, b) => {
                                const first = Number(a.address.split(".").join(""))
                                const second = Number(b.address.split(".").join(""))
                                if (first > second) {
                                    return 1
                                }
                                else if (first <= second) {
                                    return -1
                                }
                            }).map((ip, index) => {
                                return <tr key={index} className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                    <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                        {ip.address}
                                    </th>
                                    <td className="t-py-4 t-px-6">
                                        {ip.bureau}
                                    </td>
                                    <td className="t-py-4 t-px-6 t-whitespace-nowrap">
                                        {ip.direction}
                                    </td>
                                    <td className="t-py-4 t-px-6">
                                        {ip.type.typeName}
                                    </td>
                                    <td className="t-py-4 t-px-6 t-whitespace-nowrap">
                                        {ip.mark?.markName ? ip.mark.markName : "______"}
                                    </td>
                                    <td className="t-py-4 t-px-6 t-text-left">
                                        {ip.noms ? ip.noms : "______"}
                                    </td>
                                    <td className="t-py-4 t-px-3 t-text-left t-flex t-justify-center t-items-center t-space-x-2">
                                        <div onClick={() => { confirmDelete(ip.idAddress, ip.address) }} className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                        </div>
                                        <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                                <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    )
}

export default ListPage