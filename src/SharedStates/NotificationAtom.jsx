import { atom } from "recoil";



export const NotificationAtom = atom({
    default: {
        visible: false,
        message: "",
        type: "success"
    },
    key: "notification"
})