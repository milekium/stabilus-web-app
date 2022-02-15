import { ApolloClient, createHttpLink } from '@apollo/client/core';
import { ApolloClients } from '@vue/apollo-composable';
import { boot } from 'quasar/wrappers';
import { getClientOptions } from 'src/apollo';

export default boot(
  /* async */ ({ app }) => {
    const options = /* await */ getClientOptions(/* {app, router ...} */);

    const UniswapEthOptions = { ...options };
    UniswapEthOptions.link = createHttpLink({
      uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
    });
    const clientUniswapEth = new ApolloClient(UniswapEthOptions);

    const UniswapPolOptions = { ...options };
    UniswapPolOptions.link = createHttpLink({
      uri: 'https://api.thegraph.com/subgraphs/name/zephyrys/uniswap-polygon-but-it-works',
    });
    const clientUniswapPol = new ApolloClient(UniswapPolOptions);

    const apolloClients: Record<string, ApolloClient<unknown>> = {
      clientUniswapPol,
      clientUniswapEth,
    };

    app.provide(ApolloClients, apolloClients);
  }
);
