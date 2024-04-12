import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ChecklistIcon from '@mui/icons-material/Checklist';

export default function Navbar() {
  return (
    <AppBar position='static' sx={{ backgroundColor: '#0a70ff' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <ChecklistIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Lista de tarefas
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
          <ChecklistIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            TO DO LIST
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
