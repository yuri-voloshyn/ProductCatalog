import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { AdminContext } from './AdminContext';

export const Admin: React.FC<RouteComponentProps> = (props) => {
    return (
        <AdminContext.Provider value={{ isAdmin: true }}>
            {props.children}
        </AdminContext.Provider>
    );
}