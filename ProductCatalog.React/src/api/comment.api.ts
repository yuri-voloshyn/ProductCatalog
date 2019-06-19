import { ListDataApi } from "./list-data.api";
import { CommentModel } from "../models";

class CommentDataApi extends ListDataApi<CommentModel, CommentModel> {

    constructor() {
        super('Comment');
    }
}

export const CommentApi = new CommentDataApi();