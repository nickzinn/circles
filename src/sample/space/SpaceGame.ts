import { GameInitializer } from "../../gamelib/GameInitializer";
import { GameController } from "../../gamelib/GameController";
import Scene from "../../gamelib/Scene";
import { SpriteSheet } from "../../gamelib/behaviors/SpriteSheet";
import { SpriteSheetBehavior } from "../../gamelib/behaviors/SpriteSheetBehavior";
import { DefaultSprite } from "../../gamelib/behaviors/DefaultSprite";





export class SpaceGame implements GameInitializer{

    preloadImages = [{name:'asteroid', src:'/circles/assets/images/asteroidtw8.png'}];
    preloadSounds = [{name:'boop', src:'/circles/assets/sounds/boop.m4a'}
                    ,{name:'error', src:'/circles/assets/sounds/error.m4a'}];

	init(controller:GameController):void {
		const scene = new Scene('space game',controller);
        controller.scene = scene;
        let score =0;
        controller.publishEvent({type:'score', value:(score)});
        scene.wrapAround = true;
        scene.paintBackground = function(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, scene.size.width, scene.size.height);
        }

        const sz = scene.size;
        
        //add asteroids
        const image = controller.imagePreloader.getImageFromCache('asteroid');
        const spriteSheet = new SpriteSheet(image, 2, 10);
        const rand =  (minn:number, max:number) => Math.random() * (max-minn) + minn;
        const min =100;
        for(let x=0; x<10;x++){
            const a = new DefaultSprite('asteroid', {x: rand(sz.width-min, min),y:rand(sz.height-min, min)});
            a.isAlive = true;
            a.speed = Math.random() * 200+50;
            a.angle = Math.random() * Math.PI *2;
            a.zOrder = Math.random() * 10 -5;
            a.canCollide = true;
            a.addBehavior(new SpriteSheetBehavior(spriteSheet));
            a.size = {width: a.size.width, height: a.size.height}
            scene.addSprite(a);	
        }
	}
}