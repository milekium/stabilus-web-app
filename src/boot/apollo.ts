import { ApolloClient, createHttpLink } from '@apollo/client/core';
import { ApolloClients } from '@vue/apollo-composable';
import { boot } from 'quasar/wrappers';
import { getClientOptions } from 'src/apollo';

export default boot(
  /* async */ ({ app }) => {
    // Default client.
    const options = /* await */ getClientOptions(/* {app, router ...} */);
    // options.link = createHttpLink({
    //   uri: 'https://api.thegraph.com/subgraphs/name/zephyrys/uniswap-polygon-but-it-works',
    // });
    const clientUniswapPol = new ApolloClient(options);

    const optionsA = { ...options };
    optionsA.link = createHttpLink({
      uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
    });
    const clientUniswapEth = new ApolloClient(optionsA);

    // Additional client `clientB`
    // const optionsB = { ...options }
    // // Modify options as needed.
    // optionsB.link = createHttpLink({ uri: 'http://clientB.example.com' })
    // const clientB = new ApolloClient(optionsB)

    const apolloClients: Record<string, ApolloClient<unknown>> = {
      clientUniswapPol,
      clientUniswapEth,
      // clientB,
    };

    app.provide(ApolloClients, apolloClients);
  }
);
