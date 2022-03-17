import { Backdrop, Box, Button, ButtonGroup, CircularProgress, Grid, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Alert from "../common/Alert";
const itemsFromBackend = [
  { id: "1", jobName: 'Full-Stack Developer', description: "Hiring Full Stack Developer With 3+ years Experience", Salary: '4-7LPA' },
  { id: "2", jobName: 'DotNet Developer', description: "Opening for DotNet Developer With 0 to 2 years Experience", Salary: '2-4LPA' },
  { id: "3", jobName: 'Angular Developer', description: "Angular Developer With 8+ years Experience", Salary: '3-5LPA' },
  { id: "4", jobName: 'HR Specialist', description: "Hiring HR Specialist With 3+ years Experience", Salary: '2-7LPA' },
  { id: "5", jobName: 'PHP Developer', description: "Hiring PHP Developer With 5+ years Experience", Salary: '5-7LPA' },
  { id: "6", jobName: 'Automation Tester', description: "Hiring Automation Tester With  Min 1+ years Experience", Salary: '2-3LPA' },
];

const columnsFromBackend = [
  {
    id: "1",
    name: "Opening Positions",
    items: itemsFromBackend
  },
  {
    id: "2",
    name: "In Progress",
    items: []
  },
  {
    id: "3",
    name: "Shortlisted for Final HR",
    items: []
  },
  {
    id: "4",
    name: "Offer Released",
    items: []
  }
];



function Worklist() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loaderStatus, setLoader] = useState(false)
  const [openModal,setOpenModal]=useState('')
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      console.log("False")
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };
  const handleLeftButtonEvents = (e) => {
    let buttonKey = e.target.name
    if (buttonKey === 'one') {

    } else if (buttonKey === 'two') {

    } else if (buttonKey === 'three') {

    } else if (buttonKey === 'four') {
      setLoader(true)
      setTimeout(() => {
        setLoader(false)
      }, 3000);
    }

  }
  // const handleRightButtonEvents = (e) => {
  //   let buttonKey = e.target.name
  // setOpenModal(buttonKey)

  // }

  const closeModal = () => {
setOpenModal('')
  }
  const handleIconClick = (value) => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000);
  }
  useEffect(()=>{
console.log(openModal);
  },[openModal])
  return (
    <div>
      {openModal!=''&&openModal==='newopeniing'?
      <Alert open={true} removeModal={closeModal} title={"New job openings go here"} type={"Add some fileds to manage new job opening"}/>:
      openModal!=''&&openModal==='newmember'?
      <Alert open={true} removeModal={closeModal} title={"New member creation go here"} type={"Add some fields to manage new users"}/>:
      openModal!=''&&openModal==='viewmember'?<Alert open={true} removeModal={closeModal} title={"Availablle members"} type={"You I'll get available member details here."}/>:
      ''}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderStatus}
        onClick={() => setLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container >
        <Grid item xs={12} sm={12} md={4} lg={4} sx={{ p: 2, display: 'flex', justifyContent: "start", ml: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup color="secondary" aria-label="medium secondary button group" onClick={(e) => handleLeftButtonEvents(e)}>
              <Button name="one">All</Button>
              <Button name="two">New Openings</Button>
              <Button name="three"
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>Custom<FilterAltIcon /></Button>
              <Button name="four"><AutorenewIcon value='four' onClick={(e) => handleIconClick('four')} /></Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} sx={{ p: 2, display: 'flex', justifyContent: "end", ml: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '& > *': {
                m: 1,
              },
            }}
          >
            <ButtonGroup color="secondary" aria-label="medium secondary button group" onClick={(e) => setOpenModal(e.target.name)}>
              <Button name="newopeniing">Create New Opening</Button>
              <Button name="newmember">Add New Member</Button>
              <Button name="viewmember">View Members</Button>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
      <div style={{ display: "flex", justifyContent: "space-around", height: "100%", }}>

        <DragDropContext
          onDragEnd={result => onDragEnd(result)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: 'white',
                  background: " linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                  width: '300px',
                  maxHeight: 700,
                  overflow: 'auto'
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 5 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",

                                        ...provided.draggableProps.style
                                      }}
                                    >

                                      <Typography variant="h6"> {item.jobName}</Typography>
                                      <Typography variant="p"> {item.description}</Typography>
                                      <Typography variant="p"> {"Salary: " + item.Salary}</Typography>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Last Week</MenuItem>
        <MenuItem onClick={handleClose}>Last Month</MenuItem>
      </Menu>
    </div>
  );
}

export default Worklist;
