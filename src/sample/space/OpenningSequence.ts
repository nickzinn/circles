import { GameController } from "../../gamelib/GameController";
import Scene from "../../gamelib/Scene";
import { generateOpenningSequenceAsteroids } from "./sprites/Asteroids";
import { MainGameScene } from "./MainGameScene";
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
    scene.handleKeyPressed = (key: string) => { if(key==='n') new MainGameScene(controller,1,0) };
    scene.handleMouseClick = () => new MainGameScene(controller,1,0);

    scene.addSprite( new TitleSprite('Space Hunter', `High Score ${controller.gameInitializer.highscore}`
        , 'CLICK OR PRESS N FOR NEW GAME' ) );
     scene.addSprites(generateOpenningSequenceAsteroids(scene, 30));
}