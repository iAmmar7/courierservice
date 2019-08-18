import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple, red, cyan, teal, green, brown } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  redAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: red[500],
  },
  cyanAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: cyan[500],
  },
  tealAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: teal[500],
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  brownAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: brown[500],
  }
});

function LetterAvatars(props) {
  const classes = useStyles();

  let tempObj = {
    'orangeAvatar': classes.orangeAvatar,
    'purpleAvatar': classes.purpleAvatar,
    'redAvatar': classes.redAvatar,
    'cyanAvatar': classes.cyanAvatar,
    'tealAvatar': classes.tealAvatar,
    'greenAvatar': classes.greenAvatar,
    'brownAvatar': classes.brownAvatar,
  };

  let tempArr = [tempObj["orangeAvatar"], tempObj["purpleAvatar"], tempObj["redAvatar"], tempObj["cyanAvatar"], tempObj["tealAvatar"], tempObj["greenAvatar"], tempObj["brownAvatar"]];

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={tempArr[Math.floor(Math.random() * 7)]}>{props.name}</Avatar>
    </Grid>
  );
}

export default LetterAvatars;