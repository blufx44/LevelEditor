import React, { useState } from 'react';
import './App.css';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tile from './Tile';
import { ltextures } from './colors';
import { getFileObject } from './textureImporter';
import LevelImport from './menu/LevelImport';
import TextureImport from './menu/TextureImport';
import TileKey from './TileKey';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 16,
    width: 16,
  },
}));

let billboards = [];
let tiles = [];

function App() {
  const classes = useStyles();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [layer, setLayer] = useState('tile');
  const [tile, setTile] = useState(0);
  const [billboard, setBillboard] = useState('');
  const [update, setUpdate] = useState(false);
  const [sprites, setSprites] = useState([]);
  const [textures, setTextures] = useState([]);

  const initialize = function(value) {
    let bRows = [];

    while (bRows.length < value.length) {
      let tempB = [];
      while (tempB.length < value[0].length) {
        tempB.push('');
      }
      bRows.push(tempB);
    }
    billboards = bRows;
    tiles = value;
    setWidth(value[0].length);
    setHeight(value.length);
  }

  const updateHeight = function(value) {
    let temp = tiles;
    let tempB = billboards;

    while(temp.length < value || tempB.length < value) {
      let defRow = [];
      let defRowB = [];
      for (let i = 0; i < width; i++) {
        defRow.push(0);
        defRowB.push('');
      }

      if (temp.length < value) {
        temp.push(defRow);
      }
      if (tempB.length < value) {
        tempB.push(defRowB);
      }
    }

    while(temp.length > value || tempB.length > value) {
      if (temp.length > value) {
        temp.pop();
      }
      if (tempB.length > value) {
        tempB.pop();
      }    
    }
    
    tiles = temp;
    billboards = tempB;
    setHeight(value);
  }

  const updateWidth = function(value) {
    let temp = tiles;
    let tempB = billboards;

    temp.forEach(row => {
      while(row.length < value) {
        row.push(0);
      }

      while(row.length > value) {
        row.pop();
      }
    });

    tempB.forEach(row => {
      while(row.length < value) {
        row.push('');
      }

      while(row.length > value) {
        row.pop();
      }
    });

    tiles = temp;
    billboards = tempB;
    setWidth(value);
  }

  const switchLayer = function(e) {
    setLayer(e.target.value);
  }

  const switchBillboard = function(e) {
    setBillboard(e.target.value);
  }

  const updateLevel = function(x, y, value) {
    if (layer === 'tile') {
      tiles[x][y] = parseInt(value);
    }
    else {
      billboards[x][y] = value;
    }
  }

  const importLevel = function(files, type) {
  // files is a FileList of File objects. List some properties.
  var json = '';
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				try {
          json = JSON.parse(e.target.result);
          if (type === 'tile') {
            initialize(json);
          }
          else {
            let temp = billboards;
            for(let b = 0; b < json.length; b++) {
              let x = Math.floor(json[b]['x']);
              let y = Math.floor(json[b]['y']);
              temp[x][y] = json[b]['type'];
            }
            billboards = temp;
            setUpdate(!update);
          }
				} catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}
  }

  const importTexture = function(files, type) {
    // files is a FileList of File objects. List some properties.
    var json = '';
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();
  
      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          try {
            json = JSON.parse(e.target.result);
            if (type === 'tile') {
              for (let file of json) {
                getFileObject(file);
              }
              setTextures(json);
            }
            else {
              setSprites(json);
            }
          } catch (ex) {
            alert('ex when trying to parse json = ' + ex);
          }
        }
      })(f);
      reader.readAsText(f);
    }
  }

  const generate = function() {
    let t = [];
    let b = [];

    for (let i = 0; i < tiles.length; i++){
      let tr = [];
      for (let j = 0; j < tiles[i].length; j++) {
        tr.push(tiles[i][j]);
        if (billboards[i][j]) {
          b.push({type: billboards[i][j], x: i + .5, y: j + .5});
        }
      }
      t.push(tr);
    }

    let element1 = document.createElement("a");
    let tf = new Blob([JSON.stringify(t)], {type: 'text/plain'});
    element1.href = URL.createObjectURL(tf);
    element1.download = "tiles.json";
    document.body.appendChild(element1); 
    element1.click();

    let element4 = document.createElement("a");
    let bf = new Blob([JSON.stringify(b)], {type: 'text/plain'});
    element4.href = URL.createObjectURL(bf);
    element4.download = "billboards.json";
    document.body.appendChild(element4); 
    element4.click();
  }

  return (
    <div className="App">
      <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
        <LevelImport import={(files, type) => importLevel(files, type)}/>
        <TextureImport import={(files, type) => importTexture(files, type)}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
      <FormControl>
        <InputLabel>Editor</InputLabel>
        <Select
          value={layer}
          style={{verticalAlign:'bottom'}}
          onChange={(e) => switchLayer(e)}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >

          <MenuItem value={'tile'}>Tiles</MenuItem>
          <MenuItem value={'billboard'}>Billboards</MenuItem>
        </Select> 
      </FormControl>
      <TextField
        label="Height"
        type="number"
        value={height}
        onChange={(e) => updateHeight(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Width"
        type="number"
        value={width}
        onChange={(e) => updateWidth(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <div style={{flexDirection: 'column', height: 'fit-content', borderWidth: '2px', borderColor: 'black', borderStyle: 'solid', display: 'grid', overflow: 'auto', width: '70%'}}>
          { tiles.map((row, i) => (
            <Grid key={i} container spacing={0} >
              <Grid item xs={12} >
                  <Grid  container justifyContent="center" spacing={0} style={{flexWrap: 'noWrap'}}>
                    {row.map((column, j) => (
                      <Grid key={j} item>
                        <Tile 
                          key={i.toString() + j.toString()}
                          x={i}
                          y={j}
                          tile={tile}
                          layer={layer}
                          billboard={billboard} 
                          textures={textures}
                          tileValue={tiles[i][j]} 
                          billboardValue={billboards[i][j]} 
                          update={(value) => updateLevel(i, j, value)}
                        />
                      </Grid>
                    ))}
                  </Grid>
              </Grid>
            </Grid>
          ))}
        </div>
        <div style={{marginLeft: '20px', display: 'flex', flexDirection: 'column'}}>
          <FormControl>
          <InputLabel>Billboards</InputLabel>
            <Select
              value={billboard}
              style={{verticalAlign:'bottom'}}
              onChange={(e) => switchBillboard(e)}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={''}>None</MenuItem>
              {
                (sprites.length > 0) ? sprites.map((texture, i) => (
                  <MenuItem key={i} value={texture}>{texture}</MenuItem>
                )) :
                ltextures.map((texture, i) => (
                  <MenuItem key={i} value={texture}>{texture}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <FormControl style={{paddingTop: '40px'}}>
            <InputLabel>Tiles</InputLabel>
            <TileKey textures={textures} handleClick={(e) => setTile(e)}/>
          </FormControl>
        </div>
      </div>

      <Button onClick={() => generate()}>
        Generate
      </Button>
    </div>
  );
}

export default App;
