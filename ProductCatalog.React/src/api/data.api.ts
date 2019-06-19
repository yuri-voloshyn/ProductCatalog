import { BaseApi } from "./base.api";
import { AbstractModel } from "../models";

export abstract class DataApi<T extends AbstractModel> extends BaseApi {

    getItem = (id: number): Promise<T> => {
        return this.get<T>(String(id || ''));
    }

    createItem = (data: T): Promise<T> => {
        return this.post<T>('', data);
    }

    updateItem = (id: number, data: T): Promise<T> => {
        return this.put<T>(String(id || ''), data);
    }

    patchItem = (id: number, data: T): Promise<T> => {
        return this.patch<T>(String(id || ''), data);
    }

    deleteItem = (id: number): Promise<void> => {
        return this.delete<void>(String(id || ''));
    }
}
