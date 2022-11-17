import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import './styles.scss';
import { IRootState } from 'src/redux/rootReducer';
import { View } from '../';
import Icon from '../Icon';
import Text from '../Text';
import { Callback } from 'src/redux/types';

const ValidatePassword: React.FC<Props> = ({ className, password, oldPassword = '', onChange }) => {
  const validateSchemas: Array<{
    message: string;
    isValid: (value: string) => boolean;
  }> = useMemo(() => {
    const defaultValidate = [
      { message: 'Must have at least 8 characters', isValid: (password) => /.{8,}/.test(password) },
      { message: 'Must have at least 1 lowercase', isValid: (password) => /[a-z]/.test(password) },
      { message: 'Must have at least 1 uppercase', isValid: (password) => /[A-Z]/.test(password) },
      { message: 'Must have at least 1 number', isValid: (password) => /[0-9]/.test(password) },
      {
        message: 'Must have at least 1 special characters !, @, #, $, %, ^, &, or *',
        isValid: (password) => /.*[!@#$%^*&]/.test(password),
      },
    ];
    const oldPasswordCheck = oldPassword
      ? [
          {
            message: 'Must not be the same as current password',
            isValid: (password) => oldPassword !== password,
          },
        ]
      : [];
    return [...defaultValidate, ...oldPasswordCheck];
  }, [oldPassword]);

  useEffect(() => {
    if (onChange) {
      onChange(validateSchemas?.every((x) => x?.isValid(password)));
    }
    // eslint-disable-next-line
  }, [password]);

  const isShow = !!password;

  return (
    <View
      className={cn('cmp-validate-password', className, { 'cmp-validate-password--show': isShow })}
    >
      {validateSchemas.map((item, idx) => {
        const isValid = item?.isValid(password);
        return (
          <View
            key={`validate-password__item-${idx}`}
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
    password: string;
    oldPassword?: string;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ValidatePassword);
