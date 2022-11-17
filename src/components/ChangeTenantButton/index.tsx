import _ from 'lodash';
import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { TenantService } from 'src/services';
import { CustomDropdown, View } from '../common';
import './styles.scss';
import appConfig from 'src/appConfig';

const ChangeTenantButton: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const currentTenant = TenantService.getWebTenant();
  const currentTenantName = `${_.upperCase(currentTenant)} PORTAL`;

  const options = TenantService.TenantOptions.map((option) => ({
    ...option,
    isActive: option.value === currentTenant,
    label: `${option.label} Portal`,
    onClick: () => TenantService.changeWebTenant(option.value),
  })).filter((item) => appConfig.NODE_ENV === 'development' || !item.isHideOnProduction);

  // const isDevEnv = appConfig.NODE_ENV === 'development';

  // if (!isDevEnv) return null;

  return (
    <View className="cmp-change-tenant">
      <CustomDropdown
        items={options}
        containerClassName="cmp-change-tenant__dropdown"
        xPosition="right"
        onChangOpen={setExpanded}
        label={
          <View isRow className="cmp-change-tenant__button " align="center" justify="center">
            <div className="cmp-change-tenant__button--circle" />
            <span className="cmp-change-tenant__button--text fw-medium">{currentTenantName}</span>
            {expanded ? <IoChevronUp className="ml-1" /> : <IoChevronDown className="ml-1" />}
          </View>
        }
      />
    </View>
  );
};

type Props = {};

export default ChangeTenantButton;
