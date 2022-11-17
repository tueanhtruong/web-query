import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Callback } from 'src/redux/types';
import { Waypoint } from 'react-waypoint';

const LazyCheckPoint: React.FC<PropsWithChildren<Props>> = ({
  children,
  onFirstEnter,
  refreshValue = null,
}) => {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (refreshValue) {
      setEntered(false);
    }
  }, [refreshValue]);

  const handleEnterView = (args) => {
    if (!entered) {
      onFirstEnter(args);
      setEntered(true);
    }
  };
  return <Waypoint onEnter={handleEnterView}>{children}</Waypoint>;
};

type Props = {
  onFirstEnter: Callback;
  refreshValue?: any;
};

export default LazyCheckPoint;
