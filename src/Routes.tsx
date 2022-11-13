import {
  BrowserRouter as Router,
  Routes as ReactRouter,
  Route,
  Link,
} from 'react-router-dom';
import Header from './components/Header';
import { Applications } from './routes/Applications';
import { Login } from './routes/Login';
import { Signup } from './routes/Signup';

export default function Routes() {
  return (
    <>
      <Router>
        <Header />

        <ReactRouter>
          <Route path="/users" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Applications />} />

          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/app" element={<App />} /> */}
        </ReactRouter>
      </Router>
    </>
  );
}
