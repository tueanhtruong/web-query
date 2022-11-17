import { useMediaQuery } from '@material-ui/core';
import { History } from 'history';
import React, { useMemo, useState } from 'react';
import { muiResponsive } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import AnimatedTabPanel from 'src/components/AnimatedTabPanel';
import { Image, View } from 'src/components/common';
import Logo from 'src/components/Logo';
import AccountNumberRegistration from './AccountNumberRegistration';
import CreateOnlineProfile from './CreateOnlineProfile';
import EmployerRegistration from './EmployerRegistration';

export enum SCREEN_KEY {
  EMPLOYER_REGISTRATION = 'EMPLOYER_REGISTRATION',
  CREATE_ONLINE_PROFILE = 'CREATE_ONLINE_PROFILE',
  ACCOUNT_NUMBER_REGISTRATION = 'ACCOUNT_NUMBER_REGISTRATION',
}

const EmployerSignUp: React.FC<Props> = () => {
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);
  const [screenKey, setScreenKey] = useState<SCREEN_KEY>(SCREEN_KEY.EMPLOYER_REGISTRATION);
  const SCREENS = useMemo(() => {
    return {
      [SCREEN_KEY.EMPLOYER_REGISTRATION]: <EmployerRegistration onChangeScreen={setScreenKey} />,
      [SCREEN_KEY.CREATE_ONLINE_PROFILE]: <CreateOnlineProfile />,
      [SCREEN_KEY.ACCOUNT_NUMBER_REGISTRATION]: <AccountNumberRegistration />,
    };
  }, []);

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLoginEmployer} />
      <View className="ctn-uam__container--wrap pb-32" flexGrow={1}>
        <View className="ctn-uam__container" flexGrow={1}>
          <Logo
            className="mb-16"
            isColumn={isTabletScreen}
            subTitleSize={isTabletScreen ? 14 : 16}
          />
          <AnimatedTabPanel mode="wait" key={screenKey}>
            {
              // eslint-disable-next-line security/detect-object-injection
              SCREENS[screenKey]
            }
          </AnimatedTabPanel>
        </View>
      </View>
    </View>
  );
};

type Props = { history: History };

export default EmployerSignUp;
