import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import People from './People';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function PeopleList(data) {
  const classes = useStyles();

  return (
    <>
      <p>List of all people</p>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2}>
          {
            data.data.map((people, index) => {
              return <People data= { people } index = { index } key= { index }></People>
            })          
          }
          </Grid>
        </Grid>
      </div>
    </>
  );
}