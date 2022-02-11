<template>
  <q-page class="row items-center justify-evenly">
    <!-- content -->
    <div class="q-pa-md col-8 text-center" style="max-width: 350px">
      <q-toolbar-title>list of pools</q-toolbar-title>
      <q-list bordered separator>
        <q-item
          v-for="(pool, index) of poolsList"
          :key="index"
          clickable
          v-ripple
          :to="'/pool/' + pool.id"
        >
          <q-item-section>
            <q-item-label overline>{{ pool.label }}</q-item-label>
            <q-item-label overline>{{ pool.platform }}</q-item-label>
            <q-item-label caption>{{ pool.red }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { useStore } from 'src/store';

export default {
  name: 'Pools',
  setup() {
    const poolsList = useStore().state.storePools;
    return {
      poolsList: poolsList.pools,
    };
  },
};
</script>
