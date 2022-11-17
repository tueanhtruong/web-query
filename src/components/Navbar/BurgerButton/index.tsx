import React, { useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';

import { Callback } from 'src/redux/types';

const Navbar: React.FC<Props> = ({ className, isActive, onClick, target }) => {
  const [active, setIsActive] = useState<boolean>(isActive);

  const handleClick = () => {
    onClick && onClick();
    setIsActive(prev => !prev);
  };

  return (
    <button
      className={cn('navbar-burger burger', { 'is-active': active }, className)}
      aria-label="menu"
      aria-expanded="false"
      data-target={target}
      onClick={handleClick}
      onKeyDown={handleClick}
      tabIndex={0}>
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    isActive: boolean;
    className?: string;
    onClick?: Callback;
    target?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
