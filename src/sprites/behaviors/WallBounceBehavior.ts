import { Sprite } from "../Sprite.js";
import { Behavior } from "./Behavior.js";


export class WallBounceBehavior implements Behavior{
    handleCollision(sprite:Sprite, otherSprite:Sprite):void{
        const polar = otherSprite.vector.toPolar();
        if (sprite.size.width < sprite.size.height) {
            if (otherSprite.vector.x > 0)
                otherSprite.position.x = sprite.position.x - otherSprite.size.width;
            else
                otherSprite.position.x = sprite.position.x + sprite.size.width;
            otherSprite.position.y = otherSprite.priorPosition!.y;
            otherSprite.vector = polar.withAngle(Math.PI - polar.angle + (Math.random() - .5) * .2).toVector();
        } else {
            if (otherSprite.vector.y > 0)
                otherSprite.position.y = sprite.position.y - otherSprite.size.height;
            else
                otherSprite.position.y = sprite.position.y + sprite.size.height;
            otherSprite.position.x = otherSprite.priorPosition!.x;
            otherSprite.vector = polar.withAngle(-1.0 * polar.angle + (Math.random() - .5) * .2).toVector();
        }
    }
}