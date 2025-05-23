import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';

import { Link } from "react-router";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Link as ReactLink } from "@mui/material";

import AsteroidsScreen from './assets/images/asteroids-screen.png';
import BallsScreen from './assets/images/balls-screen.png';

export  function Home() {

    return (

        <React.Fragment>
            <CssBaseline />
            
            <Button href="/" variant="contained">Circles</Button>
            <Button href="/performance" variant="contained">Performance Testing</Button>
            <Button href="/editor" variant="contained">Tile Map Editor</Button>
            <Button href="/about" variant="contained">About!</Button>


     <AppBar position="absolute" color="default" sx={{ position: 'relative' }}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Circles
                    </Typography>
                </Toolbar>
            </AppBar>
       <Box component="div" overflow="visible">
                <Grid 
                    container 
                    alignItems="center" 
                    justifyContent="center" 
                    direction="column" 
                    sx={{
                        marginTop: 3,
                        marginBottom: 2,
                        padding: 2,
                        '@media (min-width: 1200px)': {
                            marginTop: 6,
                            marginBottom: 6,
                            padding: 3,
                        },
                        overflowY: 'auto',
                    }}
                >
                    <Card sx={{ maxWidth: 345, marginBottom: 3 }}>
                        <Link to="/space" style={{ textDecoration: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={AsteroidsScreen}
                                    title="Play Asteroids"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Play Space Hunter
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Shoot all the alien ships! Use mouse, touch, or W-A-S-D to move around and space bar to fire. Watch out for the enemy...
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                    
                    <Card sx={{ maxWidth: 345, marginBottom: 3 }}>
                        <Link to="/ball" style={{ textDecoration: 'none' }}>
                            <CardActionArea>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={BallsScreen}
                                    title="Play Bouncing Ball"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Play Bouncing Ball
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Try to catch the balls. If you miss your score goes down, so be careful! Built this to test the library.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                    
                    <ReactLink 
                        component="button" 
                        variant="body2" 
                        sx={{ marginLeft: 3 }}
                        onClick={() => window.open('https://github.com/nickzinn/circles')}
                    >
                        Github Repository
                    </ReactLink>
        </Grid>
        </Box>
</React.Fragment>
    );
}