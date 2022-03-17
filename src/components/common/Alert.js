import React,{useState} from 'react'
import { Box, Fade, Modal, Typography,Backdrop, Button  } from "@mui/material";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const Alert=(props)=> {
    console.log(props);
    // const [open, setOpen] = React.useState(props.open);
  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={props.open}
     onClose={()=>props.removeModal()}
  >
    <Fade in={props.open}>
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
         {props.title}
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
         {props.type}
        </Typography>
        <Button variant='contained' onClick={()=>props.removeModal()}>Close</Button>
      </Box>
    </Fade>
    </Modal>
  );
}

export default Alert;
