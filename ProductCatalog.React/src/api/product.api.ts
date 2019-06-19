import { ListDataApi } from "./list-data.api";
import { ProductModel, CommentModel } from "../models";

class ProductDataApi extends ListDataApi<ProductModel, ProductModel> {

    constructor() {
        super('Product');
    }

    createItem = (data: ProductModel): Promise<ProductModel> => {
        return this.post<ProductModel>('', data);
    }

    updateItem = (id: number, data: ProductModel): Promise<ProductModel> => {
        return this.put<ProductModel>(String(id || ''), data);
    }

    getComments = (id: number): Promise<CommentModel[]> => {
        return this.get<CommentModel[]>(String(id || '') + '/Comment');
    }
}

export const ProductApi = new ProductDataApi();