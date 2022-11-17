import React from 'react';
import { TenantService } from 'src/services';
import ClaimantForgotPassword from '../claimant/ForgotPassword';
import EmployerForgotPassword from '../employer/ForgotPassword';
import TPAForgotPassword from '../tpa/ForgotPassword';
import AdminForgotPassword from '../admin/ForgotPassword';
import { History, Location } from 'history';

const ForgotPassword: React.FC<Props> = (props) => {
  if (TenantService.isClaimant()) return <ClaimantForgotPassword {...props} />;
  if (TenantService.isEmployer()) return <EmployerForgotPassword {...props} />;
  if (TenantService.isTPA()) return <TPAForgotPassword {...props} />;
  if (TenantService.isAdmin()) return <AdminForgotPassword {...props} />;
  return null;
};

type Props = { history: History; location: Location<string> };

export default ForgotPassword;
