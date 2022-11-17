/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

export default (onMountHandler: any) => {
  useEffect(() => {
    onMountHandler();
  }, []);
};
