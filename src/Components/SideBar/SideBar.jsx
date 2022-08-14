import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useParams } from "react-router-dom"
import { UserAtom } from '../../SharedStates/SharedUserState'
import { useRecoilState } from 'recoil'
import "./SideBar.scss"
const SideBar = () => {
    const location = useLocation()
    const { direction } = useParams()
    const sideBar = useRef(null)

    const [showSecondSideBar, setShowSecondSideBar] = useState(false)
    const [user, setUser] = useRecoilState(UserAtom)

    const directions = ["dr1", "dr2", "dr3", "dr4", "dr5", "dr6", "dr7", "dr8", "dr9", "dr10"]
    useEffect(() => {

        document.querySelector(".stat").parentNode.childNodes.forEach((element) => {
            if (!element.classList.contains("deconnecter")) {
                element.classList.remove("selectedLink")
                element.classList.add("notSelectedLink")
            }
        })
        if (location.pathname.split("/").filter(element => element != "").find(element => element == "IP_List")) {
            document.querySelector(".IP_List").classList.replace("notSelectedLink", "selectedLink")

            directions.forEach((element) => {
                document.querySelector("." + element).classList.remove("selectedLink")
                document.querySelector("." + element).classList.add("notSelectedLink")
            })
            document.querySelector("." + direction).classList.replace("notSelectedLink", "selectedLink")
        }
        else if (location.pathname.split("/").filter(element => element != "").find(element => element == "History")) {
            document.querySelector(".hist").classList.replace("notSelectedLink", "selectedLink")
        }
        else if (location.pathname.split("/").filter(element => element != "").find(element => element == "MyProfile")) {
            document.querySelector(".myPF").classList.replace("notSelectedLink", "selectedLink")
        }
        else if (location.pathname.split("/").filter(element => element != "").find(element => element == "Add_Marks")) {
            document.querySelector(".marks").classList.replace("notSelectedLink", "selectedLink")
        }
        //Add_User
        else if (location.pathname.split("/").filter(element => element != "").find(element => element == "Add_User")) {
            document.querySelector(".addUser").classList.replace("notSelectedLink", "selectedLink")
        }
        else {
            document.querySelector(".stat").classList.replace("notSelectedLink", "selectedLink")
        }
    }, [location.pathname])

    const toggleSideBar = () => {
        document.getElementById("burger").classList.toggle("active")
        if (sideBar.current.classList.contains("-t-left-full")) {
            sideBar.current.classList.replace("-t-left-full", "t-left-0")
        }
        else {
            sideBar.current.classList.replace("t-left-0", "-t-left-full")
        }
    }
    const closeSideBar = () => {
        document.getElementById("burger").classList.remove("active")
        sideBar.current.classList.replace("t-left-0", "-t-left-full")
    }
    const logout = () => {
        localStorage.refresh_tkn = ""
        localStorage.access_tkn = ""
        localStorage.clid = ""
        setUser({ isLogged: false, id: null, username: null, role: null })
    }
    return (
        <div ref={sideBar} className='sideBar t-font-body lg:t-w-[20.5%] t-w-full t-z-50 t-fixed lg:t-top-0 t-top-[4.3rem] t-duration-500 t-delay-75 lg:t-left-0 -t-left-full  t-bg-[#202020] t-h-full t-px-5 t-py-3'>
            <div className='t-h-[4.3rem] lg:t-h-min lg:t-mt-1 t-flex t-items-center lg:t-w-auto t-w-full t-bg-[#202020] lg:t-static t-fixed t-top-0 t-left-0'>
                <div id="burger" onClick={toggleSideBar}><div className="burgerLight t-flex lg:t-hidden t-z-20 t-ml-4"></div></div>
                <h1 className='t-text-white t-text-bold t-tracking-widest t-text-[27px] t-ml-4 lg:t-ml-0'>WebSite</h1>
                {(showSecondSideBar) && (<div onClick={() => {
                    setShowSecondSideBar(() => false)
                }} className='t-ml-auto t-relative lg:t-top-1 lg:t-mr-0 t-mr-3 t-cursor-pointer'>
                    <svg className=' t-fill-white' xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                        <path xmlns="http://www.w3.org/2000/svg" d="M14.958 29.958 5 19.958 14.958 10l2 1.958-6.625 6.625H35v2.792H10.333l6.625 6.583Z" />
                    </svg>
                </div>)}
            </div>
            <div className='t-w-full t-hidden lg:t-flex t-mx-auto t-h-[1px] t-bg-neutral-500 t-my-5'></div>
            <div className='t-w-full t-flex t-overflow-hidden'>
                <div className={`linksContainer ${showSecondSideBar ? "-t-ml-[100%]" : "t-ml-0"} t-z-10 t-w-full t-flex-none t-whitespace-nowrap t-duration-200 t-overflow-hidden t-flex t-flex-col t-justify-start t-items-start`}>
                    <Link onClick={closeSideBar} to="/" className='stat t-select-none t-text-body t-cursor-pointer t-w-full hover:t-relative hover:t-left-1  t-px-2 t-rounded-md t-py-2 t-mx-auto t-flex t-space-x-3 t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M3.325 20.675V19.15l1.35-1.35v2.875Zm4 0V15.15l1.35-1.35v6.875Zm4 0v-6.9l1.35 1.4v5.5Zm4 0v-5.5l1.35-1.35v6.85Zm4 0V11.15l1.35-1.35v10.875Zm-16-5.65V13.15L10 6.475l4 4L20.675 3.8v1.875L14 12.35l-4-4Z" />
                        </svg>
                        <h3 className='t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>Statistiques</h3>
                    </Link>
                    <Link to={"/IP_List/" + directions[0]} onClick={() => { setShowSecondSideBar(true) }} className='IP_List t-select-none t-text-body t-cursor-pointer hover:t-relative hover:t-left-1 t-w-full t-px-2  t-rounded-md t-py-2 t-mx-auto t-flex t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M4.35 19.275q-.5 0-.85-.35t-.35-.85q0-.5.35-.85t.85-.35q.5 0 .85.35t.35.85q0 .5-.35.85t-.85.35Zm3.9-.525V17.4h12.6v1.35Zm-3.9-5.575q-.5 0-.85-.35t-.35-.85q0-.5.35-.85t.85-.35q.5 0 .85.35t.35.85q0 .5-.35.85t-.85.35Zm3.9-.525V11.3h12.6v1.35Zm-3.9-5.575q-.5 0-.85-.35t-.35-.85q0-.5.35-.85t.85-.35q.5 0 .85.35t.35.85q0 .5-.35.85t-.85.35Zm3.9-.525V5.2h12.6v1.35Z" />
                        </svg>
                        <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>Liste des Adresses IP</h3>
                        <svg className='t-ml-auto t-relative t-left-1.5' xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="m9.4 17.575-.95-.95 4.65-4.65-4.65-4.65.95-.95 5.6 5.6Z" />
                        </svg>
                    </Link>
                    <Link onClick={closeSideBar} to="/History" className='hist t-select-none t-text-body hover:t-ml-1 t-cursor-pointer t-w-full t-px-2  t-rounded-md t-py-2 t-mx-auto t-flex t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M12.325 20.5Q9 20.5 6.55 18.387 4.1 16.275 3.8 13h1.4q.35 2.65 2.35 4.4 2 1.75 4.725 1.75 2.95 0 5.025-2.088 2.075-2.087 2.075-5.062 0-2.95-2.05-5.05-2.05-2.1-5-2.1-1.675 0-3.15.712-1.475.713-2.5 1.988h2.65V8.9h-4.85V4.05h1.35V6.5Q7 5.025 8.713 4.262q1.712-.762 3.612-.762 1.75 0 3.275.662 1.525.663 2.675 1.825 1.15 1.163 1.8 2.713.65 1.55.65 3.3 0 1.75-.65 3.3-.65 1.55-1.8 2.713-1.15 1.162-2.675 1.824-1.525.663-3.275.663Zm2.725-4.25-4-3.95V6.6h1.35v5.1l3.6 3.6Z" />
                        </svg>
                        <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>Historique</h3>
                    </Link>
                    <Link onClick={closeSideBar} to="/Add_Marks" className='marks t-select-none t-text-body hover:t-ml-1 t-cursor-pointer t-w-full t-px-2  t-rounded-md t-py-2 t-mx-auto t-flex t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.25 18.75v-6h-6v-1.5h6v-6h1.5v6h6v1.5h-6v6Z" /></svg>
                        <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>Ajouter une marque</h3>
                    </Link>
                    <Link onClick={closeSideBar} to="/Add_User" className='addUser t-select-none t-text-body hover:t-ml-1 t-cursor-pointer t-w-full t-px-2  t-rounded-md t-py-2 t-mx-auto t-flex t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M18.125 13.75v-3h-3v-1.5h3v-3h1.5v3h3v1.5h-3v3Zm-9.25-2.05q-1.45 0-2.475-1.038Q5.375 9.625 5.375 8.2q0-1.45 1.025-2.475Q7.425 4.7 8.875 4.7q1.45 0 2.475 1.025Q12.375 6.75 12.375 8.2q0 1.425-1.025 2.462Q10.325 11.7 8.875 11.7Zm-7.5 7.6v-2.225q0-.725.4-1.35.4-.625 1.075-.975 1.475-.725 2.988-1.088Q7.35 13.3 8.875 13.3t3.038.362q1.512.363 2.987 1.088.675.35 1.075.975.4.625.4 1.35V19.3Zm1.5-1.5h12v-.725q0-.3-.175-.55-.175-.25-.475-.425-1.3-.625-2.637-.963-1.338-.337-2.713-.337t-2.713.337q-1.337.338-2.637.963-.3.175-.475.425t-.175.55Zm6-7.6q.825 0 1.413-.588.587-.587.587-1.412t-.587-1.413Q9.7 6.2 8.875 6.2q-.825 0-1.412.587-.588.588-.588 1.413 0 .825.588 1.412.587.588 1.412.588Zm0-2Zm0 6.6Z" />
                        </svg>
                        <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>Ajouter un Utilisateur</h3>
                    </Link>
                    <Link onClick={closeSideBar} to="/MyProfile" className='myPF t-select-none hover:t-relative hover:t-left-1 t-text-body t-cursor-pointer  t-w-full t-px-2  t-rounded-md t-py-2 t-mx-auto t-flex t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M5.975 17.425q1.4-.975 2.863-1.5Q10.3 15.4 12 15.4t3.163.525q1.462.525 2.862 1.5 1.025-1.15 1.575-2.487.55-1.338.55-2.938 0-3.35-2.4-5.75T12 3.85q-3.35 0-5.75 2.4T3.85 12q0 1.6.55 2.938.55 1.337 1.575 2.487ZM12 12.95q-1.45 0-2.45-1-1-1-1-2.45 0-1.45 1-2.45 1-1 2.45-1 1.45 0 2.45 1 1 1 1 2.45 0 1.45-1 2.45-1 1-2.45 1Zm0 8.55q-1.95 0-3.688-.75-1.737-.75-3.025-2.038Q4 17.425 3.25 15.688q-.75-1.738-.75-3.713 0-1.95.75-3.675Q4 6.575 5.287 5.287 6.575 4 8.312 3.25q1.738-.75 3.713-.75 1.95 0 3.675.75 1.725.75 3.012 2.037Q20 6.575 20.75 8.3q.75 1.725.75 3.7 0 1.95-.75 3.688-.75 1.737-2.038 3.024Q17.425 20 15.7 20.75q-1.725.75-3.7.75Zm0-1.35q1.275 0 2.637-.475 1.363-.475 2.338-1.3-.975-.75-2.262-1.187-1.288-.438-2.713-.438t-2.725.425q-1.3.425-2.25 1.2.975.825 2.338 1.3 1.362.475 2.637.475Zm0-8.55q.85 0 1.475-.625.625-.625.625-1.475 0-.85-.625-1.475Q12.85 7.4 12 7.4q-.85 0-1.475.625Q9.9 8.65 9.9 9.5q0 .85.625 1.475.625.625 1.475.625Zm0-2.1Zm0 8.95Z" />
                        </svg>
                        <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>{(user.username) && (user.username) || ""}</h3>
                    </Link>
                    <div onClick={logout} className='deconnecter hover:t-text-white hover:t-fill-white t-duration-200 t-delay-75 t-select-none t-text-body t-cursor-pointer t-w-full t-px-2 t-text-red-500 t-fill-red-500 t-rounded-md t-py-2 t-mx-auto t-flex t-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                            <path d="M5.775 21.5q-.925 0-1.537-.613-.613-.612-.613-1.537V5.95q0-.925.613-1.538Q4.85 3.8 5.775 3.8h6.4v1.35h-6.4q-.3 0-.55.25-.25.25-.25.55v13.4q0 .3.25.55.25.25.55.25h6.4v1.35Zm10.5-4.75-1.025-1 2.45-2.45H9.075v-1.35H17.7L15.25 9.5l1.025-.95 4.1 4.1Z" />
                        </svg>
                        <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>Se Deconnecter</h3>
                    </div>
                </div>
                <div className={`customScrollBar t-w-full lg:t-h-[75vh] t-h-[82vh] t-flex-none t-flex t-whitespace-nowrap t-duration-300 t-delay-75 t-overflow-x-hidden t-overflow-y-scroll t-flex-col t-items-start`}>
                    {directions.map((element, index) => {
                        return <Link onClick={closeSideBar} key={index} to={element} className={`${element} t-select-none hover:t-relative t-text-body t-cursor-pointer  t-w-[98%] t-px-2  t-rounded-md t-py-2 t-mx-auto t-flex t-items-center`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                <path d="M3.25 20.575v-13.5h4v-4h9.5v8h4v9.5h-7.5v-4h-2.5v4Zm1.5-1.5h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Zm4 4h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Zm4 8h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Zm4 12h2.5v-2.5h-2.5Zm0-4h2.5v-2.5h-2.5Z" />
                            </svg>
                            <h3 className='t-ml-3 t-text-body lg:t-text-[14px] t-text-[18px] t-tracking-wider'>{element}</h3>
                        </Link>
                    })}
                </div>
                <div className='t-absolute t-z-50 t-w-full t-left-0 t-bg-[#202020] t-bottom-3 t-hidden lg:t-block'>
                    <div className='t-w-full t-mx-auto t-h-[1px] t-bg-neutral-500 t-relative t-bottom-3'></div>
                    <p className='t-text-center t-text-[10px] t-text-white t-tracking-widest '>2022<span className='t-mx-1'>&copy;</span>Ministère de l'équipement tunisie</p>
                </div>
            </div>
        </div >
    )
}

export default SideBar