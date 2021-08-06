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
    display: 'block'
  },
}));

export default function Tile(props) {
  const classes = useStyles();
  const [billboard, setBillboard] = useState('');
  const [tile, setTile] = useState(0);

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
    <Tooltip title={
      'X- ' + props.x + 
      ' : Y- ' + props.y + 
      ' : Tile- ' + tile + (props.textures.length === 0 ? '' : '-' + props.textures[tile].name) + 
      ' : Billboard-' + billboard}>
      {(props.textures.length === 0) ?
        <Paper square className={classes.paper} style={{backgroundColor: lcolors[tile]}} 
          onDragStart={(e) => {e.preventDefault()}} onClick={() => updateLevel()} 
          onMouseEnter={(e) => hover(e)} onMouseDown={() => updateLevel()}>
          {billboard !== '' &&
            <DetailsIcon style={{display: 'block', fontSize: 'medium'}}/>
          }
        </Paper> : 
        <Paper square className={classes.paper} 
          onDragStart={(e) => {e.preventDefault()}} onClick={() => updateLevel()} 
          onMouseEnter={(e) => hover(e)} onMouseDown={() => updateLevel()}>
          { (tile >= 0) &&
            <img alt="" src={props.textures[tile].image.src} style={{width: 16, height: 16, display: "block", position: "absolute"}}/> 
          }
          {billboard !== '' &&
            <DetailsIcon style={{display: 'block', fontSize: 'medium', position: "absolute"}}/>
          }
        </Paper>
      }
    </Tooltip>
  );
}