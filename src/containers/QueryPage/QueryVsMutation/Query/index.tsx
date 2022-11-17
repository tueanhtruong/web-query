import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, LoadingCommon, Text, View, ViewItem } from 'src/components/common';
import { usePostsDetail } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Toastify } from 'src/services';

const Dashboard: React.FC<Props> = ({ isOpenRefetch = false }) => {
  const { postDetail, loading, refetchPostDetail } = usePostsDetail({
    id: '519',
    onSuccess(data) {
      Toastify.success('Call API get Post Detail Success');
    },
    onError(err) {
      ErrorService.handler(err);
    },
  });
  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      <View isRowWrap align="center" className="mb-32">
        <Text size={24} className="fw-bold">
          Post Detail Query
        </Text>
        {loading && <LoadingCommon className="ml-16" />}
      </View>
      <Grid.Wrap>
        <ViewItem label={'ID'} value={postDetail?.id} />
        <ViewItem label={'User Id'} value={postDetail?.user_id} />
        <ViewItem label={'Title'} value={postDetail?.title} variant="is-full" />
        <ViewItem variant="is-full" label={'Body'} value={postDetail?.body} />
      </Grid.Wrap>
      <View isRowWrap flexGrow={1} justify="flex-end" renderIf={isOpenRefetch}>
        <Button isLoading={loading} onClick={() => refetchPostDetail()} className="ml-16">
          Refresh
        </Button>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    isOpenRefetch?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
