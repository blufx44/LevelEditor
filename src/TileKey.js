import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import {Paper, Tooltip} from '@material-ui/core';
import { lcolors } from './colors';

const useStyles = makeStyles((theme) => ({
  selected: {
    borderWidth: 2,
    borderColor: 'black',
    border: 'dashed'
  },
  unselected: {
    borderWidth: 2,
    border: 'double'
  },
}));

export default function TileKey(props) {
  const classes = useStyles();
  const [textures, setTextures] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    let key = props.textures.length === 0 ? 
      new Array(Math.ceil(lcolors.length/20)) :
      new Array(Math.ceil(props.textures.length/20));
    let data = props.textures.length === 0 ? lcolors : props.textures;

    let column = 0;
    let row = 0;
    for (let color of data) {
      if (row === 0) {
        key[column] = new Array(20);
      }
      key[column].push(color);

      row++;
      if (row === 20) {
        row = 0;
        column++;
      }
    }

    setTextures(key);
  }, [props.textures]);

  const handleClick = (value) => {
    setSelected(value);
    props.handleClick(value);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      { textures.map((column, i) => {
          return (
            <div style={{display: 'flex', flexDirection: 'column', padding: 2, alignItems: 'center'}}>
              { textures[i].map((row, j) => {
                if (props.textures.length === 0) {
                  return (
                    <Paper 
                      className={selected === (((i-1)*20)+j) ? classes.selected : classes.unselected} 
                      onClick={() => handleClick(((i-1)*20)+j)} 
                      style={{width:'30px', backgroundColor: textures[i][j], color: 'white'}}
                    >
                      {((i-1)*20)+j}
                    </Paper>
                  );
                }
                else {
                  return (
                    <Tooltip title={((i-1)*20)+j+ ': ' + textures[i][j].name}>
                      <Paper 
                        className={selected === (((i-1)*20)+j) ? classes.selected : classes.unselected} 
                        onClick={() => handleClick(((i-1)*20)+j)}
                      >
                        <img alt="" src={textures[i][j].image?.src} style={{display: "block"}}/>
                      </Paper>
                    </Tooltip>
                  );
                }
              }) 
              }
            </div>
          );
        })
      }
    </div>
  );
}