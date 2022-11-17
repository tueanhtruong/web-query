/* eslint-disable react-hooks/exhaustive-deps */
import { Auth, Hub } from 'aws-amplify';
import { History } from 'history';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { useComponentDidMount } from 'src/hooks';
import { setAuthenticated, setUserName } from 'src/redux/auth/authSlice';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator, TenantService, TokenService } from 'src/services';

const AuthContainer: React.FC<Props> = ({
  history,
  isAuthenticated,
  onSetAuth,
  onSetUserName,
  isWelcomeScreen,
}) => {
  // =========================== Didmount ===========================

  useEffect(() => {
    Hub.listen('auth', authLogin);
    // 1.call this first when mount because history listen fire when route changed
    // authenticate();
    return () => {
      Hub.remove('auth', authLogin);
    };
  }, [isAuthenticated, isWelcomeScreen]);

  useComponentDidMount(async () => {
    try {
      await TokenService.getToken();
      authenticate();
    } catch (error) {
      clearAuth();
    }
  });

  const authLogin = (res: { payload: { event: string; data?: any } }) => {
    const { payload } = res;
    const { event } = payload;
    switch (event) {
      case 'signIn':
        if (!isWelcomeScreen) {
          authenticate();
        }
        break;
      case 'signOut':
        // TokenService.clearToken();
        clearAuth();
        break;
      case 'signIn_failure':
        console.log('signin error', payload?.data?.message);
        break;
      default:
        break;
    }
  };

  const clearAuth = () => {
    onSetAuth(false);
    // handleSetStaleProfile();
  };

  const authenticate = () => {
    if (!isAuthenticated) {
      // 2. Get current user
      Auth.currentAuthenticatedUser()
        .then((user) => {
          // const userAttributes = user.attributes;
          // TODO: Temp fix until employer profile integrated
          if (TenantService.isClaimant()) Navigator.jumpToWebClaimant(PATHS.myProfile);
          if (TenantService.isEmployer()) {
            Navigator.jumpToWebEmployer(PATHS.myProfile);
          }
          if (TenantService.isTPA()) {
            Navigator.jumpToWebTPA(PATHS.myProfile);
          }
          if (TenantService.isAdmin()) {
            Navigator.jumpToWebAdmin(PATHS.myProfile);
          }
        })
        .catch(() => {
          clearAuth();
        });
    }
  };

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { history: History };

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isWelcomeScreen: state.auth.isWelcomeScreen,
});

const mapDispatchToProps = {
  onSetAuth: setAuthenticated,
  onSetUserName: setUserName,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthContainer));
