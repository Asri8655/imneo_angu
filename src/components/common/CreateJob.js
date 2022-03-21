
import {  Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { isMobile } from 'react-device-detect';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Createjob(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
     const reqdata= {
        jobName: data.get('jobName'),
        description: data.get('description'),
        Salary: data.get('salary'),
        id: `${props.joblen+1}`,
        ei:<EditIcon/>,
        di:<DeleteIcon/>
      }
      props.createFunc('job',reqdata)
  };
  return (
    <Grid container component="main" sx={!isMobile ? {  pt: 10, pb: 10, width: '100%', } : { height: "100vh" }}>
           <Grid item xs={12} sm={12} md={12} lg={12} display='flex' justifyContent='center' elevation={6} square>
        <Box
          sx={{
            my: 6,
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Grid container component="form"    name='createForm' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ p: 1 }}><Typography variant='h5'>Create New Opening</Typography></Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ p: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="jobName"
                label="Job Title"
                name="jobName"
                autoComplete="off"
                autoFocus
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ p: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="off"
                autoFocus
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ p: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="salary"
                label="Salary"
                name="salary"
                autoComplete="off"
                autoFocus
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ p: 1 }}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ p: 1 }}>
              <Button
                type="reset"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
               onClick={()=>props.removeModal()}
              >
           {`Clear & Close`}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ p: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
