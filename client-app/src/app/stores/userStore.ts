import { makeAutoObservable } from "mobx";
import agent from "../api/agent";

export default class UserStore {

    name: string = '';
    hourlyRate: number = 15;

    constructor() {
        makeAutoObservable(this);
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
}