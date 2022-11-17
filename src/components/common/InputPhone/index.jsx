import { useRef } from 'react';
import cn from 'classnames';
import PhoneInput from 'react-phone-number-input';
import './styles.scss';
import View from '../View';
import Element from '../Element';
import { getRandomId } from 'src/utils';
import { isEmpty } from 'src/validations';

export default ({
  label,
  defaultCountryCode = 'US',
  errorMessage,
  containerClassName = '',
  name,
  onChange,
  icon = null,
  required = false,
  isTranslatable = false,
  ...props
}) => {
  const id = useRef(`input-${getRandomId()}`);

  const handleChange = (value) => {
    onChange(name, value ? value : '');
  };

  // For change style of phone input, follow:
  // https://catamphetamine.gitlab.io/react-phone-number-input/
  return (
    <Element
      id={id.current}
      errorMessage={errorMessage}
      label={label}
      className={containerClassName}
      required={required}
      isTranslatable={isTranslatable}
    >
      <View className="cmp-phoneinput">
        <PhoneInput
          international
          defaultCountry={defaultCountryCode}
          className={cn({
            'cmp-phoneinput__input--error': !isEmpty(errorMessage),
          })}
          onChange={handleChange}
          name={name}
          countryOptionsOrder={['US']}
          {...props}
        />

        <span className="cmp-phoneinput__icon">{icon}</span>
      </View>
    </Element>
  );
};
