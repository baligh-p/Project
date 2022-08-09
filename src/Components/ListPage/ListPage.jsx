import React, { useState, useRef, useEffect } from 'react'
import SideBar from '../SideBar/SideBar'
const ListPage = () => {
    const [searchValue, setSearchValue] = useState("")
    const [searchMethod, setSearchMethod] = useState("")
    const [typeFilter, setTypeFilter] = useState("")
    const [markFilter, setMarkFilter] = useState("")
    const searchMethodSelect = useRef(null)
    useEffect(() => {
        setSearchMethod(searchMethodSelect.current.value)
    }, [])

    return (
        <div className='t-flex t-font-body t-items-start t-h-full'>
            <SideBar />
            <div className='lg:t-w-[79.5%] t-w-full t-h-full t-ml-auto t-relative lg:t-top-[10px] t-top-[5rem]'>
                <div className='t-w-10/12 t-mx-auto t-mb-5 t-hidden lg:t-flex'>
                    <div className='t-bg-indigo-500 t-flex t-items-center t-justify-center t-h-28 t-shadow-lg t-shadow-neutral-300 t-rounded-md t-w-52'>
                        <div className=' t-flex-none'>
                            <img src="/icons/ip.png" className='t-h-20 t-ml-4 t-w-20' />
                        </div>
                        <div className='t-ml-2'>
                            <p className='t-text-[25px] t-text-white t-font-body t-font-bold'>50</p>
                            <p className='t-text-[13px] t-text-white t-font-body'>Adresses IP disponibles</p>
                        </div>
                    </div>
                </div>
                <div className='t-mx-auto lg:t-flex t-items-center t-w-10/12 t-mb-5'>
                    <div className='t-flex t-items-center '>
                        <input onInput={(e) => { setSearchValue(() => e.target.value) }} className='t-border-2 t-border-r-0 t-rounded-l-sm t-border-blue-500 focus:t-outline-none 
                        t-py-2 t-px-2 t-box-content lg:t-w-full t-w-full' type="text" placeholder={'Chercher avec ' + searchMethod} />
                        <select ref={searchMethodSelect} onChange={(e) => { setSearchMethod(e.target.value) }} className='t-cursor-pointer t-h-[44px] t-bg-blue-500 t-outline-none t-text-white t-text-[12px] t-w-20 t-text-center t-rounded-r-sm'>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="ip">Adresse IP</option>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="bureau">Bureau</option>
                            <option className='t-bg-white t-text-black t-text-[14px]' value="nom">Nom</option>
                        </select>
                    </div>

                    <div className='t-flex t-flex-col t-ml-auto t-mr-5'>
                        <label className='t-text-white t-h-0 t-text-[10px] t-relative t-left-0.5 t-bottom-px'>Type</label>
                        <select defaultValue={"tout"} onChange={(e) => { setTypeFilter(e.target.value) }} className="t-cursor-pointer t-px-1 t-shadow-md t-h-[44px] t-bg-blue-500 t-outline-none t-text-white t-text-[13px] t-w-min t-min-w-[96px] t-text-center t-rounded-sm">
                            <option className='t-bg-white t-text-black t-text-[13px]' value="tout">Tout</option>
                            <option className='t-bg-white t-text-black t-text-[13px]' value="imprimante">Imprimante Protable</option>
                            <option className='t-bg-white t-text-black t-text-[13px]' value="pc">PC</option>
                        </select>
                    </div>

                    <div className='t-flex t-flex-col t-mx-5'>
                        <label className='t-text-white t-h-0 t-text-[10px] t-relative t-left-0.5 t-bottom-px'>Mark</label>
                        <select className="t-cursor-pointer t-h-[44px] t-px-1 t-bg-blue-500 t-outline-none t-text-white t-text-[13px]  lg:t-w-min t-min-w-[96px]  t-text-center t-rounded-sm t-shadow-md" defaultValue={"tout"} onChange={(e) => { setMarkFilter(e.target.value) }}>
                            <option className='t-bg-white t-text-black t-text-[13px]' value="tout">Tout</option>
                            <option className='t-bg-white t-text-black t-text-[13px]' value="imprimante">Asus</option>
                            <option className='t-bg-white t-text-black t-text-[13px]' value="pc">HP</option>
                        </select>
                    </div>

                    <button className='t-text-white t-shadow-md t-duration-200  t-fill-white hover:t-fill-blue-500 t-hidden lg:t-flex t-items-center t-justify-center t-delay-75 t-ml-auto t-mr-5 t-rounded-full t-bg-blue-500 t-border-2 t-border-blue-500 hover:t-bg-white hover:t-text-blue-500 t-h-min t-px-4 t-py-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" /></svg>
                        <p>Ajouter</p>
                    </button>
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
                                    Type
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Marque
                                </th>
                                <th scope="col" className="t-py-3 t-px-6">
                                    Noms
                                </th>
                                <th scope='col' className='t-py-3 t-px-6'>
                                    Editer
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-red-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                            <tr className="t-bg-white t-border-b dark:t-bg-gray-800 dark:t-border-gray-700">
                                <th scope="row" className="t-py-4 t-px-6 t-font-medium t-text-gray-900 t-whitespace-nowrap dark:t-text-white">
                                    192.168.0.5
                                </th>
                                <td className="t-py-4 t-px-6">
                                    sccc5
                                </td>
                                <td className="t-py-4 t-px-6">
                                    Laptop
                                </td>
                                <td className="t-py-4 t-px-6">
                                    ASUS
                                </td>
                                <td className="t-py-4 t-px-6 t-text-left">
                                    Foulen
                                </td>
                                <td className="t-py-4 t-px-3 t-text-left t-flex t-space-x-2">
                                    <div className='t-p-1.5 t-rounded-full t-fill-white t-border-2 t-border-transparent t-duration-300 t-delay-75  hover:t-fill-red-500 hover:t-border-red-500 hover:t-bg-white t-bg-red-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z" /></svg>
                                    </div>
                                    <div className='t-p-1.5 t-rounded-full t-fill-white hover:t-fill-blue-500 t-border-2 t-duration-300 t-delay-75 t-border-transparent hover:t-border-blue-500 hover:t-bg-white t-bg-blue-500 t-cursor-pointer t-w-min'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                            <path d="M5 19h1.4l8.625-8.625-1.4-1.4L5 17.6ZM19.3 8.925l-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Zm-3.525-.725-.7-.7 1.4 1.4Z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default ListPage