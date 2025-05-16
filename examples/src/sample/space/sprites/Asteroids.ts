import {Scene, Sprite} from "gamelib";
import {AnimatedSprite} from "gamelib";

import { SpaceGame } from "../SpaceGame";
import { MainGameScene } from "../MainGameScene";

export function generateOpenningSequenceAsteroids(scene:Scene<SpaceGame>, n:number):Sprite[]{
    const sz = scene.controller.scene.size;
    const rand =  (minn:number, max:number) => Math.random() * (max-minn) + minn;
    const min =100;
    const sprites:Sprite[] = [];
    for(let x=0; x<n;x++){
        const a = new AnimatedSprite(scene, 'asteroid', {x: rand(sz.width-min, min),y:rand(sz.height-min, min)});
        a.speed = Math.random() * 200+50;
        a.angle = Math.random() * Math.PI *2;
        a.zOrder = -1;
        a.canCollide = true;
        a.size = {width: a.size.width, height: a.size.height};
        sprites.push(a);	
    }
    return sprites;
}
export function generateGameAsteroids(scene:MainGameScene, n:number ):Sprite[]{
    const roids = generateOpenningSequenceAsteroids(scene, n);
    roids.forEach( (a) => {
        a.position.x = Math.random() * scene.modelSize.width;
        a.position.y = 0;
        a.speed = Math.random() * 100 +50;
    });
    return roids;
}