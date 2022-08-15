import { atom } from "recoil"


export const NotificationAtom = atom({
    default: {
        type: null,
        message: "",
        display: false
    },
    key: "notification atom"
}) 