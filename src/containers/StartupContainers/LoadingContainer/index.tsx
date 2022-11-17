import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const LoadingContainer: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;

  return null;
  // return (
  //   <View className="ctn-loading">
  //     <Loading loadingStyle={4} />
  //   </View>
  // );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    isLoading?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);
