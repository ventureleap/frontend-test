import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { Link } from 'react-router-dom';
import { StorageHelper } from '../../utils';

const style = { marginRight: '25%', marginLeft: '25%' };

const PrivateWrapper = ({ children }: { children: any }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [ loggedIn, setLoggedIn ] = useState(isAuthenticated);
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
        <Row gutter={16}>
            <Col span={24}>
                <div style={style}> {
                    loggedIn ? children : 
                        <p className='center-text'>
                            Please <Link to="login">login</Link> or <Link to="sign-up">sign up</Link>!
                        </p>
                    }
                </div>
            </Col>
        </Row>)
}

export default PrivateWrapper;

