import React, { useState } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'src/redux/rootReducer';
import { Button, CustomDropdown, Icon } from '..';

const DEFAULT_SORT_OPTION = 1;

const SORTING_OPTIONS = [
  { id: 1, label: 'Name', icon: 'ic_arrow-down' },
  { id: 2, label: 'Name (Z-A)', icon: 'ic_arrow-up' },
  { id: 3, label: 'UPLOADED TIME', icon: 'ic_arrow-down' },
  { id: 4, label: 'UPLOADED TIME', icon: 'ic_arrow-up' },
  { id: 5, label: 'CUSTOM', icon: 'ic_shuffle' },
];

const SortingButton: React.FC<Props> = ({ onChange }) => {
  const [selectedAction, setSelectedAction] = useState<number>(DEFAULT_SORT_OPTION);

  const handleSelectItem = (id: number) => () => {
    setSelectedAction(id);
    onChange && onChange(id);
  };

  const filteredOptions = SORTING_OPTIONS.map(option => ({
    ...option,
    onClick: handleSelectItem(option.id),
    isActive: option.id === selectedAction,
  }));

  const Label = () => {
    const getSelectedAction = SORTING_OPTIONS.find(x => x.id === selectedAction);
    return (
      <Button id="sorting-button" variant="sorting" icon={<Icon name={getSelectedAction?.icon} />}>
        {getSelectedAction?.label}
      </Button>
    );
  };

  return <CustomDropdown xPosition="left" label={<Label />} items={filteredOptions} />;
};

export type SortingOption = {
  label: string;
  icon: React.ReactElement;
  filed: string;
  value: string;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    onChange?: (...args: any[]) => void;
    className?: string;
  };

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SortingButton);
