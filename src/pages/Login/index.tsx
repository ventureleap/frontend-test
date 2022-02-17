import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Tooltip, Result, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../components/ReduxForm/formInput';
import ContentWrapper from '../../components/Layout/contentWrapper';
import { login } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { Link, Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

const NameField = FormInput(Input);
const PasswordField = FormInput(Input);
const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const sleep = (ms: any) => new Promise((resolve: any) => setTimeout(resolve, ms));  

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }


    const signIn = async () => {
        await login({ username: name, password: password });
        dispatch(login({ username: name, password: password }));
        if (await isAuthenticated) {
            message.success('Login Success', 2);
        }
    };

    const checkSubmit = async () => {
        return sleep(1000) // simulate server latency
        .then(() => {
            if (name === '' || password === '') {
                setErrorMessage('Please check all required fields!');
                throw new SubmissionError({ firstName: 'User does not exist', _error: 'Login failed!' });
            } else {
                setErrorMessage('');
                signIn();
            }
        });
    };

    return (
        <ContentWrapper>
            <Result status="info" title="Please log in" subTitle="Please enter your username and password" />
            <Form className='form' name="nest-messages" layout="vertical">
                <Row>
                    <Col span={24}>
                        <Field
                            className="form__input"
                            label="Username*"
                            suffix={
                                <Tooltip title="Tooltip area">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="username"
                            component={NameField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Field
                            className="form__input"
                            label="Password*"
                            suffix={
                                <Tooltip title="Enter password">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="password"
                            type="password"
                            component={PasswordField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <p className='form__error-message'>{errorMessage}</p>
                </Row>
                <Button className='form__login-button' type="primary" htmlType="button" loading={loading} onClick={() => checkSubmit()}>
                    Login
                </Button>
                <Row>
                    <Link type="dark" to="sign-up" className='form__sign-up-text'>
                        You don&apos;t have an account? <b>Sign Up!</b>
                    </Link>
                </Row>
            </Form>
        </ContentWrapper>
    );
};

export default reduxForm({ form: 'login' })(LoginPage);
