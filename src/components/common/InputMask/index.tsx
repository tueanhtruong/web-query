/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { HTMLProps, MouseEventHandler, RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { IRootState } from 'src/redux/rootReducer';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';
import '../Input/styles.scss';
import Element from '../Element';
import View from '../View';
import InputMask from 'react-input-mask';
import { InputIcon } from '../Input';

const Input: React.FC<InputProps> = ({
  children,
  errorMessage,
  label,
  className,
  subLabel,
  containerClassName,
  inputRef = null,
  onIconClick,
  iconName = null,
  mask = '***',
  maskChar = null,
  hideIconError,
  required,
  iconComponent,
  infoTooltipMessage,
  infoTooltipPlacement,
  infoToolTipWithArrow,
  isTranslatable,
  ...props
}) => {
  //   9: 0-9
  //   a: A-Z, a-z
  //   *: A-Z, a-z, 0-9
  const id = useRef<string>(`input-${getRandomId()}`);

  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      subLabel={subLabel}
      required={required}
      className={containerClassName}
      infoTooltipMessage={infoTooltipMessage}
      infoTooltipPlacement={infoTooltipPlacement}
      infoToolTipWithArrow={infoToolTipWithArrow}
      isTranslatable={isTranslatable}
    >
      <View>
        <InputMask
          id={id.current}
          className={cn(className, 'cmp-input', {
            'cmp-input--error': !isEmpty(errorMessage),
            'cmp-input--icon': !!iconName,
          })}
          mask={mask}
          maskChar={maskChar}
          ref={inputRef}
          {...props}
        />
        {!hideIconError && (
          <InputIcon
            {...{ iconName, iconComponent, errorMessage, isIconPositionLeft: true, onIconClick }}
          />
        )}
      </View>
    </Element>
  );
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
    onIconClick?: MouseEventHandler<HTMLElement>;
    label?: string | React.ReactNode;
    iconName?: string;
    mask: string;
    maskChar?: string;
    required?: boolean;
    iconComponent?: React.ReactNode;
    hideIconError?: boolean;
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
    isTranslatable?: boolean;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
