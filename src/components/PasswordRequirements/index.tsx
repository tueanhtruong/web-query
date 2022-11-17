import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import { Text, View } from '../common';
import cn from 'classnames';
import './styles.scss';
import { BsCheck, BsX } from 'react-icons/bs';
import { IRootState } from 'src/redux/rootReducer';

const REQUIREMENTS = [
  {
    message: 'Must have at least 8 characters',
    condition: (password) => {
      return password.length >= 8;
    },
  },
  {
    message: 'Must have at least 1 lowercase character',
    condition: (password) => {
      const exp = new RegExp('^(?=.*[a-z]).+$');
      return exp.test(password);
    },
  },
  {
    message: 'Must have at least 1 uppercase character',
    condition: (password) => {
      const exp = new RegExp('^(?=.*[A-Z]).+$');
      return exp.test(password);
    },
  },
  {
    message: 'Must have at least 1 number',
    condition: (password) => {
      const exp = new RegExp('^(?=.*\\d).+$');
      return exp.test(password);
    },
  },
  {
    message: 'Must have at least 1 special characters !, @, #, $, %, ^, &, or *',
    condition: (password) => {
      const exp = new RegExp('^(?=.*[!@#$%^&*]).+$');
      return exp.test(password);
    },
  },
];

const Requirement = ({ isAccepted, message, ...props }) => {
  return (
    <View
      className={cn('cmp-password-requirement', {
        'cmp-password-requirement--accepted': isAccepted,
        'cmp-password-requirement--rejected': !isAccepted,
      })}
      {...props}
    >
      <View isRow className={cn('flex-center mb-1')}>
        {isAccepted ? <BsCheck size={18} /> : <BsX size={18} />}
        <Text size={14} className="ml-8">
          {message}
        </Text>
      </View>
    </View>
  );
};

const PasswordRequirements: React.FC<Props> = ({ className, password }) => {
  return (
    <View className={className}>
      {REQUIREMENTS.map((r) => (
        <Requirement message={r.message} isAccepted={r.condition(password)} />
      ))}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  HTMLProps<HTMLDivElement> & {
    password: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRequirements);
