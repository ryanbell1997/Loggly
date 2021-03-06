import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { ExportDTO, Log, LogDTO } from '../layout/models/log';
import { Tag } from '../layout/models/tag';
import { User, UserFormValues, UserConfig, UserFull, AccountDetailsInfo } from '../layout/models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.generalStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {

        await sleep(1000);
        return response;
}, (error : AxiosError) => {
    const { data, status, config } = error.response!;
    switch(status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    modalStateErrors.push(data.erros[key]);
                };
                throw modalStateErrors.flat();
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorised');
            break;
        case 404: 
            history.push('/notfound');
            break;
        case 500:
            store.generalStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get : <T> (url: string) => axios.get<T>(url).then(responseBody),
    post : <T> (url: string, body : {}) => axios.post<T>(url, body).then(responseBody),
    put : <T> (url: string, body : {}) => axios.put<T>(url, body).then(responseBody),
    delete : <T> (url: string) => axios.delete<T>(url).then(responseBody),

}

const Logs = {
    list: (userId: string) => requests.get<Log[]>(`/logs/${userId}`),
    getLogsByMonth: (monthYear: string) => requests.get<Log[]>(`/logs/getLogsByDate/${monthYear}`),
    quantityMonthlyLogs: () => requests.get<number[]>('/logs/monthlyLogQuantity'),
    details: (id: string) => requests.get<Log>(`/logs/${id}`),
    create: (logDTO: LogDTO) => requests.post<Log>(`/logs/`, logDTO),
    update: (logDTO: LogDTO) => requests.put<Log>(`/logs/${logDTO.log.id}`, logDTO),
    delete: (id: string) => requests.delete<void>(`/logs/${id}`),
    export: (exportDTO: ExportDTO) => requests.post<any>('/logs/export', exportDTO)
}

const Users = {
    details: (id: string) => requests.get<User>(`/user/${id}`),
    update: (user: User) => requests.put<void>(`/user/${user.id}`, user),
    delete: (id: string) => requests.delete<void>(`/user/${id}`),
}

const Account = {
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    current: () => requests.get<UserFull>('/account'),
    getAccountInfo: () => requests.get<UserConfig>('/account/getAccountInfo'),
    saveUserConfig: (config: AccountDetailsInfo) => requests.put<UserConfig>(`/userconfig/${config.id}`, config)
}

const Tags = {
    list: () => requests.get<Tag[]>(`/tag`),
    details: (id: string) => requests.get<Tag>(`/tag/getTag/${id}`),
    create: (tag: Tag) => requests.post<Tag>('/tag', tag),
    update: (id: string, tag: Tag) => requests.put<Tag>(`/tag/${id}`, tag),
    delete: (id: string) => requests.delete<void>(`/tag/${id}`)
}

const agent = {
    Logs,
    Users,
    Account,
    Tags
}

export default agent