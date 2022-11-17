import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, LoadingCommon, Text, View, ViewItem } from 'src/components/common';
import { usePostDetailByMutation } from 'src/queries';
import { IRootState } from 'src/redux/rootReducer';
import { Toastify } from 'src/services';

const Dashboard: React.FC<Props> = ({ isOpenRefetch = false }) => {
  const { data, getPostDetailByMutation, isLoading } = usePostDetailByMutation({
    onSuccess(data) {
      Toastify.success('Call API get Post Detail By Mutation Success');
    },
  });
  return (
    <View style={{ marginTop: 16, marginBottom: 16 }}>
      <View isRowWrap align="center" className="mb-32">
        <Text size={24} className="fw-bold">
          Post Detail Mutation
        </Text>
        {isLoading && <LoadingCommon className="ml-16" />}
      </View>
      <Grid.Wrap>
        <ViewItem label={'ID'} value={data?.id} />
        <ViewItem label={'User Id'} value={data?.user_id} />
        <ViewItem label={'Title'} value={data?.title} variant="is-full" />
        <ViewItem variant="is-full" label={'Body'} value={data?.body} />
      </Grid.Wrap>
      <View isRowWrap flexGrow={1} justify="flex-end" renderIf={isOpenRefetch}>
        <Button
          isLoading={isLoading}
          onClick={() => getPostDetailByMutation('1308')}
          className="ml-16"
        >
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
