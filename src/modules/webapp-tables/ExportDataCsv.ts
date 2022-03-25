/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { exportFile, QTableProps } from 'quasar';

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

export const useExportCsv = (
  columns: QTableProps['columns'],
  rows: Array<any>,
  filename: string
) => {
  // naive encoding to csv format
  const cols = JSON.parse(JSON.stringify(columns)) as [];

  const content = [
    cols.map((col: { label: string; format: void | unknown }) =>
      wrapCsvValue(col.label, col.format)
    ),
  ]
    .concat(
      rows.map((row) =>
        cols
          .map(
            (col: {
              field: ((arg0: unknown) => string) | any;
              name: string;
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

  return { file: exportFile(filename + '.csv', content, 'text/csv') };
};
