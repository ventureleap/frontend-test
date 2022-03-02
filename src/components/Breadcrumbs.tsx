import React, { FC, useState, useEffect } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const Breadcrumbs: React.FC = () => {
    let tempTitle = window.location.pathname.toUpperCase().replace('-', ' ').replace('/', '') || '';
    tempTitle = tempTitle === '' ? 'HOME' : tempTitle;
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [title, setTitle] = useState(tempTitle);

    useEffect(() => {
        let tempTitle = window.location.pathname.toUpperCase().replace('-', ' ').replace('/', '') || '';
        tempTitle = tempTitle === '' ? 'HOME' : tempTitle;
        setTitle(tempTitle);
    }, [isAuthenticated, title]);

    return (
        <div className="container">
            <Breadcrumb>
                {title !== 'HOME' && <Breadcrumb.Item href="/">HOME</Breadcrumb.Item>}
                <Breadcrumb.Item active>{title} </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};
export default Breadcrumbs;
