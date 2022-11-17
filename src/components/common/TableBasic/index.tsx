import { MuiThemeProvider } from '@material-ui/core';
import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import cn from 'classnames';
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableProps,
  MUIDataTableState,
} from 'mui-datatables';
import React, { memo, useMemo } from 'react';
import { FaFilter } from 'react-icons/fa';
import { connect } from 'react-redux';
import { COLOR_CODE } from 'src/appConfig/constants';
import { LoadingCommon, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import CustomFooterRender from './customFooterRender';
import CustomSearchRender from './customSearchRender';
import './styles.scss';

const TableBasic: React.FC<Props> = ({
  isLoading,
  containerClassName,
  onTableChange,
  currentPage,
  options,
  total,
  data,
  emptyComponent = 'No data',
  ...props
}) => {
  const tableOptions: MUIDataTableOptions = {
    serverSide: true,
    // searchOpen: true,
    // searchAlwaysOpen: true,
    search: true,
    download: false,
    filter: true,
    print: false,
    viewColumns: false,
    selectableRowsHeader: false,
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: isLoading ? <LoadingCommon /> : emptyComponent,
      },
    },
    jumpToPage: false,
    rowHover: true,
    onTableChange,
    customSearchRender: (searchText: string, handleSearch: (text: string) => void) => {
      return (
        <CustomSearchRender
          searchText={searchText}
          onSearch={handleSearch}
          placeholder={options.searchPlaceholder}
        />
      );
    },
    customFooter: (
      count: number,
      page: number,
      rowsPerPage: number,
      changeRowsPerPage: (page: string | number) => void,
      changePage: (newPage: number) => void
    ) => {
      return (
        <CustomFooterRender
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
        />
      );
    },
    ...options,
  };

  const hasRowClickAction = !!options?.onRowClick;
  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            boxShadow: 'none',
          },
          elevation2: {
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25) !important',
          },
          rounded: {
            borderRadius: '8px !important',
          },
          root: {
            backgroundColor: '#fff !important',
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
        MuiTableRow: {
          hover: {
            cursor: hasRowClickAction ? 'pointer' : 'default',
            '&$hover:hover': {
              backgroundColor: '#F3FAFF !important',
            },
          },
        },
        MuiTableBody: {
          root: {
            padding: '0 16px',
            opacity: isLoading ? 0.3 : 1,
            ...(isLoading && {
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                width: '100%',
                height: '100%',
                zIndex: '3',
                backgroundColor: 'rgba(0, 0, 0, 0.01)',
              },
            }),
          },
        },
        MuiPopover: {
          paper: {
            minWidth: 144,
          },
        },
        MuiTypography: {
          body2: {
            color: '#1B1C1E !important',
            fontSize: '16px !important',
          },
        },
        MuiFormControlLabel: {
          root: {
            color: '#1B1C1E',
            fontSize: '16px',
          },
        },
        MuiChip: {
          root: {
            backgroundColor: '#CFD4D9',
            border: '1px solid #CACED0',
            marginLeft: '8px',
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '13px',
            color: '#000000',
            borderRadius: '16px !important',
          },
        },

        MuiIconButton: {
          root: {
            padding: '8px !important',
            borderRadius: '8px !important',
            alignItems: 'center',
            color: '#0361D0 !important',
          },
        },

        MuiToolbar: {
          root: {
            padding: '0 0px !important',
          },
        },
        MuiTableCell: {
          root: {
            padding: '2px 16px',
            minHeight: '44px !important',
            height: '44px !important',
          },
          footer: {
            padding: '0px !important',
            borderBottom: '0px !important',
          },
        },
        MUIDataTableHeadCell: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          contentWrapper: {
            '& button': {
              fontWeight: '700 !important',
            },
          },
        },
        MUIDataTableFilterList: {
          root: {
            margin: '0px !important',
          },
        },
        MUIDataTableToolbar: {
          filterPaper: {
            minHeight: '344px !important',
          },
        },
        MuiInputBase: {
          root: {
            '&::before, &::after': {
              borderBottom: '0px !important',
            },
          },
        },
        MUIDataTableSearch: {
          main: {
            '& button': {
              display: 'none !important',
            },
            '& svg': {
              transform: 'translateY(2px) !important',
              marginTop: '0px !important',
            },
            border: '1px solid #CACED0 !important',
            padding: '2px 8px !important',
            borderRadius: '4px !important',
            alignItems: 'center !important',
          },
          searchText: {
            flex: '1 0 !important',
          },
        },
        MUIDataTableBodyCell: {
          stackedHeader: {
            fontWeight: 500,
          },
          stackedCommon: {
            whiteSpace: 'nowrap',
            overflow: 'hidden !important',
            textOverflow: 'ellipsis',
          },
        },
      },
    } as ThemeOptions);

  const muiDataTable = useMemo(
    () => {
      return (
        <MUIDataTable
          data={data}
          options={tableOptions}
          components={{
            icons: {
              FilterIcon: (
                <View className="cmp-filter-icon">
                  <FaFilter
                    size={18}
                    className="cmp-filter-icon__icon"
                    color={COLOR_CODE.PRIMARY}
                  />
                  <Text className={cn('fw-medium cmp-filter-icon__text text-is-16')}>Filter</Text>
                </View>
              ),
            },
          }}
          {...props}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  // More info: https://github.com/gregnb/mui-datatables
  return (
    <View className={cn('cmp-table-basic', containerClassName)} flexGrow={1}>
      <MuiThemeProvider theme={getMuiTheme()}>{muiDataTable}</MuiThemeProvider>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  MUIDataTableProps & {
    containerClassName?: string;
    currentPage?: number;
    total?: number;
    onTableChange: (action: string, tableState: MUIDataTableState) => void;
    isLoading?: boolean;
    emptyComponent?: React.ReactNode;
    data?: any;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(memo(TableBasic));
