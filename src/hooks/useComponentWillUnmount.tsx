/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export default (onUnmountHandler: any) => {
  useEffect(
    () => () => {
      onUnmountHandler();
    },
    []
  );
};
