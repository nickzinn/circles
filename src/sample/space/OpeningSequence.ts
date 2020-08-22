import { GameController } from "../../gamelib/GameController";
import { generateOpenningSequenceAsteroids } from "./sprites/Asteroids";
import { MainGameScene } from "./MainGameScene";
import { SpaceGame } from "./SpaceGame";
import { TitleSprite } from "../../gamelib/sprites/TitleSprite";
import { BackgroundScene } from "./BackgroundScene";

export function launchOpeningSequence(controller:GameController<SpaceGame>){
    const scene = new BackgroundScene('OpeningScene',controller);
    controller.scene = scene;
    controller.publishEvent({type:'score', value:0});
    scene.wrapAround = true;

    scene.handleKeyPressed = (key: string) => { new MainGameScene(controller,1,0) };
    scene.handleMouseClick = () => new MainGameScene(controller,1,0);

    scene.addSprite( new TitleSprite('Space Hunter', `High Score ${controller.gameInitializer.highscore}`
        , 'HIT ANY KEY FOR NEW GAME' ) );
     scene.addSprites(generateOpenningSequenceAsteroids(scene, 30));
}