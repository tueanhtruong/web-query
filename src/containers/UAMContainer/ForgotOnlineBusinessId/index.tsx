import React from 'react';
import { TenantService } from 'src/services';
import EmployerForgotOnlineBusinessId from '../employer/ForgotOnlineBusinessId';
import TPAForgotOnlineBusinessId from '../tpa/ForgotOnlineBusinessId';
import { History } from 'history';

const ForgotOnlineBusinessId: React.FC<Props> = (props) => {
  if (TenantService.isEmployer()) return <EmployerForgotOnlineBusinessId {...props} />;
  if (TenantService.isTPA()) return <TPAForgotOnlineBusinessId {...props} />;
  return null;
};

type Props = { history: History };

export default ForgotOnlineBusinessId;
