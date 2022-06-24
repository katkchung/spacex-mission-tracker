import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

export const link = createHttpLink({
  uri: "https://api.spacex.land/graphql/",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});