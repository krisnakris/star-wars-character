import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

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

export default function People({ data, index, page }) {
  const classes = useStyles();
  const history = useHistory();

  function detailPeople () {
    let idPeople = Math.floor((page - 1) * 10 + index + 1);
    idPeople = idPeople > 17 ? idPeople + 1 : idPeople;
    history.push('/detail/' + idPeople);
  }

  return (
    <Card className={classes.root} style= {{marginLeft : "25px", marginTop: "25px"}}>
      <CardContent>
        <Typography variant="h5" component="h2" color="primary">
          { data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Height: { data.height } cm
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Weight: { data.mass } kg
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Birth Year: { data.birth_year }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick= {(event) => detailPeople(event)} >Detail</Button>
      </CardActions>
    </Card>
  );
}
