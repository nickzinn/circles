import {Sprite, AnimatedSprite, Point} from "gamelib";

import { MainGameScene } from "../MainGameScene";

export function newSmallExplosion(scene:MainGameScene, position:Point):Sprite{
    return newExplosion(scene, position, 'explosionSmall');
}

export function newBigExplosion(scene:MainGameScene, position:Point):Sprite{
    return newExplosion(scene, position, 'explosionBig');
}

function newExplosion(scene:MainGameScene, position:Point, name:string):Sprite {
    const explosion = new AnimatedSprite(scene,name, position, true);
    explosion.position = {x: position.x - explosion.size.width / 2
        ,y: position.y - explosion.size.height / 2};
    scene.controller.soundEffects.play(name);
    return explosion;
}