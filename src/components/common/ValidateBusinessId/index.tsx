import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { IRootState } from 'src/redux/rootReducer';
import { View } from '../';
import Icon from '../Icon';
import Text from '../Text';
import { Callback } from 'src/redux/types';
import { ErrorService } from 'src/services';

const ValidatePassword: React.FC<Props> = ({ className, businessId, onChange }) => {
  const { businessIdLength, alphanumeric, noSpaces, noSpecialCharacters } = ErrorService.MESSAGES;
  const validateSchemas: Array<{
    message: string;
    isValid: (value: string) => boolean;
  }> = useMemo(() => {
    const defaultValidate = [
      {
        message: businessIdLength,
        isValid: (businessId) => !(businessId.length < 3 || businessId.length > 25),
      },
      {
        message: alphanumeric,
        isValid: (businessId) => /^[a-zA-Z0-9]+$/.test(businessId),
      },
      {
        message: noSpaces,
        isValid: (businessId) => !/\s+/.test(businessId),
      },
      {
        message: noSpecialCharacters,
        // eslint-disable-next-line no-useless-escape
        isValid: (businessId) => !/[_!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(businessId),
      },
    ];
    return defaultValidate;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(validateSchemas?.every((x) => x?.isValid(businessId)));
    }
    // eslint-disable-next-line
  }, [businessId]);

  const isShow = !!businessId;

  return (
    <View
      className={cn('cmp-validate-password', className, {
        'cmp-validate-password--show': isShow,
      })}
    >
      {validateSchemas.map((item, idx) => {
        const isValid = item?.isValid(businessId);
        return (
          <View
            key={`validate-businessId__item-${idx}`}
            className={cn(
              'cmp-validate-password__item',
              { 'cmp-validate-password__item--valid': isValid },
              { 'cmp-validate-password__item--invalid': !isValid }
            )}
            isRowWrap
            align="center"
            justify="flex-start"
            style={{
              transitionDelay: `${idx * 0.04}s`,
            }}
          >
            <Icon name={isValid ? 'ic_check' : 'ic_close'} size={20} />
            <Text className="ml-8">{item.message}</Text>
          </View>
        );
      })}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
    onChange?: Callback;
    businessId: string;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePassword);
