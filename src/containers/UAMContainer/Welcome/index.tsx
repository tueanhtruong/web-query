import React from 'react';
import { TenantService } from 'src/services';
import EmployerWelcome from '../employer/Welcome';
import TPAWelcome from '../tpa/Welcome';
import AdminWelcome from '../admin/Welcome';

const Welcome: React.FC<Props> = (props) => {
  if (TenantService.isEmployer()) return <EmployerWelcome {...props} />;
  if (TenantService.isTPA()) return <TPAWelcome {...props} />;
  if (TenantService.isAdmin()) return <AdminWelcome {...props} />;
  return null;
};

type Props = {};

export default Welcome;
