import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AlertDialogSlide(props) {
  const {
    onProceed,
  } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const proceed = () => {
    onProceed();
    setOpen(false);
  };

  return (
    <div>
      <Button
        autoFocus
        color="inherit"
        onClick={handleClickOpen}
      >
        Create Dispute
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Are you sure you want to open a dispute for this trade?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Opening a dispute is inreversable, after opening a dispute a moderator will intervene to settle the dispute.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            discard
          </Button>
          <Button onClick={proceed} color="primary">
            proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
