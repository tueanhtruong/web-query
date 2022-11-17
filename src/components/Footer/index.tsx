import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './styles.scss';
import { IRootState } from 'src/redux/rootReducer';
import { View } from '../common';

const Footer: React.FC<Props> = ({ className }) => {
  return <View className={cn('cmp-footer', className)}>Copyright © 2021 Ralph Rosenberg Court Reporter</View>;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
