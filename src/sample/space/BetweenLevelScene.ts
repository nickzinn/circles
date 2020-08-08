import { SpaceGame } from "./SpaceGame";
import { GameController } from "../../gamelib/GameController";
import { MainGameScene } from "./MainGameScene";
import { generateOpenningSequenceAsteroids } from "./sprites/Asteroids";
import { TitleSprite } from "../../gamelib/sprites/TitleSprite";
import { BackgroundScene } from "./BackgroundScene";

export function launchBetweenLevelsScene(controller:GameController<SpaceGame>, level:number, score:number){
    const scene = new BackgroundScene('BetweenLevelScene',controller);
    controller.scene = scene;
    controller.publishEvent({type:'score', value:score});
    scene.wrapAround = true;

    scene.handleKeyPressed = (key: string) => { new MainGameScene(controller,level+1,score) };
    scene.handleMouseClick = () => new MainGameScene(controller,level+1,score);
    scene.addSprite( new TitleSprite(`LEVEL ${level} COMPLETE`, `Score ${score}`
        , 'HIT ANY KEY FOR NEXT LEVEL' ) );
    scene.addSprites(generateOpenningSequenceAsteroids(scene, 30));
    scene.controller.soundEffects.play("levelComplete");
    return scene;
}
