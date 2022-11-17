import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import './styles.scss';
import Element from '../Element';
import View from '../View';
import { IconButton } from '@material-ui/core';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';

const Input: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  containerClassName,
  inputRef = null,
  iconName = '',
  iconComponent,
  iconPosition = 'right',
  subLabel,
  onIconClick,
  isTranslatable,
  required,
  hideIconError = false,
  infoTooltipMessage,
  infoTooltipPlacement,
  infoToolTipWithArrow,
  customIcon = null,
  ...props
}) => {
  const { i18n } = useTranslation();
  const id = useRef<string>(`input-${getRandomId()}`);
  const isIconPositionLeft = iconPosition === 'left';

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      subLabel={subLabel}
      required={required}
      isTranslatable={isTranslatable}
      infoTooltipMessage={infoTooltipMessage}
      infoTooltipPlacement={infoTooltipPlacement}
      infoToolTipWithArrow={infoToolTipWithArrow}
    >
      <View>
        <input
          id={id.current}
          className={cn(
            className,
            'cmp-input',
            {
              'cmp-input--error': !isEmpty(errorMessage),
            },
            {
              'cmp-input--icon': !isEmpty(iconName || customIcon),
            },
            {
              left: isIconPositionLeft,
            }
          )}
          ref={inputRef}
          placeholder={isTranslatable ? i18n.t<string>(props.placeholder) : props.placeholder}
          {...props}
        />
        {!hideIconError && (
          <InputIcon
            {...{ iconName, iconComponent, errorMessage, isIconPositionLeft, onIconClick }}
          />
        )}
        {customIcon}
      </View>
    </Element>
  );
};

export const InputIcon = ({
  iconName,
  iconComponent,
  // errorMessage,
  isIconPositionLeft,
  onIconClick,
}) => {
  switch (true) {
    // case !isEmpty(errorMessage):
    //   return (
    //     <MuiIcon onClick={onIconClick} classes={{ root: 'cmp-input__icon error p-0' }}>
    //       <RiErrorWarningFill color={COLOR_CODE.DANGER} />
    //     </MuiIcon>
    //   );
    case !isEmpty(iconComponent):
      return (
        <IconButton onClick={onIconClick} classes={{ root: 'cmp-input__icon p-0' }}>
          {iconComponent}
          <span>Icon Input Label</span>
        </IconButton>
      );
    case !isEmpty(iconName):
      return (
        <Icon
          name={iconName}
          className={cn('cmp-input__icon', {
            left: isIconPositionLeft,
          })}
          onClick={onIconClick}
        />
      );
    default:
      return null;
  }
};

type BaseInputProps = Pick<
  HTMLProps<HTMLInputElement>,
  Exclude<keyof HTMLProps<HTMLInputElement>, 'label'>
>;
export type InputProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  BaseInputProps & {
    errorMessage?: string;
    containerClassName?: string;
    inputRef?: RefObject<HTMLInputElement>;
    subLabel?: string | React.ReactNode;
    iconName?: string;
    iconPosition?: 'left' | 'right';
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
    isTranslatable?: boolean;
    required?: boolean;
    iconComponent?: React.ReactNode;
    hideIconError?: boolean;
    customIcon?: React.ReactElement;
    infoTooltipMessage?: string;
    infoTooltipPlacement?:
      | 'bottom-end'
      | 'bottom-start'
      | 'bottom'
      | 'left-end'
      | 'left-start'
      | 'left'
      | 'right-end'
      | 'right-start'
      | 'right'
      | 'top-end'
      | 'top-start'
      | 'top';
    infoToolTipWithArrow?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
