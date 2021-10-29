import { makeAutoObservable } from "mobx";
import { ServerError } from "../layout/models/serverError";

export default class GeneralStore {
    
    isSignedIn: boolean = false;
    isMenuOpen: boolean = false;
    error: ServerError | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setMenuOpenStatus = (state: boolean) => {
        this.isMenuOpen = state;
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }
}