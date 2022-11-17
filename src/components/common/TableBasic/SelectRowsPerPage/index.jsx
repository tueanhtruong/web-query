import { useRef } from 'react';
import cn from 'classnames';
import Select from 'react-select';
import './styles.scss';
// import { isEmpty } from 'src/validations';
import { getRandomId } from 'src/utils';
import { COLOR_CODE } from 'src/appConfig/constants';
import { components } from 'react-select';
import { IoCaretDownOutline } from 'react-icons/io5';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoCaretDownOutline size={12} />
    </components.DropdownIndicator>
  );
};

const SelectRowsPerPage = ({
  options,
  value,
  onChange,
  onBlur = null,
  label = '',
  className = '',
  placeholder = '',
  containerClassName = '',
  name = '',
  isDisabled = false,
  ...props
}) => {
  const id = useRef(`select-rows-per-page-${getRandomId()}`);

  const handleChange = (selectedOption) => {
    onChange(selectedOption?.value || null);
  };

  const handleSelectBlur = (event) => {
    onBlur && onBlur(name, true);
  };

  const formattedOptions = options.map((o) => ({ label: o, value: o }));

  const selectedOption = formattedOptions?.find((option) => option.value === value) || null;
  return (
    <Select
      id={id.current}
      isClearable={false}
      isSearchable={false}
      isDisabled={isDisabled}
      value={selectedOption}
      placeholder={placeholder}
      onChange={handleChange}
      options={formattedOptions}
      className={cn('cmp-select-rows-per-page', className, {
        'cmp-select-rows-per-page--is-disabled': isDisabled,
      })}
      classNamePrefix="cmp-select-rows-per-page"
      menuPlacement="auto"
      onBlur={handleSelectBlur}
      name={name}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: COLOR_CODE.PRIMARY,
          neutral20: COLOR_CODE.DISABLED,
        },
      })}
      {...props}
      components={{
        DropdownIndicator,
        // IndicatorSeparator: null,
      }}
    />
  );
};

export default SelectRowsPerPage;
