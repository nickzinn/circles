import { Point } from "./Point";
import { Size } from "./Size";
import { Vector } from "./Vector";
import { Rectangle } from "./Rectangle";

export interface Sprite extends Vector, Rectangle{
    name:string;
    position:Point;
    size:Size;
    isAlive:boolean;
    speed: number;
    angle: number;
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

