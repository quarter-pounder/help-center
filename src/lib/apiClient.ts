import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

const isServer = typeof window === "undefined";

const rawServerOrigin =
    process.env.SERVER_SIDE_ORIGIN ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);
const normalizedServerOrigin = rawServerOrigin?.replace(/\/+$/, "");

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8000/graphql",
    headers:
        isServer && normalizedServerOrigin
            ? {
                  Origin: normalizedServerOrigin,
              }
            : undefined,
});

// Retry link only when running on the server (build/SSR)
const retryLink = new RetryLink({
    delay: {
        initial: 500,   // 0.5s
        max: 5000,      // cap at 5s
        jitter: true,
    },
    attempts: {
        max: 3,
        retryIf: (error, _operation) => !!error,
    },
});

const link = isServer ? ApolloLink.from([retryLink, httpLink]) : httpLink;

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode: isServer,
});

export default client;
