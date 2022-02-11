<template>
  <q-page padding>
    <div>
      {{ pool.label }}--{{ pool.red }}--{{ pool.platform }}--{{ pool.id }}
    </div>
    <q-table
      :columns="cols"
      :rows="pool.data"
      :rows-per-page-options="[20, 50, 0]"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useStore } from 'src/store';
import { useRoute } from 'vue-router';
import { exportFile } from 'quasar';

function wrapCsvValue(val, formatFn) {
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
  name: 'PoolPage',
  data() {
    return {
      loading: false,
      pool: null,
      cols: null,
      error: null,
    };
  },
  created() {
    // this.$watch(
    //   () => this.$route.params,
    //   () => {
    this.fetchData(this.$route.params.id);
    // },
    // { immediate: true }
    // );
  },
  methods: {
    fetchData(id) {
      this.error = this.post = null;
      this.loading = true;
      const $store = useStore();
      this.cols = $store.state.storePools.dataCols;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.pool = $store.getters['storePools/getPoolById'](id);
      if (!this.pool.data.lenght >= 1) {
        void $store.dispatch('storePools/FETCH_POOL_DATA', this.pool);
      }
    },
  },
  setup() {
    const route = useRoute();
    const $store = useStore();
    const columns = $store.state.storePools.dataCols;
    const pool = $store.getters['storePools/getPoolById'](route.params.id);
    const rows = pool.data;
    function exportTable() {
      // naive encoding to csv format
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          rows.map((row) =>
            columns
              .map((col) =>
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

      const status = exportFile('table-export.csv', content, 'text/csv');

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        });
      }
    }
    return { exportTable };
  },
};
</script>
