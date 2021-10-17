import { createContext, useContext } from "react";
import GeneralStore from "./generalStore";
import LogStore from "./logStore";
import UserStore from "./userStore";

interface Store {
    logStore : LogStore
    generalStore : GeneralStore
    userStore : UserStore
}

export const store: Store = {
    logStore : new LogStore(),
    generalStore : new GeneralStore(),
    userStore : new UserStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}