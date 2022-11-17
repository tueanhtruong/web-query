import React from 'react';
import { TenantService } from 'src/services';
import ClaimantResetPassword from '../claimant/ResetPassword';
import EmployerResetPassword from '../employer/ResetPassword';
import TPAResetPassword from '../tpa/ResetPassword';
import AdminResetPassword from '../admin/ResetPassword';
import { History, Location } from 'history';

const ResetPassword: React.FC<Props> = (props) => {
  if (TenantService.isEmployer()) return <EmployerResetPassword {...props} />;
  if (TenantService.isClaimant()) return <ClaimantResetPassword {...props} />;
  if (TenantService.isTPA()) return <TPAResetPassword {...props} />;
  if (TenantService.isAdmin()) return <AdminResetPassword {...props} />;
  return null;
};

type Props = { history: History; location: Location<string> };

export default ResetPassword;
