import { useAppDispatch } from '../app/hooks';
import CreateUserForm from '../features/user/CreateUserForm';
import { loginAsync, signUpAsync } from '../features/user/userSlice';
import { Register } from '../types';

export function Signup() {
  const dispatch = useAppDispatch();

  return (
    <CreateUserForm
      onSubmit={(e: Register) => {
        dispatch(signUpAsync(e));
      }}
    />
  );
}
