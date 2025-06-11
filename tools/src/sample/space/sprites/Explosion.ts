import {Sprite, AnimatedSprite, Scene, Point} from "gamelib";


export function newSmallExplosion(scene:Scene, position:Point):Sprite{
    return newExplosion(scene, position, 'explosionSmall');
}

export function newBigExplosion(scene:Scene, position:Point):Sprite{
    return newExplosion(scene, position, 'explosionBig');
}

function newExplosion(scene:Scene, position:Point, name:string):Sprite {
    const explosion = new AnimatedSprite(scene,name, position.x, position.y, true);
    explosion.x = position.x - explosion.width / 2;
    explosion.y = position.y - explosion.height / 2;
    scene.controller.soundEffects.play(name);
    return explosion;
}