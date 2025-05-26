import * as React from 'react';
import Button from '@mui/material/Button';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';

export default function About() {
  return (
 <React.Fragment>
        <DialogTitle id="responsive-dialog-title">{"Circles"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          A simple 2D game library for JavaScript to teach my kids programming.   
          A demo space game implemented using the library.
        
          <br></br>
          
          <Link component="button" variant="body2"
          onClick={() => window.open('https://github.com/nickzinn/circles')} >
            Github Repository
          </Link>
          <br></br><br></br>
          <Link variant="body2">
          nickzinn@gmail.com
          </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button href="/"  color="primary" autoFocus>
            <b>CLOSE</b>
          </Button>
        </DialogActions>
    </React.Fragment>
  );
}