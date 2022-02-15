<template>
  <q-page padding>
    <FundsListComponent />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FundsListComponent from 'components/FundsListComponent.vue';

export default defineComponent({
  name: 'FundDashLayout',
  components: { FundsListComponent },
  setup() {
    return {};
  },
});
</script>
