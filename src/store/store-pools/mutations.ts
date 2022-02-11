import { MutationTree } from 'vuex';
import { PoolsStateInterface, PoolDataInterface } from './state';

const mutation: MutationTree<PoolsStateInterface> = {
  setPoolData(state: PoolsStateInterface, data: PoolDataInterface) {
    state.pools.find((pool) => pool.id === data.id)?.data.push(data);
  },
};

export default mutation;
