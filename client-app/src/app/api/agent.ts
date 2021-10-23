import axios, { AxiosResponse } from 'axios';
import { Log } from '../layout/models/log';
import { User } from '../layout/models/user';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    } 
})

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get : <T> (url: string) => axios.get<T>(url).then(responseBody),
    post : <T> (url: string, body : {}) => axios.post<T>(url, body).then(responseBody),
    put : <T> (url: string, body : {}) => axios.put<T>(url, body).then(responseBody),
    delete : <T> (url: string) => axios.delete<T>(url).then(responseBody),

}

const Logs = {
    list: () => requests.get<Log[]>('/logs'),
    details: (id: string) => requests.get<Log>(`/logs/${id}`),
    create: (log: Log) => requests.post<Log>(`/logs/`, log),
    update: (log: Log) => requests.put<Log>(`/logs/${log.id}`, log),
    delete: (id: string) => requests.delete<void>(`/logs/${id}`)
}

const Users = {
    details: (id: string) => requests.get<User>(`/user/${id}`),
    update: (user: User) => requests.put<void>(`/user/${user.id}`, user),
    delete: (id: string) => requests.delete<void>(`/user/${id}`)
}

const agent = {
    Logs,
    Users
}

export default agent