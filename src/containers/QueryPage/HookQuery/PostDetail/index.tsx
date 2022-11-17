import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, LoadingCommon, Text, View, ViewItem } from 'src/components/common';
import { usePostsDetail } from 'src/queries';
import { hideDialog } from 'src/redux/dialog/dialogSlice';
import { IRootState } from 'src/redux/rootReducer';

const Dashboard: React.FC<Props> = ({ id, onHideDialog }) => {
  const { postDetail, loading } = usePostsDetail({ id });
  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      <View isRowWrap align="center" className="mb-32">
        <Text size={24} className="fw-bold">
          Post Detail
        </Text>
        {loading && <LoadingCommon className="ml-16" />}
      </View>
      <Grid.Wrap>
        <ViewItem label={'ID'} value={postDetail?.id} />
        <ViewItem label={'User Id'} value={postDetail?.user_id} />
        <ViewItem label={'Title'} value={postDetail?.title} variant="is-full" />
        <ViewItem variant="is-full" label={'Body'} value={postDetail?.body} />
      </Grid.Wrap>
      <View isRowWrap flexGrow={1} justify="flex-end">
        <Button onClick={onHideDialog} variant="outline">
          Cancel
        </Button>
        <Button className="ml-16">Edit</Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    id: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onHideDialog: hideDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
