import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export default defaultValue => {
  const { search = '' } = useLocation();
  return qs.parse(search) || defaultValue;
};
