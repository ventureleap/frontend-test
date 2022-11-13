import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  applications,
  getApplicationsAsync,
} from '../features/applications/applicationsSlice';

export function Applications() {
  const dispatch = useAppDispatch();
  const applicationsData = useAppSelector(applications);

  useEffect(() => {
    dispatch(getApplicationsAsync());
  }, [dispatch]);

  return <>{JSON.stringify(applicationsData)}</>;
}
