import React from 'react';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';

const IconSuccess: React.FC<Props> = ({ size = 100, className }) => {
  const svgSize = (size * 60) / 100;
  return (
    <div className={cn('icon-success', className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 18 18" style={{ width: svgSize }}>
        <polyline points="0 8 5 14 13 4" />
      </svg>
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & { size?: number; className?: string };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default IconSuccess;
