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
              @hide="changeDay"
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
              @hide="changeHour"
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
        >DAILY DATA on {{ startdate }} {{ timeday }}.</q-item
      >
    </div>
    <div class="col-12">
      <q-item v-if="!bydate" class="text-h6 justify-center"
        >HOURLY DATA at {{ starthour }} on {{ startdate }} UTC.
        {{ timehour }}.</q-item
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
    :visible-columns="[
      'name',
      'tvl',
      'volume',
      'feesUSD',
      'apy',
      'stabilus',
      'fund_weight',
    ]"
  >
    <template v-slot:top-right>
      <q-btn
        color="primary"
        icon-right="archive"
        label="Export to csv"
        name="expcsv"
        no-caps
        @click="exportTable"
      />
    </template>
  </q-table>
</template>

<script lang="ts">
/* eslint-disable */
import { exportFile } from 'quasar';
import { defineComponent, onMounted, ref, watch, onUnmounted } from 'vue';
import { useStore } from 'src/store';
import { useTable } from 'src/modules/webapp-tables/FundsTable';
import {
  getUTCDate,
  getUTCDaysNumber,
  getUTCHoursNumber,
} from 'src/modules/utils/date';
import { format } from 'date-fns';

function wrapCsvValue(val: string, formatFn: void | any) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);
  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `"${formatted}"`;
}
export default defineComponent({
  name: 'FundsListComponent',
  methods: {},
  setup() {
    const stepper = ref();
    const bydate = ref(false);
    const startdate = ref(format(getUTCDate(), 'yyyy/MM/dd'));
    const starthour = ref(format(getUTCDate(), 'HH:mm'));
    const dateNow = ref(format(getUTCDate(), 'yyyy/MM/dd  HH:mm:ss'));
    const dateNowInterval = setInterval(() => {
      dateNow.value = format(getUTCDate(), 'yyyy/MM/dd  HH:mm:ss');
    }, 1000);

    const timeday = ref(getUTCDaysNumber(startdate.value));
    const timehour = ref(getUTCHoursNumber(startdate.value, starthour.value));
    const $store = useStore();
    const fundsList = $store.state.FundsModule;
    const rows = ref([]);
    const { columns } = useTable(rows.value);
    const stopwatch = watch(fundsList, () => {
      if (bydate.value) {
        rows.value = $store.getters['FundsModule/GetFundsByDay']({
          time: getUTCDaysNumber(startdate.value),
        });
      } else {
        rows.value = $store.getters['FundsModule/GetFundsByHour']({
          time: getUTCHoursNumber(startdate.value, starthour.value),
        });
      }
    });
    const changeHour = () => {
      const numberOfHours = getUTCHoursNumber(startdate.value, starthour.value);
      const getvalue = $store.getters['FundsModule/GetFundsByHour']({
        time: numberOfHours,
      });
      timehour.value = numberOfHours;
      if (getvalue.length == 0) {
        $store.dispatch('FundsModule/GetFundsDataByHour', {
          time: numberOfHours,
        });
      } else {
        rows.value = getvalue;
      }
    };
    const changeDay = () => {
      const numberOfDays = getUTCDaysNumber(startdate.value);
      const getvalue = $store.getters['FundsModule/GetFundsByDay']({
        time: numberOfDays,
      });
      timeday.value = numberOfDays;
      if (getvalue.length == 0) {
        $store.dispatch('FundsModule/GetFundsDataByDay', {
          time: numberOfDays,
        });
      } else {
        rows.value = getvalue;
      }
    };
    onMounted(() => {
      stepper.value.sort('stabilus');
      $store.dispatch('FundsModule/GetFundsDataByHour', {
        time: getUTCHoursNumber(startdate.value, starthour.value),
      });
    });
    onUnmounted(() => {
      stopwatch();
      clearInterval(dateNowInterval);
    });
    function exportTable() {
      // naive encoding to csv format
      const cols = JSON.parse(JSON.stringify(columns.value));

      const content = [
        cols.map((col: { label: string; format: void }) =>
          wrapCsvValue(col.label, col.format)
        ),
      ]
        .concat(
          rows.value?.map((row) =>
            cols
              .map(
                (col: {
                  field: ((arg0: never) => string) | undefined;
                  name: any;
                  format: void;
                }) =>
                  wrapCsvValue(
                    typeof col.field === 'function'
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format
                  )
              )
              .join(',')
          )
        )
        .join('\r\n');
      const filename = bydate
        ? 'day_' + startdate.value.toString()
        : 'hour_' + starthour.value.toString();
      const status = exportFile(filename + '.csv', content, 'text/csv');
      // if (status !== true) {
      //   $q.notify({
      //     message: 'Browser denied file download...',
      //     color: 'negative',
      //     icon: 'warning',
      //   });
      // }
    }

    return {
      timeday,
      timehour,
      columns,
      stepper,
      rows,
      dateNow,
      startdate,
      starthour,
      bydate,
      changeHour,
      changeDay,
      exportTable,
    };
  },
});
</script>
