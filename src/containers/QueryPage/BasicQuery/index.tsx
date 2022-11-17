import React from 'react';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import { Button, Text, View } from 'src/components/common';
import { API_KEYS } from 'src/queries/Jsons';
import { IRootState } from 'src/redux/rootReducer';
import { ErrorService, Navigator, Toastify } from 'src/services';
import { isEmpty } from 'src/validations';

const Dashboard: React.FC<Props> = () => {
  const {
    data: response = [],
    isFetching,
    refetch,
  } = useQuery([API_KEYS.TODO], {
    queryFn: (params) => {
      console.log('params: ', params);
      return fetch('https://gorest.co.in/public/v2/usersdsuahduisah').then((res) => res.json());
    },
    onSuccess(data) {
      console.log('onSuccess: called');
      Toastify.success('Call api successfully');
    },
    onError(err) {
      ErrorService.handler(err);
    },
  });

  return (
    <View
      className="c-container section-container"
      flexGrow={1}
      style={{ marginTop: 16, marginBottom: 16 }}
    >
      <View isRowWrap>
        <Button variant="outline" onClick={() => Navigator.goBack()}>
          Back
        </Button>
        <Button className="fit-width ml-16 mb-16" isLoading={isFetching} onClick={() => refetch()}>
          Refetch
        </Button>
      </View>
      <View renderIf={!isEmpty(response)}>
        <Text size={18} className="mb-16 fw-bold">
          Total Users: {(response as Array<any>)?.length}
        </Text>
        {(response as Array<any>)?.map((res) => (
          <Text className="mb-16" key={`user-name-${res?.id}`}>
            {res?.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
