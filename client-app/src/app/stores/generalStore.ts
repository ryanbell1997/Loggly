import { makeAutoObservable } from "mobx";

export default class GeneralStore {
    
    isMenuOpen: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    setMenuOpenStatus = (state: boolean) => {
        this.isMenuOpen = state;
    }
}