import { atom } from "recoil"

export const UserAtom = atom({
    default: {
        isLogged: localStorage.access_tkn ? true : false,
        id: localStorage.clid ? localStorage.clid : null,
        role: null,
        username: null
    },
    key: "user atom"
})