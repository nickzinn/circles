import { Point } from "../../types/Point";
import { centerPosition} from "../../types/Rectangle";
import { SpriteSheet } from "../../util/SpriteSheet";
import { DefaultSprite } from "../DefaultSprite";
import { TimedBehavior } from "./TimedBehavior";


const SUPPORTED_BLEND_METHODS = ['lighten','source-over'];

/**
 * blends one image (secondary) into another image (primary)
 */
export class BlendImageBehavior extends TimedBehavior{
    spriteSheet:SpriteSheet;
    compositeOperation:GlobalCompositeOperation;
    blendAmount:number;

    /**
     * 
     * @param spriteSheet 
     * @param expirationTime -1 if never expires.
     * @param blendMethod 
     * @param blendAmount 
     */
    constructor(spriteSheet:SpriteSheet, expirationTime:number = -1,  blendAmount =1.0, compositeOperation:GlobalCompositeOperation = 'lighten',){
        super(expirationTime);
        if(!SUPPORTED_BLEND_METHODS.includes(compositeOperation))
            throw Error(`Unsupported composite operation: ${compositeOperation}`);
        this.spriteSheet = spriteSheet;
        this.compositeOperation = compositeOperation;
        this.blendAmount = blendAmount;
    }

    updateModel(sprite:DefaultSprite, timeSinceLastUpdate:number):void{
        if(this.expirationTime !== -1)
            super.updateModel(sprite, timeSinceLastUpdate);
	}
    
    afterPaint(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void{
        if(this.blendAmount < 0 || this.blendAmount > 1.0)
            throw Error(`Blend amount must be between 0 and 1.0, not ${this.blendAmount}`);
        if(!sprite){
            throw Error('Sprite must be defined.');
        }
        //place secondary image in the center of primary.
        const center = centerPosition({position:location, size:sprite.size});
        const w2 = this.spriteSheet.size.width, h2 = this.spriteSheet.size.height;
        const location2 = {x: Math.floor(center.x - w2/2), y: Math.floor(center.y - h2/2)  }
        ctx.save();
        ctx.globalAlpha = this.blendAmount;
        ctx.globalCompositeOperation = this.compositeOperation;
        const size = this.spriteSheet.size;
        this.spriteSheet.paint(ctx, 0, 0, {position:{x:0,y:0}, size}, {position:location2, size});
        ctx.restore();
    }
}