import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Container, AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
      },
    container:{
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
    },
    root: {
        maxWidth: 345,
        marginBottom: theme.spacing(6),
    },
    media: {
        height: 140,
    },
    link:{
        textDecoration: 'none'
    }
}));

export  function Home() {
    const classes = useStyles();

    return (

        <React.Fragment>
        <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Circles
          </Typography>
        </Toolbar>
      </AppBar>
        <Container className={classes.container}>
            <Card className={classes.root}>
                <Link to="/ball" className={classes.link}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/circles/assets/images/balls-screen.png"
                            title="Play Bouncing Ball"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Play Bouncing Ball
      </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Try to catch the balls.  If you miss your score goes down, so be careful!
      </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>

            <Card className={classes.root}>
                <Link to="/space" className={classes.link}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/circles/assets/images/asteroids-screen.png"
                            title="Play Asteroids"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Play Asteroids
      </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Shoot all the asteroids.   Use W-A-S-D to move around and space bar to fire.
      </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </Container>
</React.Fragment>
    );
}