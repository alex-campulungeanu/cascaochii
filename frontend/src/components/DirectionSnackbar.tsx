import React, {useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/lab/Alert';

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
});

// function TransitionLeft(props) {
//   return <Slide {...props} direction="left" />;
// }

// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }

// function TransitionRight(props) {
//   return <Slide {...props} direction="right" />;
// }

// function TransitionDown(props) {
//   return <Slide {...props} direction="down" />;
// }

export function DirectionSnackbar(props) {
  const [openSnack, setOpenSnack] = React.useState(false);
  // const [transition, setTransition] = React.useState(() => TransitionRight);

  // const handleClick = (Transition) => () => {
  //   setTransition(() => Transition);
  //   setOpen(true);
  // };

  useEffect(() => {
    setOpenSnack(props.open)
  }, [props.open])

  const handleClose = () => {
    setOpenSnack(false);
  };

  return (
    <div>
      {/* <Button onClick={handleClick(TransitionLeft)}>Right</Button>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Button onClick={handleClick(TransitionRight)}>Left</Button>
      <Button onClick={handleClick(TransitionDown)}>Down</Button> */}
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        // TransitionComponent={transition}
        // message="Product added"
        // key={transition ? transition.name : ''}
      >
        <MuiAlert onClose={handleClose} severity="success">
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}