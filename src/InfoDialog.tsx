import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Link } from '@material-ui/core';
import { Info } from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
infoButton: {
    marginRight: theme.spacing(1),
  },
})
);

export default function InfoDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton edge="start" className={classes.infoButton} onClick={handleClickOpen} color="primary" aria-label="menu">
        <Info />
      </IconButton>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Cicles"}</DialogTitle>
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
          <Button onClick={handleClose} color="primary" autoFocus>
            <b>CLOSE</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}