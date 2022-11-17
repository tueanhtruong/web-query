import React from 'react';
import { connect } from 'react-redux';

import { View } from 'src/components/common';
// import { useComponentDidMount } from 'src/hooks';
import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const LayoutFull: React.FC<Props> = ({ children }) => {
  // useComponentDidMount(() => {
  //   onSetSecondBurger(false);
  // });

  return <View className="secondary-container ctn-layout-full">{children}</View>;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    children?: React.ReactNode;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  // onSetSecondBurger: ,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutFull);
