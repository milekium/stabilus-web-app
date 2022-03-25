/* eslint-disable @typescript-eslint/await-thenable */
import { ApolloClient, createHttpLink } from '@apollo/client/core';
import { ApolloClients } from '@vue/apollo-composable';
import { boot } from 'quasar/wrappers';
import { getClientOptions } from 'src/apollo';

const options = getClientOptions(/* {app, router ...} */);

const clientUniswapPol = new ApolloClient(options);

const UniswapEthOptions = { ...options };
UniswapEthOptions.link = createHttpLink({
  uri: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
});
const clientUniswapEth = new ApolloClient(UniswapEthOptions);

export const apolloClients: Record<string, ApolloClient<unknown>> = {
  clientUniswapPol,
  clientUniswapEth,
};
export default boot(({ app }) => {
  app.provide(ApolloClients, apolloClients);
});
