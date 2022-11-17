/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { useContents } from 'src/queries';
// import { getAllEventsAsync, getMyEventsAsync } from 'src/redux/eventsRedux/actions';

import { IRootState } from 'src/redux/rootReducer';

const ContentContainer: React.FC<Props> = ({ isAuthenticated }) => {
  useContents({
    enabled: !!isAuthenticated,
  });

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);
