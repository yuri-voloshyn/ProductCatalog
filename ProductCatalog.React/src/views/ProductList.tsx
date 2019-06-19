import React, { useState } from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import { AdminContext } from './AdminContext';
import { ProductApi } from 'api';
import { DataTable, DTColumn } from '../components';
import { ProductModel } from 'models';
import { useCard } from './hooks';
import { ProductCard } from './ProductCard';
import { CommentCard } from './CommentCard';
import { ProductComments } from './ProductComments';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import { ModalPopup } from './ModalPopup';

export interface ProductListProps extends RouteComponentProps {
    cardId?: number;
}

export const ProductList: React.FC<ProductListProps> = (props) => {

    const [data, setData] = React.useState<ProductModel[]>([]);

    const fetchData = async () => {
        try {
            setData(await ProductApi.getItems());
        } catch (error) {
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const columns: DTColumn[] = [
        { name: 'name', title: 'Name' },
        { name: 'description', title: 'Description' },
        { name: 'buttons' },
    ];

    const { cardInfo, add, close } = useCard();

    const closeCard = (needRefresh: boolean) => {
        close();
        if (needRefresh) {
            fetchData();
        }
        if (props.cardId && props.navigate) {
            props.navigate("../");
        }
    }

    const renderCard = () => {
        if (!cardInfo && !props.cardId)
            return;

        return (
            <ProductCard onClose={closeCard} cardId={props.cardId} />
        )
    };

    const [deleteConfirm, setDeleteConfirm] = useState<number>();

    const deleteCard = (productId: number) => {
        setDeleteConfirm(productId);
    }

    const closeDeleteCard = () => {
        setDeleteConfirm(undefined);
    }

    const deleteAction = async (): Promise<boolean> => {
        if (deleteConfirm) {
            try {
                await ProductApi.deleteItem(deleteConfirm);
                fetchData();
            } catch (error) {

            }
        }

        return true;
    }

    const renderDeleteCard = () => {
        if (!deleteConfirm)
            return;

        return (
            <ModalPopup title='Confirm' onClose={closeDeleteCard} mainButtonTitle='Delete' mainButtonVariant='danger' mainButtonAction={deleteAction}>
                Are you sure you want to delete record?
            </ModalPopup>
        )
    }

    const [commentCard, setCommentCard] = useState<number>();

    const addComment = (productId: number) => {
        setCommentCard(productId);
    }

    const closeComment = () => {
        setCommentCard(undefined);
    }

    const renderCommentCard = () => {
        if (!commentCard)
            return;

        return (
            <CommentCard onClose={closeComment} productId={commentCard} />
        )
    };

    const [comments, setComments] = useState<number>();

    const showComments = (productId: number) => {
        setComments(productId);
    }

    const closeComments = () => {
        setComments(undefined);
    }

    const renderComments = () => {
        if (!comments)
            return;

        return (
            <ProductComments onClose={closeComments} productId={comments} />
        )
    };

    const context = React.useContext(AdminContext);

    const renderCell = (rowData: ProductModel, cellName: string, cellData: any): any => {
        if (context.isAdmin) {
            switch (cellName) {
                case 'name': return <Link to={String(rowData.id || '')}>{cellData}</Link>;
                case 'buttons': return (
                    <>
                        <Button variant="link" size="sm" onClick={() => deleteCard(rowData.id)}>Delete</Button>
                        <Button variant="link" size="sm" onClick={() => showComments(rowData.id)}>Show comments</Button>
                    </>
                );
            }
        } else {
            switch (cellName) {
                case 'buttons': return <Button variant="link" size="sm" onClick={() => addComment(rowData.id)}>Add comment</Button>;
            }
        }

        return cellData;
    }

    return (
        <>
            <ButtonToolbar>
                {context.isAdmin && <Button variant="success" onClick={add}>Add</Button>}
            </ButtonToolbar>
            <DataTable columns={columns} data={data} renderCell={renderCell} />
            {renderCard()}
            {renderCommentCard()}
            {renderDeleteCard()}
            {renderComments()}
        </>
    );
}
