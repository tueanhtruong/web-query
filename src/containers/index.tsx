import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps, Switch, useHistory } from 'react-router-dom';
import { Location } from 'history';

import { PATHS } from 'src/appConfig/paths';
import { Screen } from 'src/components/common';
import Navbar from 'src/components/Navbar';
import { Navigator, TenantService } from 'src/services';
import { IRootState } from 'src/redux/rootReducer';
import Dev from './Dev';

// import Signin from './UAMContainer/Signin';
import NotFound from './StartupContainers/NotFound';
import SplashScreen from './StartupContainers/SplashScreen';
import LoadingContainer from './StartupContainers/LoadingContainer';
import ToastContainer from './StartupContainers/ToastContainer';
import AuthContainer from './StartupContainers/AuthContainer';
import ResponsiveContainer from './StartupContainers/ResponsiveContainer';
// import Signup from './UAMContainer/Signup';
// import ForgotPassword from './UAMContainer/ForgotPassword';
// import ResetPassword from './UAMContainer/ResetPassword';
import ContentContainer from './StartupContainers/ContentContainer';
import Sidebar from 'src/components/Sidebar';
import UploadProgressContainer from './StartupContainers/UploadProgressContainer';
import DialogContainer from './StartupContainers/DialogContainer';

import { useComponentDidMount } from 'src/hooks';
// import ForgotOnlineBusinessId from './UAMContainer/ForgotOnlineBusinessId';
// import ChangeTenantButton from 'src/components/ChangeTenantButton';
import Welcome from './UAMContainer/Welcome';
import QueryPage from './QueryPage';
import BasicQuery from './QueryPage/BasicQuery';
import HookQuery from './QueryPage/HookQuery';
import LazyQuery from './QueryPage/LazyQuery';
import QueryVsMutation from './QueryPage/QueryVsMutation';

const Routing: React.FC<{ location: Location }> = (props) => {
  Navigator.setTopHistory(useHistory());

  useComponentDidMount(() => {
    const currentWebTenant = TenantService.getWebTenant();
    TenantService.setTenant({ name: currentWebTenant });
  });

  return (
    <Screen>
      <Navbar />
      {/* <ChangeTenantButton /> */}
      <Switch location={props.location}>
        <Route path={PATHS.root} render={() => <Redirect to={PATHS.query} />} exact />
        <CustomRoute path={PATHS.mutationQuery} component={QueryVsMutation} />
        <CustomRoute path={PATHS.basicQuery} component={BasicQuery} />
        <CustomRoute path={PATHS.lazyQuery} component={LazyQuery} />
        <CustomRoute path={PATHS.hookQuery} component={HookQuery} />
        <CustomRoute path={PATHS.query} component={QueryPage} />
        <CustomRoute path={PATHS.welcome} component={Welcome} />

        <Route path={PATHS.dev} component={Dev} />
        <CustomRoute path={PATHS.dev} component={Dev} />
        <Route component={NotFound} />
      </Switch>
      <Sidebar />
      <AuthContainer />
      <ContentContainer />
      <LoadingContainer />
      <DialogContainer />
      <ToastContainer />
      <ResponsiveContainer />
      <UploadProgressContainer />
    </Screen>
  );
};

export default Routing;

const CRouting: React.FC<Props> = ({ isAuthenticated, pageRequiredAuth, component, ...rest }) => {
  const renderRoute = (Component: any) => (props: RouteProps) => {
    if (isAuthenticated === null) return <SplashScreen />;

    if ((isAuthenticated && pageRequiredAuth) || (!isAuthenticated && !pageRequiredAuth)) {
      // Before render component, check permission first
      return <Component {...props} />;
    }

    const redirectPath = isAuthenticated ? PATHS.myProfile : PATHS.signIn;
    const redirectProps = {
      to: {
        pathname: redirectPath,
        state: { from: props.location },
      },
    };
    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderRoute(component)} />;
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteProps & { pageRequiredAuth?: boolean };

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {};

const CustomRoute = connect(mapStateToProps, mapDispatchToProps)(CRouting);
