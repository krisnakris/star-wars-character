import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { Container, CircularProgress } from '@material-ui/core';
import PeopleList from './components/PeopleList.jsx';
import PeopleDetail from './components/PeopleDetail';

function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      fetch('https://swapi.dev/api/people/')
        .then(res => res.json())
        .then(res => {
          setPeople(res.results);
          setLoading(false);
        })
    }
    fetchPeople();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Container>
          {
            loading ? (
              <CircularProgress></CircularProgress>
            ) : (
              <Switch>
                <Route exact path='/'>
                  <PeopleList data = { people }></PeopleList>
                </Route>
                <Route path='/detail/:id'>
                  <PeopleDetail></PeopleDetail>
                </Route>
              </Switch>
            )
          }
          
        </Container>
      </Router> 
    </div>
  );
}

export default App;
