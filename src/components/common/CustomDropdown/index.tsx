/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { KeyboardEvent, useEffect } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Icon, View } from '..';
import { Callback } from 'src/redux/types';

const CustomDropdown: React.FC<Props> = ({
  label,
  items,
  xPosition = 'right',
  yPosition = 'bottom',
  containerClassName,
  labelClassName,
  onChangOpen,
}) => {
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(items.length);

  useEffect(() => {
    onChangOpen && onChangOpen(isOpen);
    // eslint-disable-next-line
  }, [isOpen]);

  const handleKeyPress = (item: DropdownItem) => (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.code === 'Enter') {
      item.onClick();
    }
  };

  const ItemsWithProps = () => (
    <React.Fragment>
      {items.map((item, idx) => (
        <span
          key={`dropdown__item--${idx}`}
          className={cn('cmp-dropdown__item', { 'cmp-dropdown__item--active': item.isActive })}
          onClick={item.onClick}
          onKeyPress={handleKeyPress(item)}
          {...itemProps[`${idx}`]}
        >
          {item.icon && typeof item.icon === 'string' ? (
            <Icon className="cmp-dropdown__item-icon" name={item.icon} />
          ) : (
            item.icon
          )}
          {item.label}
        </span>
      ))}
    </React.Fragment>
  );

  return (
    <View className={cn('cmp-dropdown', containerClassName)}>
      <button className={cn('cmp-dropdown__button-wrap', labelClassName)} {...buttonProps}>
        {label}
      </button>
      <View
        className={cn(
          'cmp-dropdown__menu',
          `cmp-dropdown__menu--x-${xPosition}`,
          `cmp-dropdown__menu--y-${yPosition}`,
          { visible: isOpen, hidden: !isOpen }
        )}
      >
        <ItemsWithProps />
      </View>
    </View>
  );
};

export type DropdownItem = {
  label: string | React.ReactNode;
  onClick: (...args: any[]) => void;
  icon?: string | React.ReactNode;
  isActive?: boolean;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    containerClassName?: string;
    labelClassName?: string;
    label: React.ReactNode;
    items: DropdownItem[];
    xPosition?: 'left' | 'right';
    yPosition?: 'top' | 'bottom';
    onChangOpen?: Callback;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDropdown);
