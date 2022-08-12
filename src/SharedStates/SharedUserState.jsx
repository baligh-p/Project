import { atom } from "recoil"

export const UserAtom = atom({
    default: {
        isLogged: localStorage.access_tkn ? true : false
    },
    key: "user atom"
})