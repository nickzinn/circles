import { Behavior } from "./Behavior";
import { Point } from "../../types/Point";
import { SpriteSheet } from "../../util/SpriteSheet";
import { DefaultSprite } from "../DefaultSprite";

export class SpriteSheetBehavior implements Behavior{
    spriteSheet:SpriteSheet;
    framesPerSecond:number = 25;
	age:number = 0;
    animateOnce:boolean;
	rotate:boolean = false;
	constructor(spriteSheet:SpriteSheet,  animateOnce:boolean = false) {
		this.spriteSheet = spriteSheet;
		this.animateOnce = animateOnce;
	}

	init(sprite:DefaultSprite){
		sprite.size = this.spriteSheet.size;
	}

    paint(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
		let frame;
		if(this.spriteSheet.type==='rotate'){
			frame = Math.floor( ((Math.abs(this.getAngle(sprite)) % (Math.PI*2))/(Math.PI*2)) * this.spriteSheet.frameCount*2);
			if(frame>=this.spriteSheet.frameCount){
				frame = (this.spriteSheet.frameCount*2) - (frame) -1;
			}
        }else if(this.framesPerSecond && this.spriteSheet.frameCount !== 0){
			const timePerFrame = 1.0 / this.framesPerSecond;
			frame = Math.floor( (this.age/timePerFrame ) % this.spriteSheet.frameCount);
		}else{
			frame =0;
		}
		frame = Math.min(frame, this.spriteSheet.frameCount-1);
		const column = Math.floor(frame % this.spriteSheet.columns) + 1;
		const row = Math.floor( frame/this.spriteSheet.columns ) + 1 ;
		this.spriteSheet.paint(location,ctx,this.getAngle(sprite),row,column);		

	}
	updateModel(sprite:DefaultSprite, timeSinceLastUpdate:number):void{
		const dx = timeSinceLastUpdate/1000;
		this.age += dx;
		if(this.animateOnce){
			if (this.age > this.spriteSheet.frameCount / this.framesPerSecond) {
				sprite.isAlive = false;
			}
		}
	}
	getAngle(sprite:DefaultSprite){
		return (sprite.angle) ? sprite.angle : 0;
	}
}
