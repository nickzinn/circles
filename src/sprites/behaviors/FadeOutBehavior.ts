import { TimedBehavior } from "./TimedBehavior";
import { DefaultSprite } from "../DefaultSprite";
import { Point } from "../../types/Point";


export class FadeOutBehavior extends TimedBehavior{

    oldAlpha = 1.0;
	beforePaint?(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
        this.oldAlpha = ctx.globalAlpha;
        ctx.globalAlpha = Math.min(1.0 -  (this.age / this.expirationTime) , 1.0);
    }

    afterPaint?(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
        ctx.globalAlpha = this.oldAlpha;
    }
    
}