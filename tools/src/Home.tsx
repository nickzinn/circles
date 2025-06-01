import * as React from 'react';
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

interface SiteCardProps {
  title:string;
  link:string;
  image:string;
  children: React.ReactNode; 
}

function SiteCard( {title, link, image, children}: SiteCardProps) {
    return (
    <Card sx={{ maxWidth: 345, marginBottom: 3, width: '100%' }}>
        <Link to={link} style={{ textDecoration: 'none' }}>
            <CardActionArea>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                    title={title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {children}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Link>
    </Card>
    );
}


export  function Home() {

    return (

        <React.Fragment>
     <AppBar position="sticky" color="default">
        <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
                Circles
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
              <Button href="/about">
                ABOUT
              </Button>
        </Toolbar>
    </AppBar>
    <Box component="div" overflow="visible">
        <Grid 
            container 
            alignItems="center" 
            justifyContent="center" 
            direction="column" 
            sx={{
                marginTop: 1,
                marginBottom: 1,
                padding: 2,
                '@media (min-width: 1200px)': {
                    marginTop: 6,
                    marginBottom: 6,
                    padding: 3,
                },
                overflowY: 'auto',
            }}
        >
        <SiteCard title="Play Asteroids" 
            image="/assets/images/asteroids-screen.png" link="/space">
            Shoot all the alien ships! Use mouse, touch, or W-A-S-D to move around and space bar to fire. Watch out for the enemy...
        </SiteCard>
        <SiteCard title="Play Bouncing Ball" 
            image="/assets/images/balls-screen.png" link="/ball">
            Try to catch the balls. If you miss your score goes down, so be careful! Built this to test the library.
        </SiteCard>
        <SiteCard title="Performance Testing" 
            image="/assets/images/asteroids-screen.png" link="/performance">
            Performance Testing
        </SiteCard>
        <SiteCard title="Tile Map Editor" 
            image="/assets/images/asteroids-screen.png" link="/editor">
            Tile Map Editor
        </SiteCard>     
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


