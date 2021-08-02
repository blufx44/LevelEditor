import React, { useState, useEffect } from 'react';
import './App.css';
import {Paper} from '@material-ui/core';
import { lcolors } from './colors';

export default function TileKey(props) {
  const [textures, setTextures] = useState([]);

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
  }, [props.textures])

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      { textures.map((column, i) => {
          return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
              { textures[i].map((row, j) => {
                if (props.textures.length === 0) {
                  return (<Paper style={{marginLeft: '5px', width:'30px', backgroundColor: textures[i][j], color: 'white'}}>{((i-1)*20)+j}</Paper>);
                }
                else {
                  return (<Paper><img alt="i" src={textures[i][j]}/></Paper>);
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