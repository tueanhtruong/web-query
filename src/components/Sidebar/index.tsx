import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import cn from 'classnames';
import { IRootState } from 'src/redux/rootReducer';
import { Icon, Image, Link, Text, View } from '../common';
import { SidebarMenu } from 'src/appConfig/sidebar';
import { hasPagePermission } from 'src/validations/permissions';
import './styles.scss';
import { IMAGES } from 'src/appConfig/images';
import { setCollapseSidebar } from 'src/redux/common/commonSlice';
import { Navigator } from 'src/services';
import Logo from '../Logo';

const Sidebar: React.FC<Props> = ({
  showMiniSidebar,
  showSidebar,
  isCollapse,
  onSetCollapseSidebar,
}) => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);
  if (!showSidebar) return null;
  const filterSidebar = SidebarMenu.filter((item) => {
    const pagePermissions = item.permissions;
    return hasPagePermission([], pagePermissions);
  });

  return (
    <div style={{ position: 'absolute' }}>
      <Icon
        className={cn('cmp-sidebar__toggle-button', {
          'cmp-sidebar__toggle-button--closed': isCollapse,
          'is--mini': showMiniSidebar,
        })}
        name={'ic_chevron-left'}
        onClick={() => onSetCollapseSidebar(!isCollapse)}
      />
      <div
        className={cn('cmp-sidebar', {
          'cmp-sidebar--collapse': isCollapse,
          'cmp-sidebar--mini': showMiniSidebar,
        })}
      >
        <View className={cn('cmp-sidebar__container')}>
          <View
            isRowWrap
            align="center"
            justify="space-between"
            className={cn('cmp-sidebar__header')}
          >
            {isCollapse && !showMiniSidebar ? (
              <Image className={cn('cmp-sidebar__logo')} src={IMAGES.dlirLogo} />
            ) : (
              <Logo subTitle="" logoSize="40" titleSize={16} spacing={8} />
            )}
          </View>
          <View className="mt-40">
            {filterSidebar.map((item, idx) => {
              return (
                <Link
                  key={`navigator-bar-${idx}`}
                  // to={item.href || ''}
                  href={null}
                  className={cn('cmp-sidebar__item', {
                    'cmp-sidebar__item--closed': isCollapse && !showMiniSidebar,
                  })}
                  onClick={
                    () => {
                      Navigator.navigate(item.href);
                    }
                    // myPermissions?.webAdmin?.canView
                    //   ? Navigator.jumpToWebAdmin(item.href)
                    //   : Navigator.jumpToWebApp(item.href)
                  }
                >
                  <View
                    style={{
                      width: 28,
                    }}
                  >
                    {item.icon}
                  </View>
                  <View
                    className={cn('cmp-sidebar__item__text', {
                      'cmp-sidebar__item__text--closed': isCollapse && !showMiniSidebar,
                    })}
                  >
                    {item.title}
                  </View>
                </Link>
              );
            })}
          </View>
          <View className="mt-32 mb-80" flexGrow={1} justify="flex-end">
            <View className="px-80">
              <Image src={IMAGES.sidebarPlaceholder} />
            </View>
            <View
              className={cn('mt-16 mx-40 text-center', 'cmp-sidebar__footer__text')}
              renderIf={!isCollapse}
            >
              <Text size={18} className="fw-bold">
                First steps
              </Text>
              <Text size={14} className="has-text-gray">
                Customize your dashboard and learn about our features
              </Text>
              <Text className="mt-8 fw-bold">
                <Link>Get Started</Link>
              </Text>
            </View>
          </View>
        </View>
      </div>
    </div>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const mapStateToProps = (state: IRootState) => ({
  // myPermissions: state.myPermissions,
  isCollapse: state.common.collapseSidebar,
  showMiniSidebar: state.common.showMiniSidebar,
  showSidebar: state.common.showSidebar,
});

const mapDispatchToProps = {
  onSetCollapseSidebar: setCollapseSidebar,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
