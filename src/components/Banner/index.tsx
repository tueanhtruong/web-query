import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import { Text, View } from '../common';
import cn from 'classnames';
import './styles.scss';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import { IRootState } from 'src/redux/rootReducer';

const VARIANT = {
  completed: 'completed',
  pending: 'warning',
  rejected: 'rejected',
};

const renderIcon = (variant: Status) => {
  switch (variant) {
    case VARIANT.pending:
      return <RiErrorWarningFill size={16} />;
    case VARIANT.rejected:
      return <IoMdCloseCircleOutline size={16} />;
    default:
      return <FaCheckCircle size={16} />;
  }
};

const Banner: React.FC<Props> = ({ title, className, status, message, ...props }) => {
  return (
    <View className={cn('cmp-banner-item', className, `cmp-banner-item--${status}`)} {...props}>
      <View isRow className={cn('cmp-banner-item__header')}>
        {renderIcon(status)}
        <Text size={14} className="ml-8">{`${title}`}</Text>
      </View>

      <View className="ml-24">
        <Text className="cmp-banner-item__text">{message}</Text>
      </View>
    </View>
  );
};

type Status = 'completed' | 'warning' | 'rejected';

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  HTMLProps<HTMLDivElement> & {
    title: string;
    status: Status;
    message: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
