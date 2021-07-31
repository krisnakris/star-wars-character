import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

export default function PeopleDetail() {
  const [peopleDetail, setPeopleDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [listFilms, setListFilms] = useState([]);
  const [listStarships, setListStartships] = useState([]);
  const [listVehicles, setListVehicles] = useState([]);
  
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
      axios('https://swapi.dev/api/people/' + params.id)
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
          <p> Name: {peopleDetail.name}</p>
          <p> Height: {peopleDetail.height} cm</p>
          <ol> List Movie
          {
            listFilms.map((film) => {
              return <li key= {film.title}> {film.title} </li>
            })
          }
          </ol>
          <ol> List Kendaraan
          {
            listVehicles.map((vehicles) => {
              return <li key= {vehicles.name}> {vehicles.name} </li>
            })
          }
          </ol>
          <ol> List Pesawat
          {
            listStarships.map((spaceShip) => {
              return <li key= {spaceShip.name}> {spaceShip.name} </li>
            })
          }
          </ol>
        </>
      )
    }
    </>
  )
}
