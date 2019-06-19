import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type BaseBody = any | null;

export abstract class BaseApi {

    protected axiosInst: AxiosInstance;
    protected relativeUrl: string;

    constructor(
        protected controllerUrl: string,
        protected prefixUrl: string = 'v1'
    ) {
        this.axiosInst = Axios.create({ baseURL: 'http://localhost:44487' });

        this.axiosInst.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                return config;
            }
        )

        this.relativeUrl = this.addPath(this.prefixUrl) + this.addPath(this.controllerUrl);
    }

    addPath = (path: string): string => {
        path = path || '';
        if (path) {
            path = '/' + path;
        }
        return path;
    }

    fullUrl = (action: string): string => {
        return this.relativeUrl + this.addPath(action);
    }

    get = async <T>(action: string, params?: any, headers?: any): Promise<T> => {
        return (await this.axiosInst.get<T>(this.fullUrl(action), { params, headers })).data;
    }

    put = async <T>(action: string, body: BaseBody, headers?: any): Promise<T> => {
        return (await this.axiosInst.put<T>(this.fullUrl(action), body, { headers })).data;
    }

    post = async <T>(action: string, body: BaseBody, headers?: any): Promise<T> => {
        return (await this.axiosInst.post<T>(this.fullUrl(action), body, { headers })).data;
    }

    patch = async <T>(action: string, body: BaseBody, headers?: any): Promise<T> => {
        return (await this.axiosInst.patch<T>(this.fullUrl(action), body, { headers })).data;
    }

    delete = async <T>(action: string, headers?: any): Promise<T> => {
        return (await this.axiosInst.delete<T>(this.fullUrl(action), { headers })).data;
    }
}