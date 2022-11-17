import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const Link: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <a className={cn('cmp-link', className)} {...props}>
      {children}
    </a>
  );
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {};

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Link);
