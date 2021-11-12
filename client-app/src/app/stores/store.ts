import { createContext, useContext } from "react";
import GeneralStore from "./generalStore";
import LogStore from "./logStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store {
    logStore : LogStore
    generalStore : GeneralStore
    userStore : UserStore
    modalStore : ModalStore
}

export const store: Store = {
    logStore : new LogStore(),
    generalStore : new GeneralStore(),
    userStore : new UserStore(),
    modalStore : new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}