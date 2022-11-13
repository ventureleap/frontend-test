import { Form, Field } from 'react-final-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Login } from '../../types';

const LoginUserForm = ({ onSubmit }: { onSubmit: (e: Login) => void }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, submitting, pristine }) => (
      <div
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 2, width: '25ch' },
          }}
          autoComplete="off"
        >
          <Field name="username">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="First Name"
                  required
                />
              </div>
            )}
          </Field>

          <Field name="password">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Password"
                  type="password"
                  required
                />
              </div>
            )}
          </Field>
          <Button disabled={submitting || pristine} type="submit">
            Login
          </Button>
        </Box>
      </div>
    )}
  />
);

export default LoginUserForm;
