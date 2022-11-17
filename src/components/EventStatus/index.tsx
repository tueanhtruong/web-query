import React, { HTMLProps } from 'react';
import { Text } from '../common';
import cn from 'classnames';
import './styles.scss';
import { getStartCase } from 'src/utils';
import { FaCheckCircle } from 'react-icons/fa';
import { GoAlert } from 'react-icons/go';
import { BiCalendarCheck } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
// import { MyEventStatus } from 'src/redux/eventsRedux/types';
export enum MyEventStatus {
  REGISTERED = 'REGISTERED',
  CHECKED_IN = 'CHECKED_IN',
  NOT_SHOWED_UP = 'NOT_SHOWED_UP',
}

const renderIcon = (variant: MyEventStatus) => {
  switch (variant) {
    case MyEventStatus.REGISTERED:
      return <BiCalendarCheck size={20} />;
    case MyEventStatus.CHECKED_IN:
      return <FaCheckCircle size={18} />;
    default:
      return <GoAlert size={18} />;
  }
};

const EventStatus: React.FC<Props> = ({ variant, className, ...props }) => {
  const { i18n } = useTranslation();

  return (
    <span {...props} className={cn(`cmp-event-status is-${variant}`, className)}>
      <Text size={14} className="cmp-event-status__text">
        {i18n.t<string>(getStartCase(variant))}
      </Text>
      {renderIcon(variant)}
    </span>
  );
};

type Props = HTMLProps<HTMLSpanElement> & {
  variant: MyEventStatus;
};

export default EventStatus;
