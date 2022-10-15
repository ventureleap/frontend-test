import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Application } from 'models/application.model';
import { setActiveApplication } from 'reducers/application/applicationSlice';
import { useAppDispatch } from 'app/hooks';
import './application-item.scss';
import ApplicationDeleteModal from './ApplicationDeleteModal';

interface IProps {
  application: Application;
}

const ApplicationItem: React.FC<IProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { application } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const variants = ['primary', 'secondary', 'success', 'warning', 'info'];

  const handleUpdateButtonClick = () => {
    dispatch(setActiveApplication(application));
    navigate(`/application/update/${application.id}`);
  };

  const handleDeleteButtonClick = () => {
    dispatch(setActiveApplication(application));
    setShowDeleteModal(true);
  };

  const applicationLanguages = () => {
    const appLangs = application.lang.split(',');
    if (appLangs.length === 0) return <div></div>;
    return appLangs.map((appLang, index) => (
      <span
        className={`badge text-bg-${variants[index % variants.length]}`}
        key={appLang}
      >
        {appLang.trim()}
      </span>
    ));
  };

  return (
    <>
      <div className="application-item">
        <div className="application-item-body">
          <h4 className="application-item-title">{application.name}</h4>
          <div className="application-item-languages">
            {applicationLanguages()}
          </div>
          <div className="application-item-version small mt-auto text-muted">
            {application.version}
          </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id={'dropdown-application-' + application.id}
            className="no-caret"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleUpdateButtonClick}>
              <i className="bi bi-pencil-square text-success me-2"></i>
              <span>Update</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteButtonClick}>
              <i className="bi bi-trash text-danger me-2"></i>
              <span>Delete</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Link
          className="application-item-link"
          to={`/application/${application.id}`}
        ></Link> */}
      </div>
      <ApplicationDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default ApplicationItem;
