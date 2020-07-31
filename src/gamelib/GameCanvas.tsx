
import React from 'react';

import './GameCanvas.css';
import Scene from './Scene';
import { ImagePreloader } from './ImagePreloader';
import { Typography, CircularProgress } from '@material-ui/core';
interface IState{
    imagesLoaded:false
}
export abstract class GameCanvas extends React.Component {

    debug: boolean = false;
    keysPressed: Map<string, boolean> = new Map();
    imagePreloader:ImagePreloader;
    state:IState;
    private _scene?: Scene;

    private canvasRef = React.createRef<HTMLCanvasElement>();

    constructor(props:any){
        super(props);
        this.imagePreloader = new ImagePreloader();
        if(this.preloadImagesKeyPathMap){
            this.preloadImagesKeyPathMap().forEach( (path, key) => this.imagePreloader.preLoadImage(key,path) );
        }
        this.state = { imagesLoaded:false};
    }

    transition(transitionScene: Scene, newScene: Scene) {
        const that = this;
        transitionScene.addBehavior({
            handleKill() {
                that.scene = newScene;
            }
        });
        if (this.scene !== transitionScene)
            this.scene = transitionScene;
    }

    set scene(scene: Scene) {
        if (this.debug)
            console.log(`SetScene: ${scene.constructor.name}`);
        scene.debug = this.debug;
        const canvas = this.canvasRef.current;
        scene.size = {width:canvas!.width, height:canvas!.height};
        this._scene = scene;
    }
    get scene(): Scene {
        return this._scene!;
    }

    
    componentDidMount() {    
        this.imagePreloader.registerCallback( ()=>{  this.handleImagesLoaded()});
    }    
    
    handleImagesLoaded(){
        const canvas = this.canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const that = this;
        let size = {width:canvas.width, height: canvas.height};

        document.addEventListener('keydown', (event) => {
            that.keysPressed.set(event.key, true);
        });
        document.addEventListener('keyup', (event) => {
            that.keysPressed.delete(event.key);
        });

        canvas.addEventListener('mousedown', function (e) {
            const rect = canvas.getBoundingClientRect();
            that.scene.handleMouseClick(e.clientX - rect.left, e.clientY - rect.top)
        });
        document.addEventListener("touchmove", function (e) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.targetTouches[0];
            that.scene.handleMouseClick(touch.clientX - rect.left, touch.clientY - rect.top)
        }, false);

        let lastTime = 0;
        this.resizeCanvas();
        this.init();
        
        function loop(time: number) {
            let timeSinceLastAnimation = (!lastTime) ? 0: time - lastTime;
            lastTime = time;
            if(timeSinceLastAnimation > 100){
                //assume animation thread was paused due to moving off window/browser
                timeSinceLastAnimation = 0;
            }
            if (size.width !== window.innerWidth || size.height !== window.innerHeight) {
                that.resizeCanvas();
            }

            that.keysPressed.forEach((value, key) => that.scene.handleKeyPressed(key));

            ctx.save(); //Freeze redraw

            that.paintBackground(ctx);
            that.scene.paint({x:0,y:0}, ctx, timeSinceLastAnimation);
            that.scene.updateModel(timeSinceLastAnimation);

            ctx.restore();//now do redraw

            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
        this.setState({imagesLoaded:true})
    }

    // If window size is changed this is called to resize the canvas
    // It is not called via the resize event as that can fire to often an
    // debounce makes it feel sluggish so is called from main loop.
    resizeCanvas() {
        const canvas = this.canvasRef.current!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const size = {width:canvas.width, height:canvas.height};
        if(this.scene)
            this.scene.size = size;
    }

    protected paintBackground(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.scene.size.width, this.scene.size.height);
    }

    protected updateModel(timeSinceLastUpdate: number) {
        this.scene.updateModel(timeSinceLastUpdate);
    }

    protected preloadImagesKeyPathMap?():Map<string,string>;

    protected abstract init():void;

    render() {
        return (
            <React.Fragment>
                {!this.state.imagesLoaded &&
                <React.Fragment>
                    <Typography variant="h2" gutterBottom>
                    Loading images...
                    </Typography>
                    <CircularProgress />
                    </React.Fragment>        
                }
            <canvas id='Canvas' ref={this.canvasRef} />
            </React.Fragment>
        );
    }
}
