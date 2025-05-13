import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useOnProfileClick = () => {
  const navigate = useNavigate();

  const onProfileClick = useCallback(async () => {
    navigate('/dashboard');
  }, [navigate]);

  return onProfileClick;
};
