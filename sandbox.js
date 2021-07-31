import React from 'react';
import People from './People';
import Grid from 'react-grid';
const Row = Grid.Row;
const Col = Grid.Col;

export default function PeopleList({ data }) {
  return (
    <>
      <p>List of all people</p>
      <Container fluid = {true}>
        
      </Container>
      {
        data.map((people, index) => {
          return <People data= { people } key= {people.name}></People>
        })
      }
    </>
  )
}
