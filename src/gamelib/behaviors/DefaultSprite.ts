import { Point } from "../types/Point";
import { Sprite } from "../types/Sprite";
import { Size } from "../types/Size";
import { Behavior } from "../types/Behavior";

export class DefaultSprite implements Sprite{
    name:string;
    position:Point;
    size:Size;
    isAlive:boolean = true;
	
    speed:number = 0.0;
    angle:number = 0.0;
    acceleration:number = 0.0;
	canCollide:boolean = false;
    isFixedPosition:boolean = false;
    zOrder:number = 0;
	
	private behaviors:Behavior[] = [];
	
	constructor(name:string,position:Point={x:0.0,y:0.0}, size:Size={width:0.0, height:0.0}){
        this.name = name;
        this.position = position;
        this.size = size;
	}
	
	addBehavior(behavior:Behavior){
        if(behavior.init) behavior.init(this);
        this.behaviors.push(behavior);
    }
    
    paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number) {
        this.behaviors.forEach( (b) =>  b.paint?.(this, location, ctx, timeSinceLastAnimation));
    }
    updateModel(timeSinceLastUpdate: number) {
        this.behaviors.forEach( (b) =>  b.updateModel?.(this, timeSinceLastUpdate));
    }
    
    handleKill():void{
        this.behaviors.forEach( (b) =>  b.handleKill?.(this));
    }
    
    handleCollision?(otherSprite:Sprite):void{
        this.behaviors.forEach( (b) =>  b.handleCollision?.(this, otherSprite));
    }
}