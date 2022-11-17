import React from 'react';
import { TenantService } from 'src/services';
import ClaimantSignup from '../claimant/Signup';
import EmployerSignUp from '../employer/Signup';
import TPASignUp from '../tpa/Signup';
import { History } from 'history';

const SignUp: React.FC<Props> = (props) => {
  if (TenantService.isClaimant()) return <ClaimantSignup {...props} />;
  if (TenantService.isEmployer()) return <EmployerSignUp {...props} />;
  if (TenantService.isTPA()) return <TPASignUp {...props} />;
  return null;
};

type Props = { history: History };

export default SignUp;
