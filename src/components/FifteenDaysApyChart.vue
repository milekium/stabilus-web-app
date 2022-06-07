<template>
  <div class="col-6 q-px-xs">
    <q-card class="q-mx-xs fit bg-transparent" flat>
      <q-card-section
        class="text-primary q-pa-xs q-ml-md text-bold text-title text-capitalize"
        >Anual APY</q-card-section
      >
      <q-card-section class="no-padding">
        <q-card bordered class="bg-gradient">
          <q-card-section>
            <div height="50%">
              <LineChart v-bind="lineChartProps" />
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { LineChart, useLineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import JSON from './data.json';

Chart.register(...registerables);

export default {
  name: 'ApyChart',
  components: { LineChart },
  setup() {
    const algorithAnual = JSON.data.map((row) => row['algortimo_anual'] * 100);
    const dateDay = JSON.data.map((row) => row['Fecha']);
    console.log(algorithAnual, dateDay);

    const lineData = computed<ChartData<'line'>>(() => ({
      labels: dateDay,
      datasets: [
        {
          data: algorithAnual,
          label: 'APY',
        },
      ],
    }));

    const options = computed<ChartOptions<'doughnut'>>(() => ({
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            autoSkipPadding: 30,
            font: {
              size: 11,
            },
            color: '#26a69a',
          },
        },
        y: {
          grace: '25%',
          display: true,
          ticks: {
            font: {
              size: 10,
            },
            autoSkip: true,
            autoSkipPadding: 50,
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
          display: false,
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
    const { lineChartProps } = useLineChart({
      chartData: lineData,
      options,
    });

    return {
      lineChartProps,
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
