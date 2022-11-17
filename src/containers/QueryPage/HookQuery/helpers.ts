import { MUIDataTableColumn } from 'mui-datatables';

export const allColumns = (): MUIDataTableColumn[] => [
  {
    name: 'id',
    label: 'Post ID',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value: string, meta) => {
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
