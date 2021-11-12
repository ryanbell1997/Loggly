import { makeAutoObservable } from "mobx";
import { ConfirmationModalInfo } from "../layout/models/confirmationModal";

export default class ModalStore {
    isConfirmationModalOpen: boolean = false;
    modalTitle: string = '';
    modalDescription: string = '';
    confirmText: string = '';
    confirmId: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    openConfirmationModal = (params: ConfirmationModalInfo) => {
        this.setModalProperties(params);
        this.setConfirmationModalOpenStatus(true);
    }

    setConfirmationModalOpenStatus = (isOpen: boolean) => {
        this.isConfirmationModalOpen = isOpen;
    }

    setModalProperties = (params:ConfirmationModalInfo) => {
        this.modalTitle = params.title;
        this.modalDescription = params.description;
        this.confirmText = params.confirmationText;
        this.confirmId = params.id;
    }
}