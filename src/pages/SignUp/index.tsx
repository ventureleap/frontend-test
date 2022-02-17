import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Tooltip, Result, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../components/ReduxForm/formInput';
import ContentWrapper from '../../components/Layout/contentWrapper';
import { authService } from '../../services';
import { RegisterModel } from '../../models';
import { SubmissionError } from 'redux-form';
import Swal from 'sweetalert2';

const FirstNameField = FormInput(Input);
const LastNameField = FormInput(Input);
const EmailField = FormInput(Input);
const PasswordField = FormInput(Input);

const SignUp = (props: any) => {
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const sleep = (ms: any) => new Promise((resolve: any) => setTimeout(resolve, ms));  
    const { pristine, reset, submitting } = props;

    const checkSubmit = async () => {
        return sleep(1000) // simulate server latency
            .then(() => {
                if (firstName === '' || secondName === '' || email === '' || password === '') {
                    setErrorMessage('Please check all required fields!');
                    throw new SubmissionError({ firstName: 'User does not exist', _error: 'Login failed!' });
                } else {
                    setErrorMessage('');
                    submit();
                }
            });
    };

    const submit = async () => {
        try {
            const api = new authService();
            const model: RegisterModel = {
                firstName: firstName,
                lastName: secondName,
                email: email,
                password: password,
            };
            const result: any = await api.register(model);
            if (result.status == 200) {
                Swal.fire({
                    title: 'Successful!',
                    text: 'The user has been successfully created.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
                window.open('/login', '_self');
            } else if (result.error) {
                Swal.fire({
                    title: 'Attention!',
                    text: result.error.message,
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                Swal.fire({
                    title: 'Attention!',
                    text: 'User may have registered before, please check. ',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Attention!',
                text: 'A system error has occurred. Please try again later ',
                icon: 'info',
                showConfirmButton: false,
                timer: 2500
            });
        }
    };

    return (
        <ContentWrapper>
            <Result status="info" title="Sign up!" subTitle="Please create account!" />
            <Form className="form" layout="vertical">
                <Row>
                    <Col span={24}>
                        <Field
                            className="form__input"
                            label="First Name*"
                            suffix={
                                <Tooltip title="First name">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="firstName"
                            component={FirstNameField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setFirstName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            className="form__input"
                            label="Last Name*"
                            suffix={
                                <Tooltip title="Last name">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="lastName"
                            component={LastNameField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setSecondName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            className="form__input"
                            label="E-mail*"
                            suffix={
                                <Tooltip title="E-mail address">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="email"
                            component={EmailField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setEmail(e.target.value)}
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
                <Button type="primary" htmlType="button" onClick={reset}  className='form__reset-button' >
                    Reset
                </Button>
                <Button
                    className='form__submit-button' 
                    disabled={pristine || submitting}
                    type="primary"
                    danger
                    htmlType="submit"
                    onClick={checkSubmit}
                >
                    Submit
                </Button>
            </Form>
        </ContentWrapper>
    );
};

export default reduxForm({ form: 'signup' })(SignUp);
