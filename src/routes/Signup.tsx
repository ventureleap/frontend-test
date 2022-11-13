import { useAppDispatch, useAppSelector } from '../app/hooks';
import CreateUserForm from '../features/user/CreateUserForm';
import {
  loginAsync,
  selectSignupStatus,
  signupAsync,
} from '../features/user/userSlice';
import { Register } from '../types';

export function Signup() {
  const dispatch = useAppDispatch();
  const signUpStatus = useAppSelector(selectSignupStatus);

  return (
    <>
      <CreateUserForm
        onSubmit={(e: Register) => {
          dispatch(signupAsync(e));
        }}
      />
      {signUpStatus === 'idle' ? '' : signUpStatus}
    </>
  );
}
