import { useEffect } from 'react';
import { Form } from 'react-final-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Application } from 'models/application.model';
import {
  createApplication,
  getApplication,
  selectApplications,
  setActiveApplication,
  updateApplication
} from 'reducers/application/applicationSlice';
import FetchButton from 'components/fetch-button';
import FormField from 'components/form-field';
import Loading from 'components/loading';

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const { activeApplication, status } = useAppSelector(selectApplications);
  const dispatch = useAppDispatch();
  const mode = applicationId ? 'update' : 'create';

  const handleFormSubmit = async (formData: Application) => {
    try {
      if (mode === 'create') {
        await dispatch(createApplication(formData)).unwrap();
      } else {
        await dispatch(updateApplication(formData)).unwrap();
        dispatch(setActiveApplication(null));
      }
      navigate('/');
    } catch (error: any) {
      toast.error(error.details);
    }
  };

  useEffect(() => {
    if (mode === 'create') {
      dispatch(setActiveApplication(null));
    }
  }, [mode, dispatch]);

  useEffect(() => {
    if (applicationId && !activeApplication) {
      dispatch(getApplication(applicationId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading' && !activeApplication) {
    return <Loading text="Loading application details" />;
  }

  return (
    <div className="d-flex justify-content-center mt-2 mt-md-5">
      <div className="card shadow border-0">
        <div className="card-body p-5">
          <h1>{mode === 'create' ? 'Create' : 'Update'} Application</h1>
          <Form
            initialValues={activeApplication || {}}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, submitting }) => (
              <form
                className="max-w-450 min-w-sm-330 min-w-unset"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="id"
                    label="ID"
                    placeholder="ID"
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="name"
                    label="Name"
                    placeholder="Name"
                    type="text"
                  />
                </div>
                <div className="mb-3 position-relative">
                  <FormField
                    rules={['required']}
                    name="secret"
                    label="Secret"
                    placeholder="Secret"
                    type="password"
                    showPasswordToggler={true}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="lang"
                    label="Lang"
                    placeholder="Lang"
                    type="text"
                  />
                  <div
                    className="my-1 d-flex align-items-center fs-7"
                  >
                    <i className="bi bi-info-circle me-2 text-info"></i>
                    <span className="">You can add multiple items separated by comma</span>
                  </div>
                </div>
                <div className="mb-3">
                  <FormField
                    rules={['required']}
                    name="version"
                    label="Version"
                    placeholder="Version"
                    type="text"
                  />
                </div>
                <FetchButton
                  type="submit"
                  loading={submitting}
                  className="w-100"
                >
                  {mode === 'create' ? 'Create' : 'Update'}
                </FetchButton>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
