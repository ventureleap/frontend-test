import { combineReducers } from 'redux';
import authReducer from './auth';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
