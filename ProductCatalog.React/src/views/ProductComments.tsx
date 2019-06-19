import React from 'react';
import { CommentModel } from '../models';
import { ModalPopup } from './ModalPopup';
import { ProductApi } from '../api';
import { DataTable, DTColumn } from '../components';

export interface ProductCommentsProps {
    productId: number;
    onClose: (needRefresh: boolean) => void;
}

export const ProductComments: React.FC<ProductCommentsProps> = (props) => {

    const [data, setData] = React.useState<CommentModel[]>([]);

    const fetchData = async (productId: number | undefined) => {
        if (productId) {
            try {
                setData(await ProductApi.getComments(productId));
            } catch (error) {
            }
        }
    };

    React.useEffect(() => {
        fetchData(props.productId);
    }, [props.productId]);

    const columns: DTColumn[] = [
        { name: 'author', title: 'Author' },
        { name: 'message', title: 'Message' },
    ];

    return (
        <ModalPopup title='Product comments' onClose={props.onClose}>
            <DataTable columns={columns} data={data} />
        </ModalPopup>
    );
}