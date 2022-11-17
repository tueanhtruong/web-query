import { useEffect, useRef } from 'react';

export default (callback: any, delay: number) => {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay !== null) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
};

/**
 * INSTRUCTION:
 * useInterval(() => {handler}, 200)
 */
