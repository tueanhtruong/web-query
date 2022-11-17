import { useEffect } from 'react';
import { connect } from 'react-redux';

import useMeasure from 'src/hooks/useMeasure';
import { setCollapseSidebar, setShowMiniSidebar } from 'src/redux/common/commonSlice';
// import { setCollapseSidebar, setShowMiniSidebar } from 'src/redux/commonRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const ResponsiveContainer: React.FC<Props> = ({
  isCollapse,
  isMiniSidebar,
  onSetMiniSidebar,
  onToggleSidebar,
}) => {
  const {
    bind,
    bounds: { width },
  } = useMeasure();

  useEffect(() => {
    if (width >= 768) {
      isMiniSidebar && onSetMiniSidebar(false);
      if (width >= 1024) {
        // isCollapse && onToggleSidebar(false);
      } else {
        // !isCollapse && onToggleSidebar(true);
      }
    } else if (!!width) {
      !isMiniSidebar && onSetMiniSidebar(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return <div className="ctn-responsive" {...bind} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    isLoading?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({
  isCollapse: state.common.collapseSidebar,
  isMiniSidebar: state.common.showMiniSidebar,
});

const mapDispatchToProps = {
  onToggleSidebar: setCollapseSidebar,
  onSetMiniSidebar: setShowMiniSidebar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveContainer);
