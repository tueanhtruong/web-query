// TabsBar/index.tsx

import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { COLOR_CODE } from 'src/appConfig/constants';
import { Text, View } from 'src/components/common';
// import { TabList } from 'src/containers/Home/helpers';
import { Callback } from 'src/redux/types';
import './styles.scss';

interface TabList {
  label: string;
  value: string;
  count?: number;
}

const TabsBar: React.FC<Props> = ({ value, onChange, tabsList, buttons, color = 'primary' }) => {
  return (
    <View isRow justify="space-between" className={`react-mui-tabs`}>
      <Tabs
        value={value}
        indicatorColor={color}
        textColor={color}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        classes={{
          indicator: `react-mui-tabs__indicator`,
        }}
      >
        {tabsList.map((tab, index) => {
          return (
            <Tab
              label={
                !!tab.count ? (
                  <View isRow>
                    <Text className={``}>{tab.label} </Text>
                    <View style={tagStyles}>{tab.count}</View>
                  </View>
                ) : (
                  tab.label
                )
              }
              value={tab.value}
              classes={{ root: `react-mui-tabs__tab`, selected: `react-mui-tabs__tab--selected` }}
              key={tab.value}
            />
          );
        })}
      </Tabs>

      {buttons}
    </View>
  );
};

const tagStyles = {
  borderRadius: '16px',
  color: COLOR_CODE.WHITE,
  background: COLOR_CODE.DANGER,
  fontSize: 12,
  alignSelf: 'center',
  padding: '0px 4px',
  marginLeft: '4px',
};

type Props = {
  value: string;
  onChange: Callback;
  tabsList: TabList[];
  buttons?: React.ReactNode;
  color?: 'primary' | 'secondary';
  dataLength?: number;
};

export default TabsBar;
