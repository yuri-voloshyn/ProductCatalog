import React from 'react';
import './App.scss';
import { Router, RouteComponentProps, Redirect } from '@reach/router';
import { Home, Admin } from './views';
import { ProductList } from 'views/ProductList';

const NotFound: React.FC<RouteComponentProps> = () => (
    <>Sorry, nothing here.</>
)

const App: React.FC = () => {
    return (
        <Router>
            <Redirect from="/" to="/product" noThrow />
            <Home path="/">
                <ProductList path="product" />
                <ProductList path="product/:cardId" />
                <NotFound default />
            </Home>

            <Redirect from="/admin" to="/admin/product" noThrow />
            <Admin path="/admin">
                <ProductList path="product" />
                <ProductList path="product/:cardId" />
                <NotFound default />
            </Admin>

            <NotFound default />
        </Router>
    );
}

export default App;
