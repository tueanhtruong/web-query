import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Icon } from '..';

const IconClickable: React.FC<Props> = ({ onClick, className, ...props }) => {
  const handleClick = (event: any) => {
    onClick && onClick(event);
  };

  return (
    <Icon
      className={cn('cmp-icon--clickable', className)}
      onClick={handleClick}
      onKeyPress={handleClick}
      role="button"
      tabIndex={0}
      {...props}
    />
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & HTMLProps<HTMLElement>;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(IconClickable);
