import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../components/ReduxForm/formInput';
import PrivateWrapper from '../../components/Layout/privateWrapper';
import { ApplicationModel } from '../../models';
import { SubmissionError } from 'redux-form';
import Swal from 'sweetalert2';
import { applicationService } from '../../services';
import { useHistory } from 'react-router-dom';

const IdField = FormInput(Input);
const NameField = FormInput(Input);
const LangField = FormInput(Input);
const VersionField = FormInput(Input);
const UsernameField = FormInput(Input);
const SecretField = FormInput(Input);

const NewApplication = (props: any) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [lang, setLang] = useState('');
    const [version, setVersion] = useState('');
    const [secret, setSecret] = useState('');
    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const sleep = (ms: any) => new Promise((resolve: any) => setTimeout(resolve, ms));
    const { pristine, reset, submitting } = props;

    const checkSubmit = async () => {
        return sleep(1000)
        .then(() => {
            if (id === '' || name === '' || username === '' || lang === '' || version === '' || secret === '') {
                setErrorMessage('Please check all required fields!');
                throw new SubmissionError({ name: 'User does not exist', _error: 'Login failed!' });
            } else {
                setErrorMessage('');
                submit();
            }
        });
    };

    const submit = async () => {
        try {
            const api = new applicationService();
            const model: ApplicationModel = {
                name: name,
                lang: lang,
                version: version,
                username: username,
                id: id,
                secret: secret
               
            };
            const result: any = await api.setApplication(model);
            if (result.status == 200) {
                Swal.fire({
                    title: 'Successful!',
                    text: 'The application has been successfully created. ',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
                history.push("dashboard");
            } 
           else {
                Swal.fire({
                    title: 'Attention!',
                    text: 'The application has been successfully created. There was a problem, please check the information. ',
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
        <PrivateWrapper>
            <Form className='form' layout="vertical">
                <Row>
                    <Col span={24}>
                        <Field
                            label=" ID*"
                            suffix={
                                <Tooltip title="id">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="id"
                            component={IdField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setId(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            label=" Name*"
                            suffix={
                                <Tooltip title=" name">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="name"
                            component={NameField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            label=" Username*"
                            suffix={
                                <Tooltip title="Username">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="username"
                            component={UsernameField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setUsername(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            label=" Lang*"
                            suffix={
                                <Tooltip title="Lang">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="lang"
                            component={LangField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setLang(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            label=" Version*"
                            suffix={
                                <Tooltip title="Version">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            name="version"
                            component={VersionField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setVersion(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Field
                            label=" Secret*"
                            suffix={
                                <Tooltip title="Secret">
                                    <InfoCircleOutlined/>
                                </Tooltip>
                            }
                            type="password"
                            name="secret"
                            component={SecretField}
                            rules={[{ required: true }]}
                            onChange={(e: any) => setSecret(e.target.value)}
                        />
                    </Col>
                </Row>
                
               
                <Row>
                    <p className='form__error-message'>{errorMessage}</p>
                </Row>
                <Button className='form__reset-button' type="primary" htmlType="button" onClick={reset}>
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
        </PrivateWrapper>
    );
};

export default reduxForm({ form: 'newApplication' })(NewApplication);
