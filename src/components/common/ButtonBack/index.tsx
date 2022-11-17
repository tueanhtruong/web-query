import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import Button, { ButtonProps } from '../Button';
import { Icon } from '..';
import { Navigator } from 'src/services';

const ButtonBack: React.FC<Props> = ({ onClick, className, ...props }) => {
  const handleGoBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(event);
    } else {
      Navigator.goBack();
    }
  };

  return (
    <Button
      className={cn('cmp-btn-back', className)}
      variant="text"
      icon={<Icon name="ic_arrow_left" />}
      onClick={handleGoBack}
      {...props}
    />
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ButtonProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonBack);
