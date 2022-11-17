import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import { Text } from '../common';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaRegClock, FaCheckCircle } from 'react-icons/fa';

import cn from 'classnames';

import './styles.scss';
import { getClassNameByStatus } from 'src/utils';
import { IRootState } from 'src/redux/rootReducer';

export type BadgeStatus = 'Pending' | 'Completed' | 'Approved' | 'Active' | 'Rejected';

const renderIcon = (variant: BadgeStatus) => {
  switch (variant) {
    case 'Pending':
      return <FaRegClock size={16} />;
    case 'Rejected':
      return <IoMdCloseCircleOutline size={20} />;
    default:
      return <FaCheckCircle size={16} />;
  }
};
const AccountBadge: React.FC<Props> = ({ variant, className, ...props }) => {
  return (
    <span
      {...props}
      className={cn(`cmp-deposition-badge`, getClassNameByStatus(variant), className)}
    >
      {renderIcon(variant)}
      <Text className="cmp-deposition-badge__text">{variant}</Text>
    </span>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  HTMLProps<HTMLSpanElement> & {
    variant: BadgeStatus;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccountBadge);
