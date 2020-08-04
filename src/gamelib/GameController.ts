import Scene from './Scene';
import { ImagePreloader } from './util/ImagePreloader';
import { GameInitializer } from './GameInitializer';
import SoundEffects from './util/SoundEffects';

export interface GameEvent{
    type:string;
    value:any;
}

export interface HandleGameEvent{
    (event:GameEvent):void;
}


export class GameController{

    debug: boolean = false;
    keysPressed: Map<string, boolean> = new Map();
    imagePreloader:ImagePreloader;
    soundEffects:SoundEffects;
    canvas?:HTMLCanvasElement;
    isShutdown:boolean = false;
    pause:boolean = false;
    _mute:boolean = false;

    private readyCallback?: () => void;
    private _scene?: Scene;
    private gameInitializer:GameInitializer;
    private gameEventListeners:HandleGameEvent[] = [];
    constructor(gameInitializer:GameInitializer){
        this.gameInitializer = gameInitializer;
        this.soundEffects = new SoundEffects(gameInitializer.preloadSounds || []);
        this.imagePreloader = new ImagePreloader();
        this.imagePreloader.preLoadImages(gameInitializer.preloadImages);
    }

    init(canvas:HTMLCanvasElement, readyCallback: () => void) {
        this.readyCallback = readyCallback;
        this.canvas = canvas;  
        this.imagePreloader.registerCallback( ()=>{  this._handleImagesLoaded()});
    }

    restart(){
        const canvas = this.canvas!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.gameInitializer.init(this);
        if(!this.scene)
            throw Error("Game Initializer must set scene.");
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
            console.log(`SetScene: ${scene.name}`);
        scene.debug = this.debug;
        const canvas = this.canvas;
        scene.size = {width:canvas!.width, height:canvas!.height};
        this._scene = scene;
    }
    get scene(): Scene {
        return this._scene!;
    }

    publishEvent(event:GameEvent){
        if(this.debug)
            console.log(`Publish Game Event: {${event.type}, ${event.value}}`);
        this.gameEventListeners.forEach( (handler) => handler(event));
    }

    subscribeEvent(gameEventListener:HandleGameEvent){
        this.gameEventListeners.push(gameEventListener);
    }
    set mute(mute:boolean){
        this._mute = mute;
        this.soundEffects.mute = mute;
    }
    get mute(){
        return this._mute;
    }
    private _handleImagesLoaded(){
        const that = this;
        const canvas = this.canvas!;
        const keyDown = (event:KeyboardEvent) => that.keysPressed.set(event.key, true);
        const keyUp = (event:KeyboardEvent) => that.keysPressed.set(event.key, true);
        const mouseDown = (e:MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top
            e.preventDefault();
            if(that.debug)
                console.log(`MouseDown Event: (${x},${y})`);
            if(!that.pause){
                that.scene.handleMouseClick(x,y)
            }
        };
        const touchMove = (e:TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.targetTouches[0];
            const x = touch.clientX - rect.left, y = touch.clientY - rect.top
            e.preventDefault();
            if(that.debug)
                console.log(`TouchMove Event: (${x},${y})`);
            if(!that.pause){
                that.scene.handleTouchMove(x,y);
            }
        };
        
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup',keyUp);
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener("touchmove", touchMove, false);

        let lastTime = 0;
        this.restart();
        
        function loop(time: number) {
            if(that.isShutdown){
                if(that.debug)
                    console.log("shutting down game controller.");
                document.removeEventListener('keydown', keyDown);
                document.removeEventListener('keyup',keyUp);
                canvas.removeEventListener('mousedown', mouseDown);
                canvas.removeEventListener("touchmove", touchMove, false);
                return;
            }
            let timeSinceLastAnimation = (!lastTime) ? 0: time - lastTime;
            lastTime = time;
            if(timeSinceLastAnimation > 100 || that.pause){
                //assume animation thread was paused due to moving off window/browser
                timeSinceLastAnimation = 0;
            }
            const ctx = canvas.getContext('2d')!;
            const size = {width:canvas.width, height: canvas.height};
            if (size.width !== window.innerWidth || size.height !== window.innerHeight) {
                // If window size is changed this is called to resize the canvas
                // It is not called via the resize event as that can fire to often an
                // debounce makes it feel sluggish so is called from main loop.
                that.restart();
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
        this.readyCallback!();
    }

    private paintBackground(ctx: CanvasRenderingContext2D) {
        if(this.scene.paintBackground)
            this.scene.paintBackground(ctx);
        else{
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.scene.size.width, this.scene.size.height);
        }
    }
}
