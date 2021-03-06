import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createHttpLink, gql } from '@apollo/client';
import { cache } from './cache';
import { setContext } from '@apollo/client/link/context';
import reportWebVitals from './reportWebVitals';

import App from './App';

import './index.css';

const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`;

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URL
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers, 
            authorization: token || '',
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    typeDefs
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
