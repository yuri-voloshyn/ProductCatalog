import { AbstractModel } from "./abstract.model";

export interface ProductBaseModel extends AbstractModel {
    name: string;
    description: string;
}

export interface ProductModel extends ProductBaseModel {
    thumbnailImageUrl?: string;
    thumbnailImageFile?: File;
}