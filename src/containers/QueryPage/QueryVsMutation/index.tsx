import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import Mutation from './Mutation';
import Query from './Query';

const Dashboard: React.FC<Props> = () => {
  return (
    <View
      className="c-container section-container"
      flexGrow={1}
      style={{ marginTop: 16, marginBottom: 16 }}
    >
      <Button variant="outline" className="fit-width mb-16" onClick={() => Navigator.goBack()}>
        Back
      </Button>
      <Grid.Wrap>
        <Grid.Item>
          <Query isOpenRefetch />
        </Grid.Item>
        <Grid.Item>
          <Query />
        </Grid.Item>
        <Grid.Item>
          <Mutation isOpenRefetch />
        </Grid.Item>
        <Grid.Item>
          <Mutation isOpenRefetch />
        </Grid.Item>
      </Grid.Wrap>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
