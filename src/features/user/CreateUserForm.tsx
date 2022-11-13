import { Form, Field } from 'react-final-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Register } from '../../types';

const CreateUserForm = ({ onSubmit }: { onSubmit: (e: Register) => void }) => (
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
            // copypaste x3. Ideally forms should be generalized.
            '& .MuiTextField-root': { m: 2, width: '25ch' },
          }}
          autoComplete="off"
        >
          <Field name="firstName">
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
          <Field name="lastName">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Last Name"
                  required
                />
              </div>
            )}
          </Field>
          <Field name="email">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Email"
                  type="email"
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
            Register
          </Button>
        </Box>
      </div>
    )}
  />
);

export default CreateUserForm;
