import { CircularProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Movie from './Movie';
import Vehicle from './Vehicle';
import Spaceships from './Spaceships';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PeopleDetail({ page }) {
  const [peopleDetail, setPeopleDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [listFilms, setListFilms] = useState([]);
  const [listStarships, setListStartships] = useState([]);
  const [listVehicles, setListVehicles] = useState([]);
  const classes = useStyles();
  const params = useParams();

  async function fetchFilms (res) {
    let listMovie = [];
    await Promise.all(
      res.films.map(async (movie) => {
        try {
          let getMovie = await axios.get(movie);
          listMovie.push(getMovie.data);
        } catch (error) {
          console.log(error);
        }
      })
    )
    return listMovie;
  }

  async function fetchVehicles (res) {
    let listKendaraan = [];
    await Promise.all(
      res.vehicles.map(async (kendaraan) => {
        try {
          let getKendaraan = await axios.get(kendaraan);
          listKendaraan.push(getKendaraan.data);
        } catch (error) {
          console.log(error);
        }
      })
    )
    return listKendaraan;
  }

  async function fetchStarShips (res) {
    let listPesawat = [];
    await Promise.all(
      res.starships.map(async (pesawat) => {
        try {
          let getPesawat = await axios.get(pesawat);
          listPesawat.push(getPesawat.data);
        } catch (error) {
          console.log(error);
        }
      })
    )
    return listPesawat;
  }

  useEffect(() => {
    function fetchPeopleDetail() {
      axios('https://swapi.dev/api/people/' + (params.id) )
        .then(res => {
          Promise.all([fetchFilms(res.data), fetchVehicles(res.data), fetchStarShips(res.data)])
          .then(response => {
              setPeopleDetail(res.data);
              setListFilms(response[0]);
              setListVehicles(response[1]);
              setListStartships(response[2]);
              setLoading(false);
            })
            .catch(error => {
              console.log(error);
            })
        });
    };

    fetchPeopleDetail();
  }, []);

  return (
    <>
      { loading ? (
        <CircularProgress></CircularProgress>
      ) : (
        <>
          <p>People Detail</p>
            <Typography variant="h5" component="h2" color="primary">
              { peopleDetail.name}
            </Typography>          
            <Typography className={classes.pos} color="textSecondary">
              Height: { peopleDetail.height } cm
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Weight: { peopleDetail.weight } cm
            </Typography> 
            <Typography className={classes.pos} color="textSecondary">
              Birth Year: { peopleDetail.birth_year } cm
            </Typography>             
          <ol>
            <p>Film List</p>
            <Movie listMovie = { listFilms }></Movie>
          </ol>
          <ol> 
            <p>Vehicle List</p>
            <Vehicle listVehicles = { listVehicles }></Vehicle>
          </ol>
          <ol> 
            <p>Starships List</p>
            <Spaceships listStarships = { listStarships}></Spaceships>
          </ol>
        </>
      )
    }
    </>
  )
}
