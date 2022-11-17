import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Icon: React.FC<Props> = ({ name, className, ...props }) => {
  const iconName = `icon-${name}`;

  return <i className={cn(iconName, className)} {...props} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  HTMLProps<HTMLElement>;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
