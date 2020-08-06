import Scene from "../../gamelib/Scene";
import { SpaceGame } from "./SpaceGame";
import { GameController } from "../../gamelib/GameController";
import { MainGameScene } from "./MainGameScene";
import { generateOpenningSequenceAsteroids } from "./sprites/Asteroids";
import { TitleSprite } from "../../gamelib/sprites/TitleSprite";

export function launchBetweenLevelsScene(controller:GameController<SpaceGame>, level:number, score:number){
    const scene = new Scene('BetweenLevelScene',controller);
    controller.scene = scene;
    controller.publishEvent({type:'score', value:score});
    scene.wrapAround = true;

    scene.paintBackground = function(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, scene.size.width, scene.size.height);
    }
    scene.handleKeyPressed = (key: string) => { if(key==='n') new MainGameScene(controller,level+1,score) };
    scene.handleMouseClick = () => new MainGameScene(controller,level+1,score);
    scene.addSprite( new TitleSprite(`LEVEL ${level} COMPLETE`, `Score ${score}`
        , 'CLICK OR PRESS N FOR NEXT LEVEL' ) );
    scene.addSprites(generateOpenningSequenceAsteroids(scene, 30));
    scene.controller.soundEffects.play("levelComplete");
    return scene;
}
