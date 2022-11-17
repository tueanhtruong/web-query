import { useEffect, useRef } from 'react';

export default (value: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

/**
 * INSTRUCTION:
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 */
