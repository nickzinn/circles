import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { Vector } from "../types/Vector";
import { Rectangle } from "../types/Rectangle";

export interface Sprite extends Rectangle{
    name:string;
    position:Point;
    size:Size;
    isAlive:boolean;
    vector:Vector;
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

