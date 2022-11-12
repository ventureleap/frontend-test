import React from 'react';
import {
  BrowserRouter as Router,
  Routes as ReactRouter,
  Route,
  Link,
} from 'react-router-dom';
import App from './App';
import Header from './components/Header';

export default function Routes() {
  return (
    <>
      <Header />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/app">App</Link>
              </li>
            </ul>
          </nav>

          <ReactRouter>
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/app" element={<App />} />
            <Route path="/" element={<Home />} />
          </ReactRouter>
        </div>
      </Router>
    </>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
