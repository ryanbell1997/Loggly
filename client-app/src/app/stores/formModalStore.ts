import { makeAutoObservable } from "mobx";
import { isOptionalChain } from "typescript";

export default class FormModalStore {
    isFormModalOpen: boolean = false;
    form: React.ReactNode;
    onLoadFunc: (...args: any[]) => any;

    constructor() {
        makeAutoObservable(this);
    }

    setFormModalOpenStatus = (isOpen: boolean, form:React.ReactNode | null, onLoadFunc: ((...args: any[]) => any) | null) => {
        if(onLoadFunc !== null){
            onLoadFunc();
        }
        this.isFormModalOpen = isOpen;
        this.form = form;
    }

    setIsFormModalOpen = (isOpen : boolean) => {
        this.isFormModalOpen = isOpen;
    }

}