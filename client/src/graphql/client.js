import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token.split('=')[1]}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
