import { createContext, useContext } from "react";
import GeneralStore from "./generalStore";
import LogStore from "./logStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import TagStore from "./tagStore";
import FormModalStore from "./formModalStore";

interface Store {
    logStore : LogStore
    generalStore : GeneralStore
    userStore : UserStore
    modalStore : ModalStore
    tagStore : TagStore
    formModalStore : FormModalStore
}

export const store: Store = {
    logStore : new LogStore(),
    generalStore : new GeneralStore(),
    userStore : new UserStore(),
    modalStore : new ModalStore(),
    tagStore : new TagStore(),
    formModalStore : new FormModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}