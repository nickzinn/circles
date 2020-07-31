import { Sprite } from "./Sprite";
import { Point } from "./Point";

export interface Behavior {
	
	init?(sprite:Sprite):void;
    
    paint?(sprite:Sprite, location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void;
	
	updateModel?(sprite:Sprite, timeSinceLastUpdate:number):void;

    handleKill?(sprite:Sprite):void;
	
	handleCollision?(sprite:Sprite, otherSprite:Sprite):void;

}