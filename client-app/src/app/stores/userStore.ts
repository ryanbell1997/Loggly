import { makeAutoObservable } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../layout/models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    name: string = '';
    hourlyRate: number = 15;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async(creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.generalStore.setToken(user.token);
            this.setUser(user);
            history.push('/log');

        }
        catch(error){
            throw error;
        }
    }

    register = async(form: UserFormValues) => {
        try {
            const user = await agent.Account.register(form);
            store.generalStore.setToken(user.token);
            this.setUser(user);
            history.push('/');
        } catch (error){
            console.log(error);
        }
    }

    logout = () => {
        store.generalStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
        store.generalStore.setMenuOpenStatus(false);
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            this.setUser(user);

        } catch (error) {
            console.log(error);
        }
    }


    setHourlyRate = async (rate: number) => {
        if(rate > 0) {
            try {
                // await agent.Users.update()
            } catch (error){
                console.log(error);
            }
        }
    }

    private setUser = (user : User) => {
        this.user = user;
    }
}