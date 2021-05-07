import { useEffect, useState } from 'react';

function useControllableState<T>(value: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  return [state, setState];
}

export { useControllableState };
