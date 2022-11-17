import React from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';

const NotFound: React.FC<Props> = () => {
  return <h2 className="c-container">Page Not Found</h2>;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
