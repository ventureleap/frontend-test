import { useAppDispatch, useAppSelector } from '../app/hooks';
import LoginUserForm from '../features/user/LoginUserForm';
import { loginAsync, selectLoginStatus } from '../features/user/userSlice';
import { Login as LoginType } from '../types';

export function Login() {
  const dispatch = useAppDispatch();
  const signUpStatus = useAppSelector(selectLoginStatus);

  return (
    <>
      <LoginUserForm
        onSubmit={(e: LoginType) => {
          dispatch(loginAsync(e));
        }}
      />
      {signUpStatus === 'idle' ? '' : signUpStatus}
    </>
  );
}
