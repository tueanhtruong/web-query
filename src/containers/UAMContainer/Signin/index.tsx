import React from 'react';
import { TenantService } from 'src/services';
import ClaimantSignin from '../claimant/Signin';
import EmployerSignin from '../employer/Signin';
import TPASignin from '../tpa/Signin';
import AdminSignin from '../admin/Signin';
import { History } from 'history';

const SignIn: React.FC<Props> = (props) => {
  if (TenantService.isClaimant()) return <ClaimantSignin {...props} />;
  if (TenantService.isEmployer()) return <EmployerSignin {...props} />;
  if (TenantService.isTPA()) return <TPASignin {...props} />;
  if (TenantService.isAdmin()) return <AdminSignin {...props} />;
  return null;
};

type Props = { history: History };

export default SignIn;
