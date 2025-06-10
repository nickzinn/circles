import { centerPosition } from "../../types/Rectangle.js";
import { Vector } from "../../types/Vector.js";
import { Sprite } from "../Sprite.js";
import { Behavior } from "./Behavior.js";


export class BounceBehavior implements Behavior{

    filter:string[];

    constructor(filter:string[] = []) {
        this.filter = filter;
    }

    handleCollision(spriteA: Sprite, spriteB: Sprite): void {
        
        if( this.filter.length && !this.filter.includes(spriteB.name))
            return;

        const pA = centerPosition(spriteA);
        const pB = centerPosition(spriteB);
        const vA = spriteA.vector;
        const vB = spriteB.vector;

        const pDist = { x: pB.x - pA.x, y: pB.y - pA.y };
        const res = vA.subtract(vB);

        if (res.x * pDist.x + res.y * pDist.y >= 0 ) {
            //Implement elastic collision
            const m1 = spriteA.mass ?? 1;
            const m2 = spriteB.mass ?? 1;
            //Calculate the angle of rotation
            const theta = - Math.atan2(pDist.y, pDist.x);
            const u1 = vA.rotate(theta);
            const u2 = vB.rotate(theta);

            //Apply 1-Dimensional Elastic Collision Formulas
            const v1 = new Vector(u1.x * (m1 - m2)/(m1 + m2) + u2.x * 2 * m2/(m1 + m2), u1.y);
            const v2 = new Vector(u2.x * (m2 - m1)/(m1 + m2) + u1.x * 2 * m1/(m1 + m2), u2.y);
            spriteA.vector = v1.rotate(-theta);
            spriteB.vector = v2.rotate(-theta);
        }
    }
}