import React from 'react';
import { ProductModel } from '../models';
import { ModalPopup } from './ModalPopup';
import { ProductApi } from '../api';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export interface ProductCardProps {
    cardId?: number;
    onClose: (needRefresh: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {

    const [data, setData] = React.useState<ProductModel & { thumbnailImage: string }>({
        id: 0,
        name: '',
        description: '',
        thumbnailImage: '',
    });

    const fetchData = async (cardId: number | undefined) => {
        if (cardId) {
            try {
                const data = await ProductApi.getItem(cardId);
                setData({ ...data, thumbnailImage: '' });
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

    // const onInputFileChange = (fieldName: string) => (e: React.SyntheticEvent<any>): void => {
    //     setData({
    //         ...data,
    //         [fieldName]: e.currentTarget.value,
    //         [fieldName + 'File']: e.currentTarget.files[0],
    //     });
    //     setNotification([]);
    // };

    const save = async (): Promise<boolean> => {
        const errorMessages: string[] = [];
        if (!data.name)
            errorMessages.push('The Name field is required.');

        if (errorMessages && errorMessages.length) {
            setNotification(errorMessages);
            return false;
        }

        try {
            if (!props.cardId)
                await ProductApi.createItem(data);
            else
                await ProductApi.updateItem(props.cardId, data);

            return true;
        } catch (error) {
            setNotification([error.message]);
        }

        return false;
    }

    return (
        <ModalPopup title='Product' onClose={props.onClose} mainButtonTitle='Save changes' mainButtonAction={save}>
            {notifications && notifications.length ? <Alert variant='danger'>{notifications.map(a => (<div>{a}</div>))}</Alert> : null}

            <div>
                <Form.Label>Name</Form.Label>
                <Form.Control value={data.name} onChange={onInputChange('name')} />
            </div>

            <div>
                <Form.Label>Description</Form.Label>
                <Form.Control value={data.description} onChange={onInputChange('description')} />
            </div>

            {/* <div>
                <Form.Label>File</Form.Label>
                <Form.Control type='file' value={data.thumbnailImage} onChange={onInputFileChange('thumbnailImage')} />
            </div> */}
        </ModalPopup>
    );
}