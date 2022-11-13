import {
  BrowserRouter as Router,
  Routes as ReactRouter,
  Route,
} from 'react-router-dom';
import Header from './components/Header';
import { Applications } from './routes/Applications';
import { CreateApplication } from './routes/CreateApplication';
import { Login } from './routes/Login';
import { Signup } from './routes/Signup';

export default function Routes() {
  return (
    <Router>
      <Header />

      <ReactRouter>
        <Route path="/users" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateApplication />} />
        <Route path="/applications" element={<Applications />} />
      </ReactRouter>
    </Router>
  );
}
