import React from 'react';

import { Loading } from 'src/components/common';
import { LoadingProps } from '../Loading';

const LoadingCommon: React.FC<LoadingProps> = props => {
  return <Loading variant="secondary" size="small" loadingStyle={5} {...props} />;
};

export default LoadingCommon;
