import { GameController } from "../../gamelib/GameController";
import Scene from "../../gamelib/Scene";
import { generateAsteroids } from "./sprites/Asteroids";
import { createMainGameScene } from "./GameScene";
import { SpaceGame } from "./SpaceGame";
import { TitleSprite } from "../../gamelib/sprites/TitleSprite";



export function launchOpenningSequence(controller:GameController<SpaceGame>){
    const scene = new Scene('space game',controller);
    controller.scene = scene;
    controller.publishEvent({type:'score', value:0});
    scene.wrapAround = true;


    scene.paintBackground = function(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, scene.size.width, scene.size.height);
    }
    scene.handleKeyPressed = (key: string) => { if(key==='n') createMainGameScene(controller,1) };
    scene.handleMouseClick = () => createMainGameScene(controller,1);

    scene.addSprite( new TitleSprite('Space Hunter', `High Score ${controller.gameInitializer.highscore}`
        , 'CLICK OR PRESS N FOR NEW GAME' ) );
    generateAsteroids(controller, 30);
}