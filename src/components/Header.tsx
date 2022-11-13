import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, NavLink } from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';

const navigation = [
  {
    label: 'Users',
    path: '/users',
  },
  {
    label: 'Login',
    path: '/login',
  },
  {
    label: 'Applications',
    path: '/',
  },
  {
    label: 'App',
    path: '/app',
  },
];

export default function Header() {
  return (
    <Box position="sticky" top={0}>
      <AppBar position="relative">
        <Box
          sx={{
            typography: 'body1',
            '& > :not(style) + :not(style)': {
              m: 2,
            },
          }}
        >
          {navigation.map((item, i) => (
            <NavLink
              style={({ isActive }) => ({
                textDecoration: isActive ? 'underline' : 'none',
              })}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </Box>
      </AppBar>
    </Box>
  );
}
