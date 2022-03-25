<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="home" aria-label="home" to="/" />
        <q-toolbar-title> Stabilus App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
// import { useStore } from 'src/store';

export default defineComponent({
  name: 'FundDashLayout',
  components: {},
  setup() {
    // const $store = useStore();
    onMounted(() => {
      // void $store.dispatch('TerraModule/FETCH_DATA');
      // void $store.dispatch('PoolsModule/FETCH_POOLS_DATA');
    });
    return {};
  },
});
</script>
