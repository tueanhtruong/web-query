import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Divider: React.FC<Props> = ({
  className,

  ...props
}) => {
  return <hr className={(cn('cmp-divider'), className)} {...props} />;
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement> & {};

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Divider);
