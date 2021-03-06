import { GridRowData } from "@mui/x-data-grid";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { ExportDTO, Log, LogDTO } from "../layout/models/log";
import { v4 as uuid } from 'uuid';
import DateShortener from "../../utils/DateShortener";
import { store } from "./store";

export default class LogStore {
    logs = new Map<string, Log>();
    tableLogs : GridRowData[] = [];
    selectedLog: Log | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    loadLogs = async (dateTime? : string | null) => {
        this.loading = true;
        try {
            const logs = dateTime == null && !dateTime ? await this.getLogsByMonth() : await this.getLogsByMonth(dateTime);
            this.clearTableLogs();
            logs.forEach(log => {
                this.setTableLogs(log);
            });
            this.setLoading(false);

        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    };

    // public get loadLogs() {
    //     return this._loadLogs;
    // }
    // public set loadLogs(value) {
    //     this._loadLogs = value;
    // }
    
    createLogDTO = (values:any) => {
        try {
            let dto = {
                log: {
                    id: values.id,
                    date: values.date,
                    endTime: values.endTime,
                    startTime: values.startTime,
                    hourlyRate: values.hourlyRate,
                    is_overtime: values.is_overtime,
                    totalCharged: values.totalCharged,
                },
                tagIds: values.tagIds
            } as LogDTO;

            return dto;
        } catch (err){
            console.log(err);
        }
    }

    updateLog = async(id: string) => {
        let log = this.getLog(id);
        if (log){
            this.selectedLog = log;
            return log
        }
        else {
            this.loading = true;
            try{
                log = await agent.Logs.details(id);
                this.setLog(log);
                this.setSelectedLog(log)
                this.setLoading(false);
                store.formModalStore.setIsFormModalOpen(true);
                return log;
            } catch(error){
                console.log(error);
                this.setLoading(false);
            }
        }
    }

    editLog = async(logDTO: LogDTO) => {
        this.loading = true;
        try {
            const returnedLog = await agent.Logs.update(logDTO);
            this.editTableLogs(returnedLog);
            store.formModalStore.setIsFormModalOpen(false);
            this.setLoading(false);
        }
        catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    createOrEditLog = async(logDTO : LogDTO) => {
        if(logDTO.log.id === ""){
            this.createLog(logDTO);
        }
        else {
            this.editLog(logDTO);
        }
    }

    createLog = async(logDTO: LogDTO) => {
        this.loading = true;
        try {

            logDTO.log.id = uuid();
            
            const returnedLog : Log = await agent.Logs.create(logDTO);
            this.setTableLogs(returnedLog);
            store.formModalStore.setIsFormModalOpen(false);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    deleteLog = async(id: string) => {
        this.loading = true;
        try {
            await agent.Logs.delete(id);
            this.removeTableLog(id);
            this.removeLog(id);
            this.setLoading(false);
            runInAction(() => {
                store.modalStore.isConfirmationModalOpen = false
            })

        } catch (error){
            console.log(error);
            this.setLoading(false);
        }
    }

    exportLogs = async(dto: ExportDTO) => {
        this.loading = true;
        try {
            var data = await agent.Logs.export(dto);
            var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

            var downloadURL = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = `${dto.fileName}.xlsx`;
            link.click();
            this.setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }



    openForm = (id?: string) => {
        id ? this.selectLog(id) : this.cancelSelectedLog();
        store.formModalStore.setIsFormModalOpen(false);
    }

    closeForm = () => {
        store.formModalStore.setIsFormModalOpen(false);
        this.selectedLog = undefined;
    }

    cancelSelectedLog = () => {
        this.selectedLog = undefined;
    }

    getLogsByMonth = async(dateString? : string) => {
        if(dateString){
            return await agent.Logs.getLogsByMonth(dateString);
        }
        else {
            //Get the current month if no datestring.
            return await agent.Logs.getLogsByMonth(new Date(Date.now()).toISOString());
        }
    }

    getMonthlyLogQuantity = () => {
        //TODO   
    }

    private clearTableLogs = () => {
        this.tableLogs = [];
        this.logs.clear();
    }

    private setTableLogs = (log : Log) => {
        log.date = DateShortener(log.date);
        this.tableLogs.push(this.createTableLog(log));
        this.logs.set(log.id, log);
    }

    private editTableLogs = (log : Log) => {
        log.date = DateShortener(log.date);
        this.tableLogs = [...this.tableLogs.filter(x => x.id !== log.id), this.createTableLog(log)]
        this.logs.set(log.id, log)
    }

    private createTableLog = (log : Log) => {
        return {
            id: log.id,
            date: DateShortener(log.date),
            startTime: log.startTime,
            endTime: log.endTime,
            earnings: `${store.userStore.accountInfo?.currency}${log.totalCharged}`
        }
    }

    private removeTableLog = (id: string) => {
        this.tableLogs = this.tableLogs.filter(x => x.id !== id);
        this.removeLog(id);
    }
    
    private selectLog = (id: string) => {
        this.selectedLog = this.logs.get(id);
    }


    private removeLog = (id: string) => {
        this.logs.delete(id);
    }

    private setLog = (log: Log) => {
        this.logs.set(log.id, log);
    }

    private getLog = (id: string) => {
        return this.logs.get(id);
    }

    
    setSelectedLog = (log: Log) => {
        this.selectedLog = log;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}