import {
    GameController, Scene, GameInitializer, Point,
    Sprite, Size, AnimatedSprite,
    TitleSprite, CountdownSprite,
    Vector,
    PolarVector,
    DefaultSprite,WallBounceBehavior, BounceBehavior
} from "gamelib";

class Wall extends DefaultSprite {
    constructor(x:number, y:number, width:number, height:number, isVertical: boolean) {
        super('wall', x, y, width, height);
        this.isAlive = true;
        this.canCollide = false;
        this.vector = new Vector(0, 0);
        this.isFixedPosition = true;
        this.addBehavior(new WallBounceBehavior());
    }
    paint(_location: Point, ctx: CanvasRenderingContext2D, _timeSinceLastAnimation: number): void {
        ctx.fillStyle = "rgb(50,50,50)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export class BouncingBall implements GameInitializer{

    preloadImages = [{ name: 'ball', src: '/assets/images/ball.png', rows: 4, columns: 8 , type: 'animate'}];
    preloadSounds = [{ name: 'boop', src: '/assets/sounds/boop.wav' }
        , { name: 'error', src: '/assets/sounds/error.wav' }];

    init(controller: GameController): void {
        this.launchInstructions(controller);
    }
    launchGame(controller: GameController) {
        const scene = new Scene('bouncing ball', controller);
        controller.scene = scene;
        let score = 0;
        controller.publishEvent({ type: 'score', value: (score) });
        scene.handleMouseClick = function (x: number, y: number) {
            const sprites = scene.getSpritesAtPoint({ x, y });
            if (sprites.length) {
                sprites.filter((s) => s.canCollide).forEach((s) => {
                    if (s.name === 'CountdownTimer')
                        return;
                    scene.removeSprite(s);
                    controller.publishEvent({ type: 'score', value: (++score) });
                    controller.soundEffects.play('boop');
                });
            } else {
                controller.publishEvent({ type: 'score', value: (--score) });
                controller.soundEffects.play('error');
            }
        }
        scene.wrapAround = false;

        const sz = scene;
        const wallSize = 4;
        //create walls
        scene.addSprite(new Wall(0, 0, sz.width - wallSize, wallSize , false));
        scene.addSprite(new Wall(0, sz.height - wallSize , sz.width, wallSize , false));
        scene.addSprite(new Wall(0, 0 , wallSize, sz.height - wallSize , true));
        scene.addSprite(new Wall(sz.width - wallSize, 0 , wallSize, sz.height - wallSize , true));

        const rand = (min: number, max: number) => Math.random() * (max - min) + min;
        const randPosition = (r: number) => ({ x: rand(sz.width - (r + wallSize) * 2, r + wallSize), y: rand(sz.height - (r + wallSize) * 2, r + wallSize) });
        const nBalls = 300;
        for (let x = 0; x < nBalls; x++) {
            const ball = new AnimatedSprite(scene, 'ball');
            const radius = ball.width / 2;
            //ball.position = randPosition(radius);
            ball.x = randPosition(radius).x;
            ball.y = sz.height/2;
            ball.isAlive = true;
            const polar = new PolarVector(70,  Math.PI  * (  (x==0) ? 2 : -2 ) * Math.random() );
            ball.vector = polar.toVector();
            ball.zOrder = Math.random() * 10 - 5;
            ball.canCollide = true;
            if(x< nBalls-10){
                ball.width = 20; ball.height = 20;
                ball.mass = 2
            }else{
                ball.width = 60; ball.height = 60;
                ball.mass = 18;
            }
           
            ball.circularCollision = true;
            ball.addBehavior(new BounceBehavior(['ball']));
            scene.addSprite(ball);
        }
        const countdown = new CountdownSprite(20000);
        ({x:countdown.x, y:countdown.y} = randPosition(countdown.width));
        const polar = new PolarVector(100, Math.random() * Math.PI * 2);
        countdown.vector = polar.toVector();
        countdown.zOrder = 1;
        countdown.canCollide = true;
        countdown.handleKill = () => this.launchGameOverScene(controller, score);
        scene.addSprite(countdown);
    }
    launchGameOverScene(controller: GameController, score: number) {
        const scene = new Scene('GameOver', controller);
        controller.scene = scene;
        let age = 0;
        scene.addBehavior({ updateModel: (s, time) => age += time });
        scene.handleKeyPressed = () => { if (age > 1000) this.launchGame(controller) };
        scene.handleMouseClick = () => { if (age > 1000) this.launchGame(controller) };
        const win = (score > 10);
        scene.addSprite(new TitleSprite(win ? 'YOU WIN!!!' : "YOU LOSE", `${win ? 'Awesome,' : 'Times Up!'} Score ${score}`
            , 'HIT ANY KEY TO PLAY AGAIN'));
        return scene;
    }
    launchInstructions(controller: GameController) {
        const scene = new Scene('Intro', controller);
        controller.scene = scene;

        scene.handleKeyPressed = () => this.launchGame(controller);
        scene.handleMouseClick = () => this.launchGame(controller);
        scene.addSprite(new TitleSprite("CLICK THE BALLS", `You have 15 seconds. Don't miss.`
            , 'HIT ANY KEY TO PLAY'));
        return scene;
    }
}

