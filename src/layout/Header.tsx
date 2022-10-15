import { Link, NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout, selectAuth } from 'reducers/auth/authSlice';

const Header: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <header className="px-3 py-2 mb-3 border-bottom sticky-top bg-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-start">
          <Link
            to="/"
            className="d-flex align-items-center text-dark text-decoration-none me-3"
          >
            <i className="bi bi-bootstrap-fill fs-1"></i>
          </Link>

          <ul className="nav col-auto me-auto justify-content-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-2 link-secondary ${isActive && 'fw-semibold'}`
                }
                end
              >
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/application/create"
                className={({ isActive }) =>
                  `nav-link px-2 link-secondary ${isActive && 'fw-semibold'}`
                }
                end
              >
                Create Application
              </NavLink>
            </li>
          </ul>

          <Dropdown align="end">
            <Dropdown.Toggle
              variant="light"
              className="text-decoration-none dropdown-toggle"
              id="dropdown-user"
            >
              <img
                src="https://avatars.githubusercontent.com/u/58259532?v=4"
                alt="didactic-goggles"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <span className='d-none d-md-inline'>{user.username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>Menu Item</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <i className="bi bi-box-arrow-left text-danger me-2"></i>
                <span className="">Logout</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
