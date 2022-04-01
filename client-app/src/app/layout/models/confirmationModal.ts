export interface ConfirmationModalInfo{
    title: string,
    description: string,
    confirmationText: string,
    id: string,
    confirmFunc: (...args: any[]) => any
}