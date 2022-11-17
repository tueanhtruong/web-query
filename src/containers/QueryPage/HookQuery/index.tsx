import { MUIDataTableOptions } from 'mui-datatables';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { PATHS } from 'src/appConfig/paths';
import { Button, Table, View } from 'src/components/common';
import { usePosts } from 'src/queries';
import { showDialog } from 'src/redux/dialog/dialogSlice';
import { DIALOG_TYPES } from 'src/redux/dialog/type';
import { IRootState } from 'src/redux/rootReducer';
import { TableParams } from 'src/redux/types';
import { Navigator } from 'src/services';
import { allColumns } from './helpers';
import PostDetail from './PostDetail';

const Dashboard: React.FC<Props> = ({ onShowDialog }) => {
  const { setParams, posts, loading, getPosts } = usePosts();
  const handleGetPosts = (params: TableParams) => {
    const { take, skip } = params;
    const pageIndex = (take + skip) / take;
    return setParams({ page: pageIndex });
  };

  const handleRowClick = (_value: any, meta: { rowIndex: number }) => {
    const [id] = _value;
    onShowDialog({
      type: DIALOG_TYPES.CONTENT_DIALOG,
      data: {
        content: <PostDetail id={id} />,
        hideTitle: true,
      },
    });
  };
  const tableOptions: MUIDataTableOptions = useMemo(
    () => ({
      count: 100,
      onRowClick: handleRowClick,
      rowHover: true,
      filter: false,
      search: false,
    }),
    // eslint-disable-next-line
    []
  );
  const columns = useMemo(
    () => allColumns(),
    // eslint-disable-next-line
    []
  );
  return (
    <View
      className="c-container section-container"
      flexGrow={1}
      style={{ marginTop: 16, marginBottom: 16 }}
    >
      <View isRowWrap className="mb-16">
        <Button variant="outline" onClick={() => Navigator.navigate(PATHS.query)}>
          Back
        </Button>
        <Button className="fit-width ml-16 mb-16" isLoading={loading} onClick={() => getPosts()}>
          Refetch
        </Button>
      </View>
      <Table
        title={'Posts'}
        onAction={handleGetPosts}
        data={posts}
        tableOptions={tableOptions}
        columns={columns}
        isLoading={loading}
      />
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
