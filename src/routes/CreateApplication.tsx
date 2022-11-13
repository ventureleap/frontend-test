import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  createApplicationAsync,
  selectApplicationCreationStatus,
} from '../features/applications/applicationsSlice';
import CreateApplicationForm from '../features/applications/CreateApplicationForm';
import { Application } from '../types';

export function CreateApplication() {
  const dispatch = useAppDispatch();
  const applicationCreationStatus = useAppSelector(
    selectApplicationCreationStatus
  );

  return (
    <>
      <CreateApplicationForm
        onSubmit={(e: Application) => {
          dispatch(createApplicationAsync(e));
        }}
      />
      {applicationCreationStatus === 'idle' ? '' : applicationCreationStatus}
    </>
  );
}
