import React from "react";


import { useRecoilState } from "recoil"
import { NotificationAtom } from "../SharedStates/NotificationAtom";


const useNotify = () => {

    const [notification, setNotification] = useRecoilState(NotificationAtom)

    const notify = (type, message) => {
        setNotification({
            ...notification,
            visible: true,
            message: message,
            type: type
        })
    }


    return notify

}

export default useNotify