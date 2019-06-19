import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export interface ModalPopupButtonProps {
    text: string;
    action: () => Promise<boolean>;
}

export interface ModalPopupProps {
    title: string;
    onClose: (needRefresh: boolean) => void;
    mainButtonTitle?: string;
    mainButtonVariant?: any;
    mainButtonAction?: () => Promise<boolean>;
}

export const ModalPopup: React.FC<ModalPopupProps> = (props) => {

    const [show, setShow] = React.useState<boolean>(true);

    const closeInternal = (needRefresh: boolean) => {
        setShow(false);
        if (props.onClose) {
            props.onClose(needRefresh);
        }
    }

    const close = () => {
        closeInternal(false);
    }

    const main = async () => {
        if (!props.mainButtonAction || await props.mainButtonAction()) {
            closeInternal(true);
        }
    }

    return (
        <Modal
            show={show}
            onHide={close}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Close</Button>
                {props.mainButtonTitle && <Button variant={props.mainButtonVariant || 'primary'} onClick={main}>{props.mainButtonTitle}</Button>}
            </Modal.Footer>
        </Modal>
    )
}