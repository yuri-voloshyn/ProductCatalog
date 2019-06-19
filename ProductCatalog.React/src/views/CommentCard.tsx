import React from 'react';
import { CommentModel } from '../models';
import { ModalPopup } from './ModalPopup';
import { CommentApi } from '../api';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export interface CommentCardProps {
    cardId?: number;
    productId: number;
    onClose: (needRefresh: boolean) => void;
}

export const CommentCard: React.FC<CommentCardProps> = (props) => {

    const [data, setData] = React.useState<CommentModel>({
        id: 0,
        product: { id: props.productId },
        author: '',
        message: '',
    });

    const fetchData = async (cardId: number | undefined) => {
        if (cardId) {
            try {
                setData(await CommentApi.getItem(cardId));
            } catch (error) {
            }
        }
    };

    React.useEffect(() => {
        fetchData(props.cardId);
    }, [props.cardId]);

    const [notifications, setNotification] = React.useState<string[]>([]);

    const onInputChange = (fieldName: string) => (e: React.SyntheticEvent<any>): void => {
        setData({
            ...data,
            [fieldName]: e.currentTarget.value,
        });
        setNotification([]);
    };

    const save = async (): Promise<boolean> => {
        const errorMessages: string[] = [];
        if (!data.author)
            errorMessages.push('The Author field is required.');
        if (!data.message)
            errorMessages.push('The Message field is required.');


        if (errorMessages && errorMessages.length) {
            setNotification(errorMessages);
            return false;
        }

        try {
            if (!props.cardId)
                await CommentApi.createItem(data);
            else
                await CommentApi.updateItem(props.cardId, data);

            return true;
        } catch (error) {
            setNotification([error.message]);
        }

        return false;
    }

    return (
        <ModalPopup title='Comment' onClose={props.onClose} mainButtonTitle='Save changes' mainButtonAction={save}>
            {notifications && notifications.length ? <Alert variant='danger'>{notifications.map(a => (<div>{a}</div>))}</Alert> : null}

            <div>
                <Form.Label>Author</Form.Label>
                <Form.Control value={data.author} onChange={onInputChange('author')} />
            </div>

            <div>
                <Form.Label>Message</Form.Label>
                <Form.Control value={data.message} onChange={onInputChange('message')} />
            </div>
        </ModalPopup>
    );
}