import { Point } from "../types/Point.js";
import { Size } from "../types/Size.js";
import { Vector } from "../types/Vector.js";
import { Rectangle } from "../types/Rectangle.js";

export interface Sprite extends Rectangle{
    name:string;
    position:Point;
    size:Size;
    isAlive:boolean;
    vector:Vector;
    acceleration?: number;
    mass?: number; // mass of the sprite, used for physics calculations
    priorPosition?:Point;
    zOrder?:number


    //optional properties
	canCollide?: boolean;
	isFixedPosition?: boolean;
	circularCollision?: boolean; // if true, collision detection will be circular instead of rectangular

    paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void;

    updateModel?(timeSinceLastUpdate: number):void;
		
	handleKill?():void;
    
    handleCollision?(otherSprite:Sprite):void;
    
}

