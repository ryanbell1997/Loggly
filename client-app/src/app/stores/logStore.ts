import { GridRowData } from "@mui/x-data-grid";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Log } from "../layout/models/log";
import { v4 as uuid } from 'uuid';

export default class LogStore {

    logs = new Map<string, Log>();
    tableLogs : GridRowData[] = [];
    selectedLog: Log | null = null;
    editMode: boolean = false;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    loadLogs = async () => { 
        this.loading = true;
        try {
            const logs = await agent.Logs.list(); 
            logs.forEach(log => {
                this.setTableLogs(log);
                })
            this.setLoading(false);

        } catch (error){
            console.log(error);
            this.setLoading(false);
        }
    }

    loadLog = async(id: string) => {
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
                return log;
            } catch(error){
                console.log(error);
                this.setLoading(false);
            }
        }
    }

    createLog = async(log: Log) => {
        this.loading = true;
        try {
            log.id = uuid();
            console.log(log);
            await agent.Logs.create(log);
            this.setTableLogs(log);
            this.setEditing(false);
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

        } catch (error){
            console.log(error);
            this.setLoading(false);
        }
    }

    editLog = async(log: Log) => {
        this.loading = true;
        try {
            await agent.Logs.update(log);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    private setTableLogs = (log : Log) => {
        this.tableLogs.push({id: log.id, date: log.date.split('T')[0], startTime: log.startTime, endTime: log.endTime, earnings: log.totalCharged})
    }

    private removeTableLog = (id: string) => {
        this.tableLogs = this.tableLogs.filter(x => x.id !== id);
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

    setEditing = (state: boolean) => {
        this.editMode = state;
    }
}