import React from 'react';
import './styles.scss';
import cn from 'classnames';

const ButtonSwitch: React.FC<Props> = ({ value = null, onChange, name, disabled, ...props }) => {
  const handleClick = () => {
    onChange(name, !value);
  };

  return (
    <label className={cn('cmp-button-switch', { 'cmp-button-switch--disabled': disabled })}>
      <input type="checkbox" checked={value} onClick={handleClick} onChange={() => {}} {...props} />
      <span className="cmp-button-switch__slider" />
    </label>
  );
};

type Props = {
  value: boolean | null;
  onChange: (name: string, value: boolean) => void;
  name?: string;
  disabled?: boolean;
};

export default ButtonSwitch;
