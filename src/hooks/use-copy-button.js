import { useState, useCallback, useEffect } from 'react';

export function useCopyButton(onCopy) {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const onClick = useCallback(async () => {
    try {
      setError(false);
      await onCopy();
      setChecked(true);
    } catch (e) {
      setError(true);
    }
  }, [onCopy]);

  useEffect(() => {
    if (checked) {
      const timeout = setTimeout(() => setChecked(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [checked]);

  return [checked, onClick, error];
}
