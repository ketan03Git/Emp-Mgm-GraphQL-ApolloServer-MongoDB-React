import { ApolloClient, InMemoryCache, HttpLink  } from '@apollo/client';

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://super-giggle-q7vwx56ppq6fx56j-4000.app.github.dev/';

const client = new ApolloClient({
  link: new HttpLink ({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          activeEmployees: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
});

export default client;