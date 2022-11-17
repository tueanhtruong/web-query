import React from 'react';
import cn from 'classnames';
import { NavLink, NavLinkProps } from 'react-router-dom';

import './styles.scss';
import { connect } from 'react-redux';
import { IRootState } from 'src/redux/rootReducer';

const CNavView: React.FC<Props> = ({
  children,
  className,
  renderIf = true,
  disabled,
  showWaving = false,
  label,
  ...props
}) => {
  if (!renderIf) return null;

  return (
    <NavLink strict className={cn('cmp-nav-link', { 'cmp-nav-link--disabled': disabled }, className)} {...props}>
      {showWaving && <WaveIndicator />}
      {children || label}
    </NavLink>
  );
};

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  NavLinkProps & {
    label?: string;
    disabled?: boolean;
    showWaving?: boolean;
    renderIf?: boolean | null;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CNavView);

const WaveIndicator = () => {
  return (
    <div className="wrapper">
      <div className="blob" />
    </div>
  );
};
