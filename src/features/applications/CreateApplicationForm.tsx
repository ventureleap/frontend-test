import { Form, Field } from 'react-final-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Application } from '../../types';

const CreateApplicationForm = ({
  onSubmit,
}: {
  onSubmit: (e: Application) => void;
}) => (
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
          <Field name="id">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Id"
                  required
                />
              </div>
            )}
          </Field>
          <Field name="name">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Name"
                  required
                />
              </div>
            )}
          </Field>
          <Field name="secret">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Secret"
                  required
                />
              </div>
            )}
          </Field>
          <Field name="lang">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Lang"
                  required
                />
              </div>
            )}
          </Field>
          <Field name="version">
            {(props) => (
              <div>
                <TextField
                  name={props.input.name}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  label="Version"
                  required
                />
              </div>
            )}
          </Field>
          <Button disabled={submitting || pristine} type="submit">
            Create Application
          </Button>
        </Box>
      </div>
    )}
  />
);

export default CreateApplicationForm;
