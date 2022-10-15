import { useState } from 'react';
import { Field } from 'react-final-form';

const required = (value: string) => (value ? undefined : 'Required');
const email = (value: string) =>
  new RegExp(/^\S+@\S+\.\S+$/).test(value) ? undefined : 'Invalid Email';
const validations = {
  required,
  email
};
const composeValidators =
  (...validatorArr: any) =>
  (value: any) =>
    validatorArr.map((validator: any) => validator(value), undefined);

interface IProps {
  name: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
  rules?: Array<keyof typeof validations> | null;
  showPasswordToggler?: boolean;
}

const FormField: React.FC<IProps> = ({
  name,
  placeholder,
  label,
  type = 'text',
  rules = 'required',
  showPasswordToggler = false
}) => {
  const [showInputValue, setShowInputValue] = useState(showPasswordToggler);
  const validationsFuncs = Array.isArray(rules)
    ? composeValidators(...rules.map((r) => validations[r]))
    : undefined;
  const inputTypeValue = showPasswordToggler
    ? showInputValue
      ? type
      : 'text'
    : type;
  return (
    <>
      <Field name={name} validate={validationsFuncs}>
        {({ input, meta }) => (
          <>
            <label className="form-label">{label}</label>
            <input
              {...input}
              type={inputTypeValue}
              placeholder={placeholder}
              className="form-control"
            />
            {meta.error &&
              meta.touched &&
              meta.error
                .filter((e: any) => !!e)
                .map((error: any, index: number) => (
                  <div
                    className="text-danger my-1 d-flex align-items-center fs-7"
                    key={index}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    <span className="">{error}</span>
                  </div>
                ))}
          </>
        )}
      </Field>
      {showPasswordToggler && (
        <button
          className="btn password-toggler"
          type="button"
          onClick={() => setShowInputValue(!showInputValue)}
        >
          <i
            className={`bi bi-eye-${showInputValue ? 'slash-fill' : 'fill'}`}
          ></i>
        </button>
      )}
    </>
  );
};

export default FormField;
