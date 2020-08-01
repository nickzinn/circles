import { Behavior } from "../types/Behavior";
import { Sprite } from "../types/Sprite";
import { Point } from "../types/Point";
import { SpriteSheet } from "./SpriteSheet";



export class SpriteSheetBehavior implements Behavior{
    spriteSheet:SpriteSheet;
    framesPerSecond:number = 10;
	age:number = 0;
    animateOnce:boolean = false;
	rotate:boolean = false;

	constructor(spriteSheet:SpriteSheet) {
		this.spriteSheet = spriteSheet;
	}
    init(sprite:Sprite){
        sprite.size = this.spriteSheet.size;
	}
    paint(sprite:Sprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
		let frame;
		if(this.framesPerSecond && this.spriteSheet.frameCount !== 0){
			const timePerFrame = 1.0 / this.framesPerSecond;
			frame = Math.floor( (this.age/timePerFrame ) % this.spriteSheet.frameCount);
		}else{
			frame =0;
		}
		const column = Math.floor(frame % this.spriteSheet.columns) + 1;
		const row = Math.floor( frame/this.spriteSheet.columns ) + 1 ;
		const angle = (sprite.angle) ? sprite.angle : 0;
		this.spriteSheet.paint(location,ctx,angle,row,column);		

	}
	updateModel(sprite:Sprite, timeSinceLastUpdate:number):void{
		const dx = timeSinceLastUpdate/1000;
		this.age += dx;
		if(this.animateOnce){
			if (this.age > this.spriteSheet.frameCount / this.framesPerSecond) {
				// System.out.println("FPS:" + getFramesPerSecond()
				// 		+ "\tFC:" + getFrameCount() + "\tage:" + age);
				sprite.isAlive = false;
			}
		}
	}
}
