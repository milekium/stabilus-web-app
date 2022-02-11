<template>
  <q-page class="row items-center justify-evenly">
    <stablecoin-chart :chartdata="data" :options="options" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StablecoinChart from 'components/StablecoinChart.vue';
const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export default defineComponent({
  name: 'PageIndex',
  components: { StablecoinChart },
  setup() {
    return { data, options };
  },
});
</script>
