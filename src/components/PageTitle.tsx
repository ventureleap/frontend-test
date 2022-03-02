import React, { useEffect, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const PageTitle: React.FC = () => {
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
            <h1 className="container__page-title">{title}</h1>
        </div>
    );
};
export default PageTitle;
