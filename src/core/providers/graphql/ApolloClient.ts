
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const apiURL = process.env.NEXT_PUBLIC_REACT_APP_GRAPHQL_BACKEND;

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${apiURL}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export default client;
