import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Box position="sticky" top={0}>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/">Applications</Link>
          <Link to="/about">About</Link>
          <Link to="/users">Users</Link>
          <Link to="/app">App</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
