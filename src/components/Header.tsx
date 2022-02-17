import React, { useState, FC, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { signOut } from '../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { StorageHelper } from '../utils';

const Header: React.FC = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [loggedIn, setLoggedIn] = useState(isAuthenticated);
    const currentURL = window.location.pathname;
    const [activeKey, setActiveKey] = useState(currentURL);
    const dispatch = useDispatch();

    const logout = async () => {
        await signOut();
        dispatch(signOut());
    };

    useEffect(() => {
        const checkToken = async () => {
            const tokenResult = await StorageHelper.tryGetTokenResult();
            if (tokenResult != null || isAuthenticated) {
                setLoggedIn(true);
            }
        };
        checkToken();
    }, [isAuthenticated]);

    return (
        <Navbar className="sticky-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Venture Leap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav
                        className="navbar navbar-expand navbar-dark bg-dark offset-md-9"
                        activeKey={activeKey}
                        onSelect={(selectedKey) => setActiveKey(selectedKey || '/')}
                    >
                        <Nav.Link eventKey="/" href="/">
                            Home
                        </Nav.Link>
                        {loggedIn && <Nav.Link eventKey="/dashboard" href="/dashboard">
                            Dashboard
                        </Nav.Link>
                        }
                        {loggedIn ? (
                            <Nav.Item className="deactive" onClick={logout}>
                                Logout
                            </Nav.Item>
                        ) : (
                            <Nav.Link eventKey="/login" href="/login">
                                Login
                            </Nav.Link>
                        )}
                        {!loggedIn && (
                            <Nav.Link eventKey="/sign-up" href="/sign-up">
                                Sign Up
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
