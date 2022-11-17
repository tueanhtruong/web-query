import { useMediaQuery } from '@material-ui/core';
import { History } from 'history';
import React, { useMemo, useState } from 'react';
import { muiResponsive } from 'src/appConfig/constants';
import { IMAGES } from 'src/appConfig/images';
import AnimatedTabPanel from 'src/components/AnimatedTabPanel';
import { Image, View } from 'src/components/common';
import Logo from 'src/components/Logo';
import CreateOnlineProfile from './CreateOnlineProfile';
import TPARegistration from './TPARegistration';

export enum SCREEN_KEY {
  TPA_REGISTRATION = 'TPA_REGISTRATION',
  CREATE_ONLINE_PROFILE = 'CREATE_ONLINE_PROFILE',
}

const TPASignUp: React.FC<Props> = () => {
  const isTabletScreen = useMediaQuery(muiResponsive.TABLET);
  const [screenKey, setScreenKey] = useState<SCREEN_KEY>(SCREEN_KEY.TPA_REGISTRATION);
  const SCREENS = useMemo(() => {
    return {
      [SCREEN_KEY.TPA_REGISTRATION]: <TPARegistration onChangeScreen={setScreenKey} />,
      [SCREEN_KEY.CREATE_ONLINE_PROFILE]: <CreateOnlineProfile onChangeScreen={setScreenKey} />,
    };
  }, []);

  return (
    <View className="ctn-uam" flexGrow={1}>
      <Image className="ctn-uam__image" src={IMAGES.backgroundLoginTPA} />
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

export default TPASignUp;
