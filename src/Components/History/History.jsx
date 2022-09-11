import React, { useEffect, useRef, useState } from 'react'
import useNotify from "../../CustomElement/UseNotify"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import { customAxios } from '../../CustomElement/axios'
import { useLocation } from 'react-router-dom'

const History = () => {

    const [user, setUser] = useRecoilState(UserAtom)

    const notify = useNotify()

    const [historys, setHistorys] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const searchMethodSelect = useRef(null)
    const [searchMethod, setSearchMethod] = useState("")
    const [directionList, setDirectionList] = useState([])
    const [directionFilter, setDirectionFilter] = useState("tout")

    const location = useLocation()

    useEffect(() => {
        setSearchMethod(searchMethodSelect.current.value)
    }, [])

    useState(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const getHistorysRequest = () => {
            customAxios.get(`/ip/getHistorys`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                },
                signal: signal
            }).then((res) => {
                if (res.status == 200) {
                    setHistorys(res.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
        }
        customAxios.get(`/ip/getHistorys`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_tkn}`,
            },
            signal: signal
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
                                getHistorysRequest()
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
                    setHistorys(response.data)
                }
                else {
                    notify("error", "Erreur d'execution de requete")
                }
            })
            .catch((err) => {
                if (err.code !== "ERR_CANCELED") notify("error", "Erreur d'execution de requete")
            })
        return () => {
            controller.abort()
        }
    }, [location.pathname])


    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const getDir = () => {
            customAxios.get(`/dir/getDir`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_tkn}`,
                    "Content-Type": "application/json"
                },
                signal: signal
            }).then((response) => {
                if (Array.isArray(response.data)) {
                    setDirectionList(response.data)
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
            signal: signal
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
                        setDirectionList(response.data)
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
        return () => {
            controller.abort()
        }
    }, [location.pathname])


    const formatData = (d) => {
        var date = d.split("T")[0].split("-")
        date = date[2] + "/" + date[1] + "/" + date[0]
        var time = d.split("T")[1].split(":")
        time = (time[0] != "23" ? (Number(time[0]) + 1) : "00") + ":" + time[1]
        return time + " " + date
    }
    return (
        <div className='lg:t-w-[79.5%] t-w-full t-h-full t-ml-auto t-relative lg:t-top-[40px] t-top-[5rem]'>
            <div className='t-mx-auto t-flex t-items-center lg:t-w-10/12 t-w-[96%] t-mb-5'>
                <div className='t-flex opacityAnimation t-items-center t-mx-auto lg:t-mx-0'>
                    <input onInput={(e) => { setSearchValue(() => e.target.value) }} className='t-border-2 t-border-r-0 t-rounded-l-sm t-border-blue-500 focus:t-outline-none 
                        t-py-2 t-px-2 t-box-content lg:t-w-full t-w-full' type="text" placeholder={'Chercher avec ' + searchMethod} />
                    <select ref={searchMethodSelect} onChange={(e) => { setSearchMethod(e.target.value) }} className='t-cursor-pointer t-h-[44px] t-bg-blue-500 t-outline-none t-text-white t-text-[12px] t-w-20 t-text-center t-rounded-r-sm'>
                        <option className='t-bg-white t-text-black t-text-[14px]' value="ip">Adresse IP</option>
                        <option className='t-bg-white t-text-black t-text-[14px]' value="bureau">Bureau</option>
                        <option className='t-bg-white t-text-black t-text-[14px]' value="utilisateur">Utilisateur</option>
                    </select>
                </div>
                <div className='md:t-flex opacityAnimation t-hidden t-flex-col t-mx-5'>
                    <label className='t-text-white t-h-0 t-text-[10px] t-relative t-left-0.5 t-bottom-px'>Direction</label>
                    <select className="t-cursor-pointer t-h-[44px] t-px-1 t-bg-blue-500 t-outline-none t-text-white t-text-[13px] lg:t-w-min t-min-w-[96px] t-text-center t-rounded-sm t-shadow-md" defaultValue={"tout"} onChange={(e) => { setDirectionFilter(e.target.value) }}>
                        <option className='t-bg-white t-text-black t-text-[14px]' value="tout">Tout</option>
                        {directionList?.map((element, index) => {
                            return <option key={index} className='t-bg-white t-text-black t-text-[14px]' value={element.directionName}>{element.directionName}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="customScrollBar tableHist t-font-body t-overflow-auto t-h-min t-shadow-md sm:t-rounded-lg lg:t-w-10/12 t-w-[95%] t-mx-auto">
                <table className="t-w-full t-text-sm t-text-left t-text-gray-500 dark:t-text-gray-400">
                    <thead className="t-text-xs t-text-gray-700 t-uppercase t-bg-gray-50 dark:t-bg-gray-700 dark:t-text-gray-400">
                        <tr>
                            <th scope="col" className="t-py-3 t-px-6">
                                Adresse IP
                            </th>
                            <th scope="col" className="t-py-3 t-px-6">
                                Nom d'Utilisateur
                            </th>
                            <th scope="col" className="t-py-3 t-px-6">
                                Direction
                            </th>
                            <th scope="col" className="t-py-3 t-px-6">
                                Bureau
                            </th>
                            <th scope="col" className="t-py-3 t-px-6">
                                Operation
                            </th>
                            <th scope="col" className="t-py-3 t-px-6">
                                Date d'Operation
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {historys?.filter((element) => {
                            var ret = true
                            if (searchValue) {
                                if (searchMethod === "ip") {
                                    ret = element.address.startsWith(searchValue)
                                }
                                else if (searchMethod === "bureau") {
                                    ret = element.bureau.toUpperCase().startsWith(searchValue.toUpperCase())
                                }
                                else if (searchMethod == "utilisateur") {
                                    ret = element.user.username.toUpperCase().startsWith(searchValue.toUpperCase())
                                }
                            }
                            if (ret && directionFilter != "tout") {
                                ret = element.direction.toUpperCase() == directionFilter.toUpperCase()
                            }
                            return ret
                        }).map((ip, index) => {
                            return <tr key={index} className={`${ip.typeOperation == "delete" ? "t-bg-red-100/50" : ip.typeOperation == "update" ? "t-bg-yellow-100/50" : "t-bg-green-100/50"} t-border-b dark:t-bg-gray-800 dark:t-border-gray-700`}>
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    {ip.address}
                                </th>
                                <td className={`${user.username == ip.user.username ? "t-font-bold t-text-neutral-700 t-underline t-underline-offset-1 t-decoration-neutral-700" : ""} t-py-4 t-px-6`}>
                                    {ip.user.username}
                                </td>
                                <td className="t-py-4 t-px-6 t-whitespace-nowrap">
                                    {ip.direction}
                                </td>
                                <td className="t-py-4 t-px-6">
                                    {ip.bureau}
                                </td>
                                <td className="t-py-4 t-px-6 t-whitespace-nowrap">
                                    {ip.typeOperation}
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    {formatData(ip.createdAt)}
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default History