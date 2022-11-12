import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Header() {
  return (
    <Box position="sticky" top={0}>
      <AppBar position="relative">
        <Toolbar>
          <Button color="inherit">Applications</Button>
          <Button color="inherit">Create</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
