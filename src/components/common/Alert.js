import React from 'react'
import { Box, Fade, Modal,   } from "@mui/material";
import Createjob from './Createjob';
const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,};
const Commonalert=(props)=> {
  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={props.open} onClose={()=>props.removeModal()}><Fade in={props.open}><Box sx={style}>{props.type==='job'?<Createjob type={props.type} createFunc={props.createFunc} joblen={props.joblen} removeModal={props.removeModal}/>:''}</Box></Fade></Modal>);}
export default Commonalert;
