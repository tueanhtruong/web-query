import { MUIDataTableColumn } from 'mui-datatables';
import { Callback } from 'src/redux/types';
import LazyCheckPoint from './LazyCheckPoint';

export const allColumns = (onFirstEnter?: Callback): MUIDataTableColumn[] => [
  {
    name: 'id',
    label: 'Post ID',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: string, meta: { rowIndex }) => {
        if (meta.rowIndex % 10 === 9)
          return (
            <LazyCheckPoint onFirstEnter={onFirstEnter}>
              <span>{value ?? '--'}</span>
            </LazyCheckPoint>
          );
        return value ?? '--';
      },
    },
  },
  {
    name: 'user_id',
    label: 'User ID',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: string, meta) => {
        return value ?? '--';
      },
    },
  },
  {
    name: 'title',
    label: 'Title',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (email: string) => {
        return email ?? '--';
      },
    },
  },
  {
    name: 'body',
    label: 'Body',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: string, meta) => {
        return value ?? '--';
      },
    },
  },
];
