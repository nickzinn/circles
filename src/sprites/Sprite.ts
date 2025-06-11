import { Point } from "../types/Point.js";
import { Vector } from "../types/Vector.js";
import { Rectangle } from "../types/Rectangle.js";

export interface Sprite extends Rectangle{
    name:string;
    x:number;
    y:number; 
    width:number;
    height:number;
    isAlive:boolean;
    vector:Vector;
    acceleration?: number;
    mass?: number; // mass of the sprite, used for physics calculations
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

