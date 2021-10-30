import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../layout/models/serverError";

export default class GeneralStore {
    
    isSignedIn: boolean = false;
    isMenuOpen: boolean = false;
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        )
    }

    setMenuOpenStatus = (state: boolean) => {
        this.isMenuOpen = state;
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token : string | null) => {
        this.token = token;
    } 

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}