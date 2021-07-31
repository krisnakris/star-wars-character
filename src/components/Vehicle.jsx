import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Vehicle({ listVehicles }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Manufacturer</TableCell>
            <TableCell align="right">Cost in Credits</TableCell>
            <TableCell align="right">Crew</TableCell>
            <TableCell align="right">Passengers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listVehicles.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.manufacturer}</TableCell>
              <TableCell align="right">{row.cost_in_credits}</TableCell>
              <TableCell align="right">{row.crew}</TableCell>
              <TableCell align="right">{row.passengers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
