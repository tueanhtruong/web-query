import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import View from '../View';
import './styles.scss';
import { isEmpty } from 'src/validations';
import { ViewProps } from 'src/components/common/View';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@material-ui/core';
import { COLOR_CODE } from 'src/appConfig/constants';
import { IoInformationCircle } from 'react-icons/io5';

const Element: React.FC<Props> = ({
  id,
  children,
  errorMessage,
  label,
  className,
  subLabel,
  required,
  isTranslatable,
  infoTooltipMessage = '',
  infoTooltipPlacement = 'right',
  infoToolTipWithArrow = true,
  ...props
}) => {
  const { i18n } = useTranslation();
  const hasError = !isEmpty(errorMessage);
  const hasLabel = !isEmpty(label);
  const hasSubLabel = !isEmpty(subLabel);

  return (
    <View className={cn(className, 'form-element')} {...props}>
      {hasLabel && (
        <label
          htmlFor={id}
          style={{
            display: 'flex',
            flexFlow: 'row',
            alignItems: 'center',
            height: 24,
          }}
        >
          {isTranslatable && typeof label === 'string' ? i18n.t<string>(label) : label}{' '}
          {required && <span className="has-text-danger ml-1 fw-bold text-is-16">*</span>}
          {infoTooltipMessage && (
            <span>
              <Tooltip
                arrow={infoToolTipWithArrow}
                title={
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {isTranslatable ? `${i18n.t(infoTooltipMessage)}` : infoTooltipMessage}
                  </span>
                }
                placement={infoTooltipPlacement}
              >
                <i className="cursor-pointer ml-1">
                  <IoInformationCircle
                    size={16}
                    color={COLOR_CODE.INFO}
                    style={{
                      transform: 'translateY(2px)',
                    }}
                  />
                </i>
              </Tooltip>
            </span>
          )}
        </label>
      )}

      {hasSubLabel && subLabel}
      {children}
      {hasError && <p className="form-element__error">{i18n.t<string>(errorMessage)}</p>}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  ViewProps & {
    children: React.ReactNode;
    id?: string;
    label?: string | React.ReactNode;
    errorMessage?: string;
    className?: string;
    subLabel?: string | React.ReactNode;
    required?: boolean;
    isTranslatable?: boolean;
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

export default connect(mapStateToProps, mapDispatchToProps)(Element);
