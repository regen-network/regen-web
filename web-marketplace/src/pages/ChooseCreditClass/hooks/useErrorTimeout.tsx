import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ERROR_TIMEOUT } from '../ChooseCreditClass.config';

function useErrorTimeout(): [string, Dispatch<SetStateAction<string>>] {
  const [error, setError] = useState<string>('');
  // Reset error message, so it reappears when user tries again
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError('');
      }, ERROR_TIMEOUT);
    }
  }, [error]);

  return [error, setError];
}

export { useErrorTimeout };
