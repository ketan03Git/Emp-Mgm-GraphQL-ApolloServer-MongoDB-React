import { ApolloClient, InMemoryCache, HttpLink  } from '@apollo/client';

const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL || 'https://emp-mgm-graphql-apolloserver-mongodb.onrender.com/';

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