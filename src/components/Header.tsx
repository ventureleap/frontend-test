import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

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
    label: 'Create Application',
    path: '/create',
  },
  {
    label: 'Applications',
    path: '/applications',
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
