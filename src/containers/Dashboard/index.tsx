import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Dashboard: React.FC<Props> = () => {
  return (
    <View className="ctn-dashboard" flexGrow={1}>
      <Text>
        Welcome to © 2022 <b className="has-text-primary">DLIR</b>
      </Text>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
