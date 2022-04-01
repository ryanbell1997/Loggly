import { makeAutoObservable } from "mobx";

export default class FormModalStore {
    isFormModalOpen: boolean = false;
    form: React.ReactNode;
    onLoadFunc: (...args: any[]) => any;

    constructor() {
        makeAutoObservable(this);
    }

    setFormModalOpenStatus = (isOpen: boolean, form:React.ReactNode | null, onLoadFunc: ((...args: any[]) => any) | null) => {
        this.isFormModalOpen = isOpen;
        if(onLoadFunc !== null){
            onLoadFunc();
        }
        this.form = form;
    }
}