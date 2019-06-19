import { AbstractModel } from "../models";
import { DataApi } from "./data.api";

export abstract class ListDataApi<L extends AbstractModel, T extends AbstractModel> extends DataApi<T> {

    getItems = (): Promise<L[]> => {
        return this.get<L[]>('');
    }
}
