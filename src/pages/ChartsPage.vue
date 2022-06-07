<template>
  <q-page class="bg-dark row items-center scroll-y">
    <div class="row col-12 q-pa-lg">
      <StablecoinCards />
      <AnualApyChart />
      <ThirtyDaysApyChart />
    </div>
  </q-page>
</template>

<script lang="ts">
import StablecoinCards from 'components/StablecoinCards.vue';
import AnualApyChart from 'src/components/AnualApyChart.vue';
import ThirtyDaysApyChart from 'src/components/ThirtyDaysApyChart.vue';

export default {
  name: 'ChartsPage',
  components: { StablecoinCards, AnualApyChart, ThirtyDaysApyChart },
};
</script>
