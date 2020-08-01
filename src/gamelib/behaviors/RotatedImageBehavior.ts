import { Behavior } from "../types/Behavior";
import { Sprite } from "../types/Sprite";
import { Point } from "../types/Point";



export class RotatedImageBehavior implements Behavior{
	readonly image:HTMLImageElement;
	rotate:boolean = true;

	constructor(image:HTMLImageElement) {
        this.image = image;
	}
    init(sprite:Sprite){
        sprite.size = {width: this.image.width, height: this.image.height}
	}
    paint(sprite:Sprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
		if(this.rotate){
			ctx.translate(location.x + sprite.size.width / 2.0, 
				location.y+ sprite.size.height / 2.0);
			ctx.rotate(sprite.angle!);
			ctx.drawImage(this.image, 0 - sprite.size.width / 2.0, 
				0 - sprite.size.height / 2.0, this.image.width, this.image.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}else{
			ctx.drawImage(this.image, location.x, location.y, sprite.size.width, sprite.size.height);
		}
	}
}