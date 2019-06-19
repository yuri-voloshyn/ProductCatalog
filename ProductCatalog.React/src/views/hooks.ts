import React, { MutableRefObject } from 'react';

export const useUnmounted = (): MutableRefObject<boolean> => {
    const unmounted = React.useRef<boolean>(false);
    React.useEffect(() => () => {
        unmounted.current = true;
    }, []);
    return unmounted;
}

export interface CardInfo {
    cardId?: number;
}

export interface CardInfoResult {
    cardInfo: CardInfo | null | undefined;
    add: () => void;
    edit: (cardId: number) => void;
    close: () => void;
}

export const useCard = (): CardInfoResult => {
    const [cardInfo, setCardInfo] = React.useState<CardInfo | null>();
    const add = () => { setCardInfo({}); };
    const edit = (cardId: number) => { setCardInfo({ cardId }); };
    const close = () => { setCardInfo(null); }
    return { cardInfo, add, edit, close };
}