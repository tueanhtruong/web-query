import React from 'react';
import { connect } from 'react-redux';
import { PATHS } from 'src/appConfig/paths';
import { Button, Text, View } from 'src/components/common';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import './styles.scss';

const Dashboard: React.FC<Props> = () => {
  const handleNavigateToPath = (path: string) => () => Navigator.navigate(path);
  return (
    <View
      className="c-container section-container"
      flexGrow={1}
      style={{ marginTop: 16, marginBottom: 16 }}
    >
      <Text size={20} className="mb-32">
        Welcome to © 2022 <b className="has-text-primary">React Query</b>
      </Text>

      <Button variant="link-primary" onClick={handleNavigateToPath(PATHS.basicQuery)}>
        Basic Query
      </Button>
      <Button variant="link-primary" onClick={handleNavigateToPath(PATHS.hookQuery)}>
        Hook Query
      </Button>
      <Button variant="link-primary" onClick={handleNavigateToPath(PATHS.lazyQuery)}>
        Lazy Query
      </Button>
      <Button variant="link-primary" onClick={handleNavigateToPath(PATHS.mutationQuery)}>
        Query VS Mutation
      </Button>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
