import { ApolloProvider } from '@apollo/client';
import client from '@/core/providers/graphql/ApolloClient';

export const ApolloProviderWrapper = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
};
