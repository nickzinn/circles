import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, Box, Grid, Card, CardContent, FormControl, InputLabel, Select, makeStyles, Slider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        root: {
            width: 300,
            marginBottom: theme.spacing(3),
        },
        link: {
            textDecoration: 'none'
        },
    }),
);

export default function ImageDemo() {
    const classes = useStyles();

    const [state, setState] = React.useState<{ age: string | number; name: string }>({
        age: '',
        name: 'hai',
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <React.Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="primary" >
                        <Link to="/" className={classes.link}>
                            <Typography variant="h6" color="primary" >Circles</Typography></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container alignItems="center" justify="center" direction="column"  >
                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Image Manipulation
                             </Typography>
                        <FormControl >
                            <InputLabel htmlFor="age-native-simple">Sprite</InputLabel>
                            <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </Select>
                        </FormControl>

                        <Typography id="angle-slider" gutterBottom>
                            Angle
                            </Typography>
                        <Slider defaultValue={0} valueLabelDisplay='auto' aria-labelledby="angle-slider" step={1} min={0} max={360} />
                        <Typography id="framesPerSecond-slider" gutterBottom>
                            frames per second
                            </Typography>
                        <Slider defaultValue={25} valueLabelDisplay='auto' aria-labelledby="framesPerSecond-slider" step={1} min={0} max={30} />
                        <Typography id="scale-slider" gutterBottom>
                            Scale
                            </Typography>
                        <Slider defaultValue={1.0} valueLabelDisplay='auto' aria-labelledby="scale-slider" step={.01} min={.1} max={5.0} />
                        <FormControl >
                            <InputLabel htmlFor="age-native-simple">Sprite Type</InputLabel>
                            <Select native>
                                <option value={'animate'}>Animate</option>
                                <option value={'rotate'}>Rotate</option>
                            </Select>
                        </FormControl>          
                    </CardContent>
                </Card>
            </Grid>
            <Box component="div" overflow="visible">
                <Grid container alignItems="center" justify="center" direction="column" >
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Blend Manipulation
                             </Typography>
                             <FormControl >
                            <InputLabel htmlFor="age-native-simple">Base Sprite</InputLabel>
                            <Select native>
                                <option value={'animate'}>Animate</option>
                                <option value={'rotate'}>Rotate</option>
                            </Select>
                        </FormControl> 
                        <FormControl >
                            <InputLabel htmlFor="age-native-simple">Sprite Two</InputLabel>
                            <Select native>
                                <option value={'animate'}>Animate</option>
                                <option value={'rotate'}>Rotate</option>
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel htmlFor="age-native-simple">Blend Method</InputLabel>
                            <Select native>
                                <option value={'animate'}>Add</option>
                                <option value={'rotate'}>Subtract</option>
                                <option value={'rotate'}>Average</option>
                            </Select>
                        </FormControl> 
                        <Typography id="blendAmount-slider" gutterBottom>
                            Blend Amount
                            </Typography>
                        <Slider defaultValue={.5} valueLabelDisplay='auto' aria-labelledby="blendAmount-slider" step={.01} min={.01} max={1.0} />
                        
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </React.Fragment>
    );
}