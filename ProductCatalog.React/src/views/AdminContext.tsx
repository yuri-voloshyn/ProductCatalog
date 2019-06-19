import * as React from 'react';

export interface AdminContextInterface {
    isAdmin?: boolean;
}

export const AdminContext = React.createContext<AdminContextInterface>({});