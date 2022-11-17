import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import cn from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { IMAGES } from 'src/appConfig/images';
import { IRootState } from 'src/redux/rootReducer';
import { Callback } from 'src/redux/types';
import { Image, Text, View } from '../common';
import './styles.scss';

const clsPrefix = 'cmp-logo';

export const LogoName = {
  title: 'Unemployment Insurance',
  subTitle: 'State of Hawaii, Department of Labor and Industrial Relations',
};

const Logo: React.FC<Props> = ({
  className = '',
  logoSize = 80,
  title = LogoName.title,
  titleSize = 20,
  subTitle = LogoName.subTitle,
  subTitleSize = 16,
  spacing = 16,
  onClick,
  hideTitle,
  hideSubTitle,
  titleColor,
  subTitleColor,
  isColumn = false,
}) => {
  return (
    <View className={cn(clsPrefix, className, { 'cursor-pointer': !!onClick })} onClick={onClick}>
      {isColumn ? (
        <View className={`${clsPrefix} text-center`}>
          <View align="center">
            <Image
              src={IMAGES.dlirLogo}
              className={`${clsPrefix}__img`}
              width={logoSize}
              height={logoSize}
            />
          </View>
          <Text
            size={titleSize}
            className={cn(`fw-bold text-color-grey-900 mt-16`, {
              'text-center': isColumn,
            })}
            color={titleColor ? titleColor : undefined}
          >
            {title}
          </Text>
          <Text
            size={subTitleSize}
            className={cn(`fw-normal text-color-grey-600  mt-8`, {
              'text-center': isColumn,
            })}
            color={subTitleColor ? subTitleColor : undefined}
          >
            {subTitle}
          </Text>
        </View>
      ) : (
        <ListItem
          alignItems="center"
          classes={{ root: className ? className : undefined }}
          disableGutters
        >
          <ListItemAvatar
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              src={IMAGES.dlirLogo}
              className={`${clsPrefix}__img`}
              width={logoSize}
              height={logoSize}
            />
          </ListItemAvatar>
          <ListItemText
            style={{
              marginLeft: spacing,
            }}
            primary={
              !hideTitle ? (
                <span
                  className={cn(`fw-bold text-color-grey-900`, {
                    'text-center': isColumn,
                  })}
                  style={{
                    color: titleColor,
                    fontSize: titleSize,
                  }}
                >
                  {title}
                </span>
              ) : null
            }
            secondary={
              !hideSubTitle ? (
                <span
                  className={cn(`fw-normal text-color-grey-600`, {
                    'text-center': isColumn,
                  })}
                  style={{
                    color: subTitleColor,
                    fontSize: subTitleSize,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {subTitle}
                </span>
              ) : null
            }
          />
        </ListItem>
      )}
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    className?: string;
    logoSize?: string | number;
    title?: string;
    titleSize?: number;
    subTitle?: string;
    subTitleSize?: number;
    spacing?: number;
    onClick?: Callback;
    hideTitle?: boolean;
    hideSubTitle?: boolean;
    titleColor?: string;
    subTitleColor?: string;
    isColumn?: boolean;
  };
const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
