import { AbstractModel } from "./abstract.model";
import { LookupModel } from "./lookup.model";

export interface CommentModel extends AbstractModel {
    product: LookupModel;
    author: string;
    message: string;
}