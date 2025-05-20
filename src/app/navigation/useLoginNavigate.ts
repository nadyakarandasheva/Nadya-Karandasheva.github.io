import { useLocation, useNavigate } from 'react-router-dom';

export const useLoginNavigate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.state?.from) setTimeout(() => navigate(location.state?.from));
};
