<template>
  <q-page padding>
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
        'id',
        'time',
        'name',
        'red',
        'platform',
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
          :visible="loaded"
          @click="exportTable"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { exportFile } from 'quasar';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useTable } from 'src/modules/webapp-tables/FundsTable';

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
export default {
  name: 'PoolsHourData',
  setup() {
    const stepper = ref();
    const loaded = ref(false);

    const router = useRoute();
    const $store = useStore();
    const numberOfHours = router.params.hour;
    const rows = ref([]);
    const { columns } = useTable(rows.value);
    const fundsList = $store.state.FundsModule;
    const stopwatch = watch(fundsList, () => {
      rows.value = $store.getters['FundsModule/GetFundsByHour']({
        time: numberOfHours,
      });
      if (rows.value.length == 25) {
        const optimized = (row: { fund_weight: number }) => row.fund_weight > 0;
        if (rows.value.some(optimized)) {
          loaded.value = true;
        }
      }
    });
    onMounted(() => {
      const getvalue = $store.getters['FundsModule/GetFundsByHour']({
        time: numberOfHours,
      });
      if (getvalue.length == 0) {
        void $store.dispatch('FundsModule/GetFundsDataByHour', {
          time: numberOfHours,
        });
      } else {
        rows.value = getvalue;
      }
      stepper.value.sort('fees');
    });
    onUnmounted(() => {
      stopwatch();
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
      const filename = 'hour_' + numberOfHours.toString();
      exportFile(filename + '.csv', content, 'text/csv');
    }
    return {
      columns,
      rows,
      exportTable,
      stepper,
      loaded,
    };
  },
};
</script>
^
