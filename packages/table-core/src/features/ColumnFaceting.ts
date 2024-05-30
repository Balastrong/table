import { RowModel, TableFeatures } from '..'
import {
  getColumnFacetedRowModel,
  getColumnFacetedMinMaxValues,
  getColumnFacetedUniqueValues,
} from '../functions/ColumnFaceting'
import { CellData, Column, RowData, Table, TableFeature } from '../types'

export interface ColumnFacetingColumn<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  /**
   * A function that **computes and returns** a min/max tuple derived from `column.getFacetedRowModel`. Useful for displaying faceted result values.
   * > ⚠️ Requires that you pass a valid `getFacetedMinMaxValues` function to `options.getFacetedMinMaxValues`. A default implementation is provided via the exported `getFacetedMinMaxValues` function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#getfacetedminmaxvalues)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  getFacetedMinMaxValues: () => undefined | [number, number]
  /**
   * Returns the row model with all other column filters applied, excluding its own filter. Useful for displaying faceted result counts.
   * > ⚠️ Requires that you pass a valid `getFacetedRowModel` function to `options.facetedRowModel`. A default implementation is provided via the exported `getFacetedRowModel` function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#getfacetedrowmodel)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  getFacetedRowModel: () => RowModel<TFeatures, TData>
  /**
   * A function that **computes and returns** a `Map` of unique values and their occurrences derived from `column.getFacetedRowModel`. Useful for displaying faceted result values.
   * > ⚠️ Requires that you pass a valid `getFacetedUniqueValues` function to `options.getFacetedUniqueValues`. A default implementation is provided via the exported `getFacetedUniqueValues` function.
   * @link [API Docs](https://tanstack.com/table/v8/docs/api/features/column-faceting#getfaceteduniquevalues)
   * @link [Guide](https://tanstack.com/table/v8/docs/guide/column-faceting)
   */
  getFacetedUniqueValues: () => Map<any, number>
}

export interface ColumnFacetingOptions<
  TFeatures extends TableFeatures,
  TData extends RowData,
> {
  getFacetedMinMaxValues?: (
    table: Table<TFeatures, TData>,
    columnId: string
  ) => () => undefined | [number, number]
  getFacetedRowModel?: (
    table: Table<TFeatures, TData>,
    columnId: string
  ) => () => RowModel<TFeatures, TData>
  getFacetedUniqueValues?: (
    table: Table<TFeatures, TData>,
    columnId: string
  ) => () => Map<any, number>
}

//

export const ColumnFaceting: TableFeature = {
  createColumn: <
    _TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData,
  >(
    column: Column<{ ColumnFaceting: any }, TData, TValue>,
    table: Table<{ ColumnFaceting: any }, TData>
  ): void => {
    column.getFacetedMinMaxValues = () =>
      getColumnFacetedMinMaxValues(column, table)
    column.getFacetedRowModel = () => getColumnFacetedRowModel(column, table)
    column.getFacetedUniqueValues = () =>
      getColumnFacetedUniqueValues(column, table)
  },
}
