import { useLocation } from 'react-router-dom';
import qs from 'query-string';

export default function useQueryParams(defaultValue) {
  const { search = '' } = useLocation();
  return qs.parse(search) || defaultValue;
}
