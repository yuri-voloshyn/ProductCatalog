import { AbstractModel } from "./abstract.model";

export interface LookupModel extends AbstractModel {
    code?: string;
    name?: string;
}