import React from 'react';
import { RouteComponentProps } from '@reach/router';

export const Home: React.FC<RouteComponentProps> = (props) => {
    return (
        <>
            {props.children}
        </>
    );
}