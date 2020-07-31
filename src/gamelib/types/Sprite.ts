import { Point } from "./Point";
import { Size } from "./Size";

export interface Sprite{
    position:Point;
    size:Size;
    isAlive:boolean;
    speed?: number;
    angle?: number;
    acceleration?: number;
    priorPosition?:Point;
    zOrder?:number

    //optional properties
	canCollide?: boolean;
	isFixedPosition?: boolean;
	
    paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void;

    updateModel?(timeSinceLastUpdate: number):void;
		
	handleKill?():void;
    
    handleCollision?(otherSprite:Sprite):void;
    
}

export function xySpeed(sprite:Sprite): Point{
    if(sprite.speed && sprite.angle)
        return {x: sprite.speed * Math.cos(sprite.angle), y: sprite.speed * Math.sin(sprite.angle)};
    else return {x:0,y:0};
}


export function centerPosition(sprite:Sprite): Point{
    return {x: sprite.position.x + sprite.size.width/2, y: sprite.position.y + sprite.size.height/2};
}

