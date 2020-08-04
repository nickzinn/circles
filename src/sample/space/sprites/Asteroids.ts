import { GameController } from "../../../gamelib/GameController";
import { SpriteSheet } from "../../../gamelib/behaviors/SpriteSheet";
import { DefaultSprite } from "../../../gamelib/behaviors/DefaultSprite";
import { SpriteSheetBehavior } from "../../../gamelib/behaviors/SpriteSheetBehavior";
import { SpaceGame } from "../SpaceGame";





export function generateAsteroids(controller:GameController<SpaceGame>, count:number){
    const scene = controller.scene;
    const sz = scene.size;
    const image = controller.imagePreloader.getImageFromCache('asteroid');
    const spriteSheet = new SpriteSheet(image, 2, 10);
    const rand =  (minn:number, max:number) => Math.random() * (max-minn) + minn;
    const min =100;
    for(let x=0; x<count;x++){
        const a = new DefaultSprite('asteroid', {x: rand(sz.width-min, min),y:rand(sz.height-min, min)});
        a.isAlive = true;
        a.speed = Math.random() * 200+50;
        a.angle = Math.random() * Math.PI *2;
        a.zOrder = -1;
        a.canCollide = true;
        a.addBehavior(new SpriteSheetBehavior(spriteSheet));
        a.size = {width: a.size.width, height: a.size.height}
        scene.addSprite(a);	
    }
}