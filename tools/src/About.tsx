import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function About() {
  return (
 <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Button href="/" variant="contained">

                Back

        </Button>
        <Typography variant="h1" color="primary">
            This is the about page.
        </Typography>
      </Container>
    </React.Fragment>
  );
}