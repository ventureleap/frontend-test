import React from 'react';
import { Form } from 'antd';
import { IProps } from 'models/form.model';

// eslint-disable-next-line react/display-name
export const FormSelect = (Component: any) => ({ meta, input, hasFeedback, label, name, children, rules, placeholder, ...rest  } : IProps ) =>  {
    const hasError = meta.touched && meta.invalid;
        if (input.value === '') {
            input.value = [];
        }
        return (
            <Form.Item
                name={name}
                label={label}
                validateStatus={hasError ? 'error' : 'success'}
                hasFeedback={hasFeedback && hasError}
                help={hasError && meta.error}
                rules={rules}
            >
                <Component {...input} {...rest} placeholder={placeholder}>
                    {children}
                </Component>
            </Form.Item>
        );
    };

