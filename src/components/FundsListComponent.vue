<template>
  <div class="row flex items-center justify-center">
    <div class="col-12">
      <q-space />
      <q-item class="right align-right justify-end"
        >UTC time: {{ dateNow }}</q-item
      >
    </div>
    <div class="q-px-md col-6" style="max-width: 200px">
      <q-btn
        label="Activate"
        @click="bydate = !bydate"
        flat
        :disable="bydate ? true : false"
        :color="bydate ? 'grey-5' : 'primary'"
      />
      <q-input
        filled
        v-model="startdate"
        mask="date"
        :rules="['date']"
        :disable="bydate ? false : true"
        :color="bydate ? 'grey-5' : 'primary'"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="startdate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="q-px-md col-6" style="max-width: 200px">
      <q-btn
        label="Activate"
        @click="bydate = !bydate"
        flat
        :disable="bydate ? false : true"
        :color="bydate ? 'primary' : 'grey-5'"
      />
      <q-input
        filled
        v-model="starthour"
        mask="time"
        :rules="['time']"
        :disable="bydate ? true : false"
        label-slot
      >
        <template v-slot:label> </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time v-model="starthour" mask="HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-item v-if="bydate" class="text-h6 justify-center"
        >DAILY DATA on {{ startdate }}.</q-item
      >
    </div>
    <div class="col-12">
      <q-item v-if="!bydate" class="text-h6 justify-center"
        >HOURLY DATA at {{ starthour }} on {{ startdate }} UTC.</q-item
      >
    </div>
  </div>
  <q-table
    title=""
    :columns="columns"
    :rows="rows"
    row-key="id"
    hide-headers
    hide-bottoms
    binary-state-sort
    column-sort-order="da"
    ref="stepper"
    :rows-per-page-options="[31, 60]"
    :visible-columns="['name', 'tvl', 'volume', 'feesUSD', 'apy', 'stabilus']"
  />
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue';
import { useStore } from 'src/store';
import { useTable } from 'src/modules/webapp-tables/FundsTable';
import { getUTCDate } from 'src/modules/utils/date';
import { format } from 'date-fns';

export default defineComponent({
  name: 'FundsListComponent',
  methods: {},
  setup() {
    const stepper = ref();
    const bydate = ref(true);
    const startdate = ref(format(getUTCDate(), 'yyyy/MM/dd'));
    const starthour = ref(format(getUTCDate(), 'HH:mm'));
    const dateNow = ref(format(getUTCDate(), 'yyyy/MM/dd  HH:mm:ss'));
    const dateNowInterval = setInterval(() => {
      dateNow.value = format(getUTCDate(), 'yyyy/MM/dd  HH:mm:ss');
    }, 1000);
    const $store = useStore();
    const rows = $store.getters['FundsModule/GetFundsByDay'];
    console.log('Table rows:', rows);
    const { columns } = useTable(rows);
    const stopwatch = watch(rows, () => {
      stepper.value.sort('stabilus');
      stepper.value.sort('stabilus');
    });
    const stopdaywatch = watch(startdate, () => {
      console.log(startdate.value);
    });
    onMounted(() => {
      stepper.value.sort('stabilus');
    });
    onUnmounted(() => {
      stopwatch();
      stopdaywatch();
      clearInterval(dateNowInterval);
    });
    return {
      columns,
      stepper,
      rows,
      dateNow,
      startdate,
      starthour,
      bydate,
    };
  },
});
</script>
