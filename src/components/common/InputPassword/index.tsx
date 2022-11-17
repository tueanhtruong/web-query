import React, { useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import './styles.scss';
import { Input } from '..';
import { InputProps } from '../Input';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const InputPassword: React.FC<Props> = (props) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleEye = () => setHidden((prev) => !prev);

  const inputType = hidden ? 'password' : 'text';
  const iconName = hidden ? <AiFillEye /> : <AiFillEyeInvisible />;

  return <Input {...props} type={inputType} iconComponent={iconName} onIconClick={toggleEye} />;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & InputProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InputPassword);
