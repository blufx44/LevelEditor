import React, { useState, useEffect } from 'react';
import './App.css';
import {Paper, Tooltip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DetailsIcon from '@material-ui/icons/Details';
import { lcolors } from './colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 16,
    width: 16,
  },
}));

export default function Tile(props) {
  const classes = useStyles();
  const [billboard, setBillboard] = useState('');
  const [tile, setTile] = useState();

  useEffect(() => {
    if (props.tileValue !== tile) {
      setTile(props.tileValue);
    }
    if (props.billboardValue !== billboard) {
      setBillboard(props.billboardValue);
    }
  }, [props.tileValue, props.billboardValue])

  const updateLevel = function() {
    if (props.layer === 'tile') {
      setTile(props.tile);
      props.update(props.tile);
    }
    else {
      setBillboard(props.billboard);
      props.update(props.billboard);
    }
  }

  const hover = function(e) {
    if (e.buttons !== 0) {
      updateLevel();
    }
  }

  return (
    <Tooltip title={'X- ' + props.x + ' : Y- ' + props.y + ' : Tile- ' + tile + ' : Billboard-' + billboard}>
      <Paper square className={classes.paper} style={{backgroundColor: lcolors[tile]}} 
        onDragStart={(e) => {e.preventDefault()}} onClick={() => updateLevel()} 
        onMouseEnter={(e) => hover(e)} onMouseDown={() => updateLevel()}>
        {billboard !== '' &&
          <DetailsIcon style={{display: 'block', fontSize: 'medium'}}/>
        }
      </Paper>
    </Tooltip>
  );
}