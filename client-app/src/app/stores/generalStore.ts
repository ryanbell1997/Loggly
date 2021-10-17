import { makeAutoObservable } from "mobx";

export default class GeneralStore {
    
    isSignedIn: boolean = false;
    isMenuOpen: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    setMenuOpenStatus = (state: boolean) => {
        this.isMenuOpen = state;
    }
}