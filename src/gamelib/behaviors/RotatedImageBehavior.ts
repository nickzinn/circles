import { Behavior } from "../types/Behavior";
import { Sprite } from "../types/Sprite";
import { Point } from "../types/Point";



export class RotatedImageBehavior implements Behavior{
    image:HTMLImageElement;

	constructor(image:HTMLImageElement) {
        this.image = image;
	}
    init(sprite:Sprite){
        sprite.size = {width: this.image.width, height: this.image.height}
	}
    paint(sprite:Sprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
        
        ctx.drawImage(this.image, location.x, location.y, sprite.size.width, sprite.size.height);
		// double angle = getAngle();
		
		// AffineTransform affineTransform = new AffineTransform();
		// affineTransform.rotate(angle, x + getSprite().getWidth() / 2.0, y
		// 		+ getSprite().getHeight() / 2.0);
		// affineTransform.translate(x, y);

		// g.drawImage(image, affineTransform, null);
	}
	



}