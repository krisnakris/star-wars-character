import './App.css';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import { Container } from '@material-ui/core';
import PeopleList from './components/PeopleList.jsx';
import PeopleDetail from './components/PeopleDetail';
import { makeStyles } from '@material-ui/core/styles';

const useStylesPage = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function App() {
  useEffect(() => {
    document.title = 'Star Wars'
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Container>
          {
            <>
            <Switch>
              <Route exact path='/'>
                <PeopleList></PeopleList>
              </Route>
              <Route path='/detail/:id'>
                <PeopleDetail></PeopleDetail>
              </Route>
            </Switch>
          </>
          }
        </Container>
      </Router> 
    </div>
  );
}

export default App;
