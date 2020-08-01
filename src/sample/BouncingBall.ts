import { GameController } from "../gamelib/GameController";
import { Point } from "../gamelib/types/Point";
import Scene from "../gamelib/Scene";
import { Sprite, xySpeed } from "../gamelib/types/Sprite";
import { Size } from "../gamelib/types/Size";
import { DefaultSprite } from "../gamelib/behaviors/DefaultSprite";
import { GameInitializer } from "../gamelib/GameInitializer";
import { SpriteSheet } from "../gamelib/behaviors/SpriteSheet";
import { SpriteSheetBehavior } from "../gamelib/behaviors/SpriteSheetBehavior";



function createWall(position:Point, size:Size, isVertical:boolean):Sprite{
    const wall = {
        position,
        size,
        isAlive:true,
        paint: function(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void{
            ctx.fillStyle =  "	rgb(50,50,50)";
            ctx.fillRect(position.x, position.y, size.width, size.height);
        },
        handleCollision(otherSprite:Sprite):void{
            const speed = xySpeed(otherSprite);
            if(isVertical){
                if(speed.x>0)
                   otherSprite.position.x = this.position.x - otherSprite.size.width;
                else
                    otherSprite.position.x = this.position.x + this.size.width;
                otherSprite.position.y = otherSprite.priorPosition!.y;
                otherSprite.angle =  Math.PI - otherSprite.angle! + (Math.random() - .5 )*.2;
            }else{
                if(speed.y>0)
                    otherSprite.position.y = this.position.y - otherSprite.size.height;
                else
                    otherSprite.position.y = this.position.y + this.size.height;
                otherSprite.position.x = otherSprite.priorPosition!.x;
                otherSprite.angle =  -1.0 * otherSprite.angle! + (Math.random() - .5 )*.2;
            }
        }
    };
    return wall;
}

export class BouncingBall implements GameInitializer{
    //add cool font

    preloadImagesKeyPathMap():Map<string,string>{
        const map = new Map();
        map.set('ball', "/circles/assets/ball-sheet2.png");
        return map;
    }


	init(controller:GameController):void {
		const scene = new Scene(controller);
        controller.scene = scene;

        const image = controller.imagePreloader.getImageFromCache('ball');
        const spriteSheet = new SpriteSheet(image, 4, 8);
        const radius = spriteSheet.size.width/2;
        scene.handleMouseClick = function(x:number, y:number){
            const sprites = scene.getSpritesAtPoint({x,y});
            if(sprites.length){
                sprites.filter( (s) => s.canCollide ).forEach( (s) => scene.removeSprite(s) );
                return;
            }
            const ball = new DefaultSprite({x:x-radius,y:y-radius});
            ball.isAlive = true;
            ball.speed = Math.random() * 300+100;
            ball.angle = Math.random() * Math.PI *2;
            ball.canCollide = true;
            ball.addBehavior(new SpriteSheetBehavior(spriteSheet));
            ball.size = {width: ball.size.width -2, height: ball.size.height -2}
            scene.addSprite(ball);	
        }
        scene.debug = true;
        scene.wrapAround = false;
        scene.paintBackground = function(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, scene.size.width, scene.size.height);
        }

        const sz = scene.size;
        const wallSize = 4;
        //create walls
        scene.addSprite( createWall({x:0,y:0},{width:sz.width-wallSize,height:wallSize}, false));
        scene.addSprite( createWall({x:0,y:sz.height-wallSize},{width:sz.width,height:wallSize}, false));
        scene.addSprite( createWall({x:0,y:0},{width:wallSize,height:sz.height-wallSize}, true));
        scene.addSprite( createWall({x:sz.width-wallSize,y:0},{width:wallSize,height:sz.height-wallSize}, true));

		// this.scene.addSprite(Wall.newVerticalWall(size.width/3 *2 ,0,size.height/7 *3,2));	
		// this.scene.addSprite(Wall.newVerticalWall(size.width/3 *2 ,size.height/7*4,size.height/7 *3,2));
		
	}
}