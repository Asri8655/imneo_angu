import { Alert, Backdrop, Box, Button, ButtonGroup, CircularProgress, Grid, Menu, MenuItem, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PrimarySearchAppBar from "../navlayout";
import { useAuth0 } from '@auth0/auth0-react';
import { isMobile } from 'react-device-detect';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Creation from "../common/Creation";
import Typist from 'react-typist';
const itemsFromBackend = [{ id: "1", ei: <EditIcon />, di: <DeleteIcon />, jobName: 'Full-Stack Developer', description: "Hiring Full Stack Developer With 3+ years Experience", Salary: '4-7LPA' }, { id: "2", ei: <EditIcon />, di: <DeleteIcon />, jobName: 'DotNet Developer', description: "Opening for DotNet Developer With 0 to 2 years Experience", Salary: '2-4LPA' }, { id: "3", ei: <EditIcon />, di: <DeleteIcon />, jobName: 'Angular Developer', description: "Angular Developer With 8+ years Experience", Salary: '3-5LPA' }, { id: "4", ei: <EditIcon />, di: <DeleteIcon />, jobName: 'HR Specialist', description: "Hiring HR Specialist With 3+ years Experience", Salary: '2-7LPA' }, { id: "5", ei: <EditIcon />, di: <DeleteIcon />, jobName: 'PHP Developer', description: "Hiring PHP Developer With 5+ years Experience", Salary: '5-7LPA' }, { id: "6", ei: <EditIcon />, di: <DeleteIcon />, jobName: 'Automation Tester', description: "Hiring Automation Tester With  Min 1+ years Experience", Salary: '2-3LPA' },];

const columnsFromBackend = [
  { id: "1", name: "Opening Positions", items: itemsFromBackend }, { id: "2", name: "In Progress", items: [] }, { id: "3", name: "Shortlisted for Final HR", items: [] }, { id: "4", name: "Offer Released", items: [] }];

function Worklist() {

  const [columns, setColumns] = useState(columnsFromBackend);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loaderStatus, setLoader] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalDatas, setModalDatas] = useState({ title: '', message: '', type: '' })
  const [createError, setError] = useState(false);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const { isLoading, isAuthenticated, error, loginWithRedirect, } = useAuth0();
  if (isMobile) {
    return <div> This content is unavailable on mobile/ Use Desktopsite</div>
  }
  if (isLoading) { return <div>Loading...</div>; }
  if (error) { return <div>Oops... {error.message}</div>; }
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId], destColumn = columns[destination.droppableId], sourceItems = [...sourceColumn.items], destItems = [...destColumn.items], [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: { ...sourceColumn, items: sourceItems }, [destination.droppableId]: { ...destColumn, items: destItems } });
    } else {
      const column = columns[source.droppableId], copiedItems = [...column.items], [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: { ...column, items: copiedItems } });
    }
  };

  const handleLeftButtonEvents = (e) => {
    if (e.target.name === 'one') {
      alert("AllData is selected")
    } else if (e.target.name === 'two') {
      alert("New openings selected")
    } else if (e.target.name === 'four') {
      setLoader(true)
      setTimeout(() => { setLoader(false) }, 3000);
    }
  }
  const handleRightButtonEvents = (e) => {
    if (e.target.name === 'newopening') {
      modalDatas.title = "Create new job"; modalDatas.type = 'job'; modalDatas.message = "Add some fileds to manage new job opening"; setOpenModal(true);
    } else if (e.target.name === 'newmember') {
      modalDatas.title = "Create new member"; modalDatas.type = 'member'; modalDatas.message = "Add some fields to manage new users"; setOpenModal(true);
    } else if (e.target.name === 'viewmember') {
      setModalDatas({ title: "Available members", type: 'list', message: "You I'll get available member details here." })
      setOpenModal(true);
    }
  }
  const closeModal = () => { setOpenModal(false) }
  const handleIconClick = (value) => {
    setLoader(true)
    setTimeout(() => { setLoader(false) }, 3000);
  }
  const createFunc = (createType, values) => {
    if (createType === 'job') {
      columns[0].items.splice(0, 0, values)
      setOpenModal(false)
      setError(true)
    }
  }
  if (isAuthenticated) {
    return (
      <div>
        <PrimarySearchAppBar />
        <Snackbar open={createError}   autoHideDuration={6000} onClose={() => setError(false)}  message={' New Job Created'}  >
          <Alert onClose={() => setError(false)}  severity={'success'}  sx={{ width: '100%' }} >  New Job Created </Alert>
        </Snackbar>
        <Creation open={openModal} removeModal={closeModal} title={modalDatas.title} type={modalDatas.type} createFunc={createFunc} joblen={itemsFromBackend.length} />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loaderStatus} onClick={() => setLoader(false)}><CircularProgress color="inherit" /></Backdrop>
        <Grid container >
          <Grid item xs={12} sm={12} md={4} lg={4} sx={{ p: 2, display: 'flex', justifyContent: "start", }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { m: 1, }, }}>
              <ButtonGroup color="secondary" aria-label="medium secondary button group" onClick={(e) => handleLeftButtonEvents(e)}>
                <Button name="one">All</Button><Button name="two">New Openings</Button>
                <Button name="three" id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>Custom<FilterAltIcon /></Button>
                <Button name="four"><AutorenewIcon value='four' onClick={(e) => handleIconClick('four')} /></Button></ButtonGroup></Box></Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} sx={{ p: 2, display: 'flex', justifyContent: "end", }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '& > *': { m: 1, }, }}>
              <ButtonGroup color="secondary" aria-label="medium secondary button group" onClick={(e) => handleRightButtonEvents(e)}>
                <Button name="newopening">Create New Opening</Button><Button name="newmember">Add New Member</Button><Button name="viewmember">View Members</Button></ButtonGroup></Box></Grid></Grid>
        <div style={{ display: "flex", justifyContent: "space-around", height: "100%", }}>
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: 'white', background: " linear-gradient(to right, #0f2027, #203a43, #2c5364)", width: '300px', maxHeight: 700, overflow: 'auto' }} key={columnId}>
                  <h2>{column.name}</h2>
                  <div style={{ margin: 5 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ background: snapshot.isDraggingOver ? "lightblue" : "lightgrey", padding: 4, width: 250, minHeight: 500, }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ userSelect: "none", padding: 16, margin: "0 0 8px 0", minHeight: "50px", backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86", ...provided.draggableProps.style }}
                                      > <Typography variant="h6"> {item.jobName}</Typography><Typography variant="p"> {item.description}</Typography><Typography variant="p"> {"Salary: " + item.Salary}</Typography> <br /><div style={{ cursor: 'pointer' }}>{item.ei}{item.di}</div> </div>);  }}</Draggable>); })}{provided.placeholder}</div>);   }}</Droppable></div></div>);  })}</DragDropContext></div>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
          <MenuItem onClick={handleClose}>Last Week</MenuItem><MenuItem onClick={handleClose}>Last Month</MenuItem></Menu> </div>)
  } else {
    return <Grid container spacing={0}  direction="column"  alignItems="center"  justifyContent="center"  sx={{ minHeight: '100vh', background: " linear-gradient(to bottom, #800080, #ffc0cb)" }}  >
      <Grid item xs={12}><Typist cursor={{ show: false }}>  <Typography variant='h3' sx={{ color: 'white' }}>Welcome to Hiring.com</Typography> </Typist></Grid>
      <Grid item xs={3} sx={{ mt: 3 }}><Button variant='contained' sx={{ color: 'black', backgroundColor: 'white', }} onClick={loginWithRedirect} style={{ top: '50%', }}>Log in</Button></Grid></Grid>;
  };
}
export default Worklist;