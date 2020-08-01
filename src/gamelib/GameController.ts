import Scene from './Scene';
import { ImagePreloader } from './ImagePreloader';
import { GameInitializer } from './GameInitializer';

export class GameController{

    debug: boolean = false;
    keysPressed: Map<string, boolean> = new Map();
    imagePreloader:ImagePreloader;
    canvas?:HTMLCanvasElement;
    isShutdown:boolean = false;
    pause:boolean = false;

    private readyCallback?: () => void;
    private _scene?: Scene;
    private gameInitializer:GameInitializer;


    constructor(gameInitializer:GameInitializer){
        this.gameInitializer = gameInitializer;
       
        this.imagePreloader = new ImagePreloader();
        gameInitializer.preloadImagesKeyPathMap().forEach( (path, key) => this.imagePreloader.preLoadImage(key,path) );
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
        const size = {width:canvas.width, height:canvas.height};
        this.gameInitializer.init(this);
        if(!this.scene)
            throw Error("Game Initializer must set scene.");
        this.scene.size = size;
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
        const canvas = this.canvas;
        scene.size = {width:canvas!.width, height:canvas!.height};
        this._scene = scene;
    }
    get scene(): Scene {
        return this._scene!;
    }
    
    private _handleImagesLoaded(){
        const that = this;
        const canvas = this.canvas!;
        
        document.addEventListener('keydown', (event) => {
            that.keysPressed.set(event.key, true);
        });
        document.addEventListener('keyup', (event) => {
            that.keysPressed.delete(event.key);
        });

        canvas.addEventListener('mousedown', function (e) {
            if(!that.pause){
                const rect = canvas.getBoundingClientRect();
                that.scene.handleMouseClick(e.clientX - rect.left, e.clientY - rect.top)
            }
        });
        document.addEventListener("touchmove", function (e) {
            if(!that.pause){
                const rect = canvas.getBoundingClientRect();
                const touch = e.targetTouches[0];
                that.scene.handleMouseClick(touch.clientX - rect.left, touch.clientY - rect.top)
            }
        }, false);

        let lastTime = 0;
        this.restart();
        
        function loop(time: number) {
            if(that.isShutdown)
                return;
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


    paintBackground(ctx: CanvasRenderingContext2D) {
        if(this.scene.paintBackground)
            this.scene.paintBackground(ctx);
        else{
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.scene.size.width, this.scene.size.height);
        }
    }

    private updateModel(timeSinceLastUpdate: number) {
        this.scene.updateModel(timeSinceLastUpdate);
    }
}
