// import dayjs from 'dayjs';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { CustomDropdown } from 'src/components/common';
import { useComponentDidMount } from 'src/hooks';
// import { setChangingLocale } from 'src/redux/commonRedux/actions';
// import { getLanguageAsync } from 'src/redux/languageRedux/actions';
import { IRootState } from 'src/redux/rootReducer';
import { LanguageService } from 'src/services';
import { LanguageCode } from 'src/services/language';
import { waiter } from 'src/utils';
import './styles.scss';

const LanguageSwitch: React.FC<Props> = ({
  containerClassName,
  labelClassName,
  // onSetChangingLocale,
}) => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(LanguageService.getLanguage());

  const handleTriggerChange = async (language) => {
    // onSetChangingLocale(true);
    await waiter(400);
    i18n.changeLanguage(language);
    dayjs.locale(language);
    // onSetChangingLocale(false);
  };

  useComponentDidMount(() => {
    const language = LanguageService.getLanguage();
    setSelected(language);
    handleTriggerChange(language);
  });

  const languages = [
    {
      icon: null,
      label: 'English',
      value: 'en',
      onClick: (e) => {
        e.preventDefault();
        handleChangeLanguage('en');
        return false;
      },
      isActive: selected === 'en',
    },
    {
      icon: null,
      label: 'Tiếng Việt',
      value: 'vi',
      onClick: (e) => {
        e.preventDefault();
        handleChangeLanguage('vi');
        return false;
      },
      isActive: selected === 'vi',
    },
  ];

  // const languages =
  //   locales
  //     ?.filter(x => x)
  //     ?.map(locale => ({
  //       icon: null,
  //       label: locale.name,
  //       value: locale.code,
  //       onClick: () => handleChangeLanguage(locale.code),
  //       isActive: selected === locale.code,
  //     })) || [];

  const handleChangeLanguage = (language) => {
    setSelected(language);
    const locale = languages.find((x) => x.value === language);
    LanguageService.setLocale({
      code: locale.value as LanguageCode,
    });
    handleTriggerChange(locale.value);
    // dayjs.locale(locale.value);
    // window.location.reload();
  };

  // const FlagLabel = selected === 'en' ? Flags.US : Flags.VN;

  //  FIXME: Hide CustomDropdown when testing done
  // return !IS_PRODUCTION ? (
  return (
    <CustomDropdown
      xPosition="left"
      items={languages}
      label={_.toUpper(selected)}
      containerClassName={containerClassName}
      labelClassName={labelClassName}
    />
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    containerClassName?: string;
    labelClassName?: string;
  };

const mapStateToProps = (state: IRootState) => ({
  // locales: state.language?.locales || [],
});

const mapDispatchToProps = {
  // onSetChangingLocale: setChangingLocale,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitch);
