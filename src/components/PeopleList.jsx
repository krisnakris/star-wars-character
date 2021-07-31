import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import People from './People';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

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

export default function PeopleList() {
  const classes = useStyles();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  async function fetchPeople(currentPage = 1) {
    fetch('https://swapi.dev/api/people/?page=' + currentPage)
      .then(res => res.json())
      .then(res => {
        setPeople(res.results);
        setMaxPage(Math.floor(res.count / 10) + 1);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchPeople();
  }, []);

  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
    fetchPeople(value);
  };

  return (
    <>
      {
        loading ? (
          <CircularProgress></CircularProgress>
        ) : (
          <>
            <p>List of all people</p>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid container item xs= {12} spacing={2}>
                {
                  people.map((people, index) => {
                    return <People data= { people } page = { page } index = { index } key= { index }></People>
                  })          
                }
                </Grid>
              </Grid>
            </div>
            <div className={classes.root} style= {{ marginTop: '55px'}}>
              <Pagination count={maxPage} 
                color="primary"
                page = {page}
                onChange= {handlePageChange}           
              />
            </div>
          </>
        )
      }
    </>
  );
}