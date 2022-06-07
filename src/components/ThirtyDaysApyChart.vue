<template>
  <div class="col-6 col-lg-6 q-px-xs">
    <q-card class="q-mx-xs fit bg-transparent" flat>
      <q-card-section
        class="text-primary q-pa-xs q-ml-md text-bold text-title text-capitalize"
        >Anual Fund Distribution</q-card-section
      >
      <q-card-section class="no-padding">
        <q-card bordered class="bg-gradient">
          <q-card-section>
            <div height="50%">
              <BarChart v-bind="barChartProps" />
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import JSON from './data.json';

Chart.register(...registerables);

// //    "USDC/UST1": 0,
//       "MIM/USDC1": 0,
//       "DOLA/USDC1": 0.3,
//       "UST-Anchor1": 0.7,

export default {
  name: 'ThirtyDaysApyChart',
  components: { BarChart },
  setup() {
    const uscdc_ust = JSON.data.map((row) => row['USDC/UST1']);
    const mim_usdc = JSON.data.map((row) => row['MIM/USDC1']);
    const dola_usdc = JSON.data.map((row) => row['DOLA/USDC1']);
    const ust_anchor = JSON.data.map((row) => row['UST-Anchor1']);

    const dateDay = JSON.data.map((row) => row['Fecha']);

    const lineData = computed<ChartData<'bar'>>(() => ({
      labels: dateDay,
      datasets: [
        {
          data: uscdc_ust,
          label: 'USDC/UST',
          backgroundColor: '#26a69a',
          barPercentage: 0,
          barThickness: 10,
          maxBarThickness: 20,
          minBarLength: 0,
        },
        {
          data: mim_usdc,
          label: 'MIM/USDC',
          backgroundColor: '#F25450',
          barPercentage: 0,
          barThickness: 10,
          maxBarThickness: 20,
          minBarLength: 0,
        },
        {
          data: dola_usdc,
          label: 'DOLA/USDC',
          backgroundColor: '#2E72A6',
          barPercentage: 0,
          barThickness: 10,
          maxBarThickness: 20,
          minBarLength: 0,
        },
        {
          data: ust_anchor,
          label: 'UST-Anchor',
          backgroundColor: '#efb909',
          barPercentage: 0,
          barThickness: 10,
          maxBarThickness: 20,
          minBarLength: 0,
        },
      ],
    }));

    const options = computed<ChartOptions<'doughnut'>>(() => ({
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            autoSkipPadding: 20,
            font: {
              size: 11,
            },
            color: '#26a69a',
          },
        },
        y: {
          stacked: true,
          grace: '0%',
          display: true,
          ticks: {
            font: {
              size: 10,
            },
            autoSkip: true,
            autoSkipPadding: 30,
            color: '#26a69a',
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
        line: {
          borderColor: '#26a69a',
          borderWidth: 1.5,
          tension: 0,
          fill: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            boxHeight: 2,
          },
          position: 'top',
        },
        title: {
          display: false,
          text: 'Rentabilidad Historica',
        },
      },
    }));
    const { barChartProps } = useBarChart({
      chartData: lineData,
      options,
    });

    return {
      barChartProps,
    };
  },
};
</script>

<style lang="scss" scoped>
.q-card--bordered {
  border-radius: 10px;
  -moz-border-radius: 10px;
  z-index: 0;
}
.q-card--bordered:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 4px;
  border-radius: 10px;
  background: radial-gradient(circle, $primary 0%, $dark 100%);
  -webkit-mask: linear-gradient($primary 0 0) content-box,
    linear-gradient($primary 0 0);
  mask: linear-gradient($primary 0 0) content-box, linear-gradient($primary 0 0);
  mask-composite: exclude;
}
.bg-gradient {
  background: transparent
    linear-gradient(rgba(0, 210, 255, 0.3), rgba(0, 210, 255, 0)) repeat scroll
    0% 0%;
}
</style>
