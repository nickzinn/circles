import { GameController } from "../../gamelib/GameController";
import { generateOpenningSequenceAsteroids } from "./sprites/Asteroids";
import { MainGameScene } from "./MainGameScene";
import { SpaceGame } from "./SpaceGame";
import { TitleSprite } from "../../gamelib/sprites/TitleSprite";
import Scene from "../../gamelib/Scene";


const NAME = 'OpeningScene';
export function launchOpeningSequence(controller:GameController<SpaceGame>){
    const scene = new Scene(NAME,controller);
    scene.setTiles(3,3, [(new Array(9)).fill(NAME)], false);
    controller.scene = scene;
    controller.publishEvent({type:'score', value:0});
    scene.wrapAround = true;

    scene.handleKeyPressed = (key: string) => { new MainGameScene(controller,1,0) };
    scene.handleMouseClick = () => new MainGameScene(controller,1,0);

    scene.addSprite( new TitleSprite('Space Hunter', `High Score ${controller.gameInitializer.highscore}`
        , 'HIT ANY KEY FOR NEW GAME' ) );
     scene.addSprites(generateOpenningSequenceAsteroids(scene, 30));
}