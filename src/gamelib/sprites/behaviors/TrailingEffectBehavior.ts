import { Behavior } from "./Behavior";
import { DefaultSprite } from "../DefaultSprite";
import { Point, pointEquals } from "../../types/Point";


export class TrailingEffectBehavior implements Behavior{
    alpha:number;
    lastLocation:Point[] = [];
    delay:number;

    constructor(alpha:number, delay:number = 3){
        this.alpha = alpha;
        this.delay = delay;
    }

	beforePaint(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
        if(this.lastLocation.length >= this.delay && timeSinceLastAnimation > 0 && !pointEquals(this.lastLocation[0], location)){
            const oldAlpha = ctx.globalAlpha;
            ctx.globalAlpha = this.alpha;
            sprite.paintStep(this.lastLocation[0], ctx, timeSinceLastAnimation);
            ctx.globalAlpha = oldAlpha;
        }
        this.lastLocation.push(location);
        if(this.lastLocation.length > this.delay){
            this.lastLocation = this.lastLocation.slice(2);
        }
    }   
}