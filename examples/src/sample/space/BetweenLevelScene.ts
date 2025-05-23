import { TitleSprite, Scene } from "gamelib";
import { MainGameScene } from "./MainGameScene";
import { generateOpenningSequenceAsteroids } from "./sprites/Asteroids";

const NAME = 'BetweenLevelScene';
export function launchBetweenLevelsScene(oldMainGameScene:MainGameScene) {
    const controller = oldMainGameScene.controller;
    const level = oldMainGameScene.level;
    const score = oldMainGameScene.score;
    const scene = new Scene(NAME,controller);
    scene.setTiles(3,3, [(new Array(9)).fill(NAME)], false);
    controller.scene = scene;
    controller.publishEvent({type:'score', value:score});
    scene.wrapAround = true;
    const handler = () => { new MainGameScene(controller, oldMainGameScene.spaceGame,level+1,score) };
    scene.handleKeyPressed = (key: string) => { handler(); };
    scene.handleMouseClick = handler;
    scene.addSprite( new TitleSprite(`LEVEL ${level} COMPLETE`, `Score ${score}`
        , 'HIT ANY KEY FOR NEXT LEVEL' ) );
    scene.addSprites(generateOpenningSequenceAsteroids(scene, 30));
    scene.controller.soundEffects.play("levelComplete");
    return scene;
}
