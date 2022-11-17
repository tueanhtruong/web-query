import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Clear, Search } from '@material-ui/icons';
import { debounce } from 'lodash';
import React from 'react';
import { isEmpty } from 'src/validations';
import View from '../View';
import './styles.scss';

const clsPrefix = 'custom-search-table';

type Props = {
  searchText: string;
  onSearch: (text: string) => void;
  placeholder?: string;
};

const CustomSearchRender: React.FC<Props> = ({ searchText, onSearch, placeholder = 'Search' }) => {
  const ref = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState(searchText || '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceValue = React.useCallback(debounce(onSearch, 300), []);

  const hasValue = !isEmpty(searchText);

  const handleTextChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
    debounceValue(value);
  };

  const handleClearSearchValue = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <View isRowWrap className={`${clsPrefix}`} forwardRef={ref}>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        classes={{
          root: `${clsPrefix}-search`,
        }}
        size="small"
        autoComplete="new-password"
        value={searchValue}
        onChange={handleTextChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          ...(hasValue && {
            endAdornment: (
              <IconButton
                classes={{ root: `${clsPrefix}-icon p-2` }}
                onClick={handleClearSearchValue}
              >
                <Clear />
              </IconButton>
            ),
          }),
        }}
      />
    </View>
  );
};

export default CustomSearchRender;
