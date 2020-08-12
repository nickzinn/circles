import { Sprite } from "../Sprite";
import { Point } from "../../types/Point";
import { DefaultSprite } from "../DefaultSprite";

export interface Behavior {

	init?(sprite:DefaultSprite): void;
    
	paint?(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void;

	beforePaint?(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void;

    afterPaint?(sprite:DefaultSprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void;
	
	updateModel?(sprite:DefaultSprite, timeSinceLastUpdate:number):void;

    handleKill?(sprite:DefaultSprite):void;
	
	handleCollision?(sprite:DefaultSprite, otherSprite:Sprite):void;

}