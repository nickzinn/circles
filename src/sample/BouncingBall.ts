import { GameController } from "../gamelib/GameController";
import { Point } from "../gamelib/types/Point";
import Scene from "../gamelib/Scene";
import { Sprite } from "../gamelib/sprites/Sprite";
import { Size } from "../gamelib/types/Size";
import { GameInitializer } from "../gamelib/GameInitializer";
import { AnimatedSprite } from "../gamelib/sprites/AnimatedSprite";
import { vectorToXYSpeed } from "../gamelib/types/Vector";
import { CountdownSprite } from "../gamelib/sprites/CountdownSprite";
import { TitleSprite } from "../gamelib/sprites/TitleSprite";

function createWall(position: Point, size: Size, isVertical: boolean): Sprite {
    const wall = {
        name: 'wall',
        position,
        size,
        isAlive: true,
        canCollide: false,
        speed: 0,
        angle: 0,
        paint: function (location: Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void {
            ctx.fillStyle = "	rgb(50,50,50)";
            ctx.fillRect(position.x, position.y, size.width, size.height);
        },
        handleCollision(otherSprite: Sprite): void {
            const speed = vectorToXYSpeed(otherSprite);
            if (isVertical) {
                if (speed.x > 0)
                    otherSprite.position.x = this.position.x - otherSprite.size.width;
                else
                    otherSprite.position.x = this.position.x + this.size.width;
                otherSprite.position.y = otherSprite.priorPosition!.y;
                otherSprite.angle = Math.PI - otherSprite.angle + (Math.random() - .5) * .2;
            } else {
                if (speed.y > 0)
                    otherSprite.position.y = this.position.y - otherSprite.size.height;
                else
                    otherSprite.position.y = this.position.y + this.size.height;
                otherSprite.position.x = otherSprite.priorPosition!.x;
                otherSprite.angle = -1.0 * otherSprite.angle + (Math.random() - .5) * .2;
            }
        }
    };
    return wall;
}

export class BouncingBall implements GameInitializer<BouncingBall>{

    preloadImages = [{ name: 'ball', src: '/circles/assets/images/ball.png', rows: 4, columns: 8 , type: 'animate'}];
    preloadSounds = [{ name: 'boop', src: '/circles/assets/sounds/boop.wav' }
        , { name: 'error', src: '/circles/assets/sounds/error.wav' }];

    init(controller: GameController<BouncingBall>): void {
        this.launchInstructions(controller);
    }
    launchGame(controller: GameController<BouncingBall>) {
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
                    controller.publishEvent({ type: 'score', value: (score++) });
                    controller.soundEffects.play('boop');
                });
            } else {
                controller.publishEvent({ type: 'score', value: (score--) });
                controller.soundEffects.play('error');
            }
        }
        scene.wrapAround = false;

        const sz = scene.size;
        const wallSize = 4;
        //create walls
        scene.addSprite(createWall({ x: 0, y: 0 }, { width: sz.width - wallSize, height: wallSize }, false));
        scene.addSprite(createWall({ x: 0, y: sz.height - wallSize }, { width: sz.width, height: wallSize }, false));
        scene.addSprite(createWall({ x: 0, y: 0 }, { width: wallSize, height: sz.height - wallSize }, true));
        scene.addSprite(createWall({ x: sz.width - wallSize, y: 0 }, { width: wallSize, height: sz.height - wallSize }, true));

        const rand = (min: number, max: number) => Math.random() * (max - min) + min;
        const randPosition = (r: number) => ({ x: rand(sz.width - (r + wallSize) * 2, r + wallSize), y: rand(sz.height - (r + wallSize) * 2, r + wallSize) });
        for (let x = 0; x < 30; x++) {
            const ball = new AnimatedSprite(scene, 'ball');
            const radius = ball.size.width / 2;
            ball.position = randPosition(radius);
            ball.isAlive = true;
            ball.speed = Math.random() * 250 + 100;
            ball.angle = Math.random() * Math.PI * 2;
            ball.zOrder = Math.random() * 10 - 5;
            ball.canCollide = true;
            ball.size = { width: ball.size.width - 2, height: ball.size.height - 2 }
            scene.addSprite(ball);
        }
        const countdown = new CountdownSprite(15000);
        countdown.position = randPosition(countdown.size.width);
        countdown.speed = 500;
        countdown.angle = Math.random() * Math.PI * 2;
        countdown.zOrder = 1;
        countdown.canCollide = true;
        countdown.handleKill = () => this.launchGameOverScene(controller, score);
        scene.addSprite(countdown);
    }
    launchGameOverScene(controller: GameController<BouncingBall>, score: number) {
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
    launchInstructions(controller: GameController<BouncingBall>) {
        const scene = new Scene('Intro', controller);
        controller.scene = scene;

        scene.handleKeyPressed = () => this.launchGame(controller);
        scene.handleMouseClick = () => this.launchGame(controller);
        scene.addSprite(new TitleSprite("CLICK THE BALLS", `You have 15 seconds. Don't miss.`
            , 'HIT ANY KEY TO PLAY'));
        return scene;
    }
}

