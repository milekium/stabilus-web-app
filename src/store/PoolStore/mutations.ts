import { MutationTree } from 'vuex';
import { PoolsInterface, PoolInterface } from './state';

const mutation: MutationTree<PoolsInterface> = {
  setPoolsData(
    state: PoolsInterface,
    payload: { val: Array<PoolInterface>; net: string }
  ) {
    const data = payload.val;
    for (let i = 0; i < data.length; i++) {
      if (!state.pools.find((pool) => pool.id === data[i].id)) {
        const pool = <PoolInterface>JSON.parse(JSON.stringify(data[i]));
        pool.network = payload.net;
        state.pools.push(pool);
      }
    }
  },
  setFeesUSD(state: PoolsInterface, data: { value: string }) {
    const pools = <PoolInterface>JSON.parse(JSON.stringify(state.pools[2]));
    pools.feesUSD = data.value;
    state.pools[2] = pools;
  },
};

export default mutation;
