import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


//appbar

//tilemap settings
//tileAtlas:TileAtlas (basically spritesheet) 
// rows:number, columns:number, 
// tileSize:Size|undefined = undefined
//name of map
//load button
//save button
//map size columns, rows
//tile size x,y
//upload jpg/png file.

//main window
//logicGrid:string[][], 

//input settings, image, 
//json file.


//state
//TileMap


export default function TileMapEditor() {
  return (
 <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Button href="/" variant="contained">

                Back

        </Button>
        <Typography variant="h1" color="primary">
            Tile Map Editor
        </Typography>
      </Container>
    </React.Fragment>
  );
}