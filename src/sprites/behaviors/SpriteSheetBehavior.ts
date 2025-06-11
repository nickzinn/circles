import { Behavior } from "./Behavior.js";
import { Point } from "../../types/Point.js";
import { SpriteSheet } from "../../util/SpriteSheet.js";
import { DefaultSprite } from "../DefaultSprite.js";
import { Size } from "../../types/Size.js";

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
		sprite.height = this.spriteSheet.size.height;
		sprite.width = this.spriteSheet.size.width;
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
		const angle = this.getAngle(sprite);
		this.spriteSheet.paint(ctx, frame, angle, {x:0,y:0, ...this.spriteSheet.size}, 
			{...location, width:sprite.width, height:sprite.height});

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
		return sprite.vector.angle();
	}
}
