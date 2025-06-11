import { Sprite } from "../Sprite.js";
import { Behavior } from "./Behavior.js";


export class WallBounceBehavior implements Behavior{
    handleCollision(sprite:Sprite, otherSprite:Sprite):void{
        const polar = otherSprite.vector.toPolar();
        if (sprite.width < sprite.height) {
            if (otherSprite.vector.x > 0)
                otherSprite.x = sprite.x - otherSprite.width;
            else
                otherSprite.x = sprite.x + sprite.width;
            otherSprite.vector = polar.withAngle(Math.PI - polar.angle + (Math.random() - .5) * .2).toVector();
        } else {
            if (otherSprite.vector.y > 0)
                otherSprite.y = sprite.y - otherSprite.height;
            else
                otherSprite.y = sprite.y + sprite.height;
            otherSprite.vector = polar.withAngle(-1.0 * polar.angle + (Math.random() - .5) * .2).toVector();
        }
    }
}