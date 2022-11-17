/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
// import ResizeObserver from 'resize-observer-polyfill';

export default () => {
  const ref = useRef<any>();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(() => new ResizeObserver(([entry]: any[]) => set(entry.contentRect)));

  useEffect(() => {
    ref.current && ro.observe(ref.current);
    return () => {
      ref.current && ro.unobserve(ref.current);
    };
  }, []);
  return { bind: { ref }, bounds };
};

/**
 ** How to use:
 *
 * const [bind, { width }] = useMeasure();
 *
 * <div {...bind}>
 * ...
 * </div>
 */
