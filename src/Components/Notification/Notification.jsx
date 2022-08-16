import React, { useEffect, useState } from 'react'
import { NotificationAtom } from '../../SharedStates/NotificationAtom'
import { useRecoilState } from 'recoil'
const Notification = () => {
    const [notification, setNotification] = useRecoilState(NotificationAtom)
    useEffect(() => {
        if (notification.visible) {
            var time = setTimeout(() => {
                setNotification({ ...notification, visible: false })
            }, 3500)
        }
        return () => {
            clearTimeout(time)
        }
    }, [notification.visible])

    const hideNotification = () => {
        setNotification({ ...notification, visible: false })
    }

    if (notification.type == "success") return (
        <div style={{ zIndex: 60000000 }} className={`t-fixed lg:t-bottom-5 t-bottom-1 ${notification.visible ? "lg:t-right-5 t-right-[4.1%] md:t-right-[16.66%] t-opacity-1" : "t-opacity-0 lg:t-right-[-400px] t-right-[-92%] md:t-right-[-66.66%]"} t-duration-700 t-h-24 lg:t-w-[400px] t-w-11/12 md:t-w-8/12 t-mx-auto t-shadow-md t-shadow-neutral-300 t-rounded-lg t-bg-white t-flex t-items-center t-justify-center`}>
            <div className='t-w-2/6  t-h-full t-rounded-l-md t-flex t-justify-center t-items-center t-bg-green-400/80'>
                <img src="/assets/icons/checked.png" className="t-h-16 t-w-16" />
            </div>
            <div className='t-w-4/6 t-flex t-flex-col t-items-center t-justify-center'>
                <img onClick={hideNotification} src="/assets/icons/lettre-x.png" className='t-relative lg:t-bottom-5 t-bottom-4 t-h-4 t-w-4 t-cursor-pointer t-mr-1 t-ml-auto t-justify-self-start' />
                <p className='t-text-center t-relative t-bottom-1 t-text-[15px] t-text-neutral-700 t-font-[500]'>{notification.message}</p>
            </div>
        </div >)
    else if (notification.type == "warning") return (
        <div style={{ zIndex: 60000000 }} className={`t-fixed lg:t-bottom-5 t-bottom-1 ${notification.visible ? "lg:t-right-5 t-right-[4.1%] md:t-right-[16.66%] t-opacity-1" : "t-opacity-0 lg:t-right-[-400px] t-right-[-92%] md:t-right-[-66.66%]"} t-duration-700 t-h-24 lg:t-w-[400px] t-w-11/12 md:t-w-8/12 t-mx-auto t-shadow-md t-shadow-neutral-300 t-rounded-lg t-bg-white t-flex t-items-center t-justify-center`}>
            <div className='t-w-2/6  t-h-full t-rounded-l-md t-flex t-justify-center t-items-center t-bg-yellow-300/90'>
                <img src="/assets/icons/warning.png" className="t-h-16 t-w-16" />
            </div>
            <div className='t-w-4/6 t-flex t-flex-col t-items-center t-justify-center'>
                <img onClick={hideNotification} src="/assets/icons/lettre-x.png" className='t-relative lg:t-bottom-5 t-bottom-4 t-h-4 t-w-4 t-cursor-pointer t-mr-1 t-ml-auto t-justify-self-start' />
                <p className='t-text-center t-relative t-bottom-1 t-text-[15px] t-text-neutral-700 t-font-[500]'>{notification.message}</p>
            </div>
        </div >)
    else return (
        <div style={{ zIndex: 60000000 }} className={`t-fixed lg:t-bottom-5 t-bottom-1 ${notification.visible ? "lg:t-right-5 t-right-[4.1%] md:t-right-[16.66%] t-opacity-1" : "t-opacity-0 lg:t-right-[-400px] t-right-[-92%] md:t-right-[-66.66%]"} t-duration-700 t-h-24 lg:t-w-[400px] t-w-11/12 md:t-w-8/12 t-mx-auto t-shadow-md t-shadow-neutral-300 t-rounded-lg t-bg-white t-flex t-items-center t-justify-center`}>
            <div className='t-w-2/6  t-h-full t-rounded-l-md t-flex t-justify-center t-items-center t-bg-red-400'>
                <img src="/assets/icons/error.png" className="t-h-16 t-w-16" />
            </div>
            <div className='t-w-4/6 t-flex t-flex-col t-items-center t-justify-center'>
                <img onClick={hideNotification} src="/assets/icons/lettre-x.png" className='t-relative lg:t-bottom-5 t-bottom-4 t-h-4 t-w-4 t-cursor-pointer t-mr-1 t-ml-auto t-justify-self-start' />
                <p className='t-text-center t-relative t-bottom-1 t-text-[15px] t-text-neutral-700 t-font-[500]'>{notification.message}</p>
            </div>
        </div >)
}

export default Notification