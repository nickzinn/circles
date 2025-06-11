import { Point } from "../types/Point.js";
import { Sprite } from "./Sprite.js";
import { Behavior } from "./behaviors/Behavior.js";
import { Vector } from "../types/Vector.js";

export class DefaultSprite implements Sprite{
    name:string;
    x:number;
    y:number; 
    width:number;
    height:number;
    isAlive:boolean = true;	
    vector:Vector = new Vector(0.0, 0.0);
    acceleration:number = 0.0;
	canCollide:boolean = false;
    isFixedPosition:boolean = false;
    circularCollision: boolean = false; // if true, collision detection will be circular instead of rectangular
    zOrder:number = 0;
	mass: number = 1; // mass of the sprite, used for physics calculations
	private behaviors:Behavior[] = [];
    private collisionBehaviors:Behavior[] = [];
	
	constructor(name:string, x:number = 0.0, y:number = 0.0, width:number = 0.0, height:number = 0.0){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
	}

    handleCollision?(otherSprite:Sprite):void;

	addBehavior(behavior:Behavior){
        if(behavior.init) behavior.init(this);
        this.behaviors.push(behavior);
        if(behavior.handleCollision){
            if(this.handleCollision){
                if(this.collisionBehaviors.length === 0){
                    const originalHandleCollision = this.handleCollision;
                    this.handleCollision = (otherSprite:Sprite) => {
                        originalHandleCollision(otherSprite);
                        this.collisionBehaviors.forEach((b) => b.handleCollision!(this, otherSprite));
                    }
                }
            }else{
                this.handleCollision = (otherSprite:Sprite) => {
                    this.collisionBehaviors.forEach((b) => b.handleCollision!(this, otherSprite));
                }
            }
            this.collisionBehaviors.push(behavior);
        }
    }

    removeBehavior(behavior:Behavior){
        const i = this.behaviors.indexOf(behavior)
        if(i === -1)
            throw Error('Behavior not found!');
        this.behaviors.splice(i,1);
        if(behavior.handleCollision){
            const j = this.collisionBehaviors.indexOf(behavior);
            if(j === -1)
                throw Error('Collision behavior not found!');
            this.collisionBehaviors.splice(j,1);
        }
    }
    
    paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number) {
        this.behaviors.forEach( (b) =>  b.beforePaint?.(this, location, ctx, timeSinceLastAnimation));
        this.paintStep(location, ctx, timeSinceLastAnimation);
        this.behaviors.forEach( (b) =>  b.afterPaint?.(this, location, ctx, timeSinceLastAnimation));
    }
    paintStep(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number) {
        this.behaviors.forEach( (b) =>  b.paint?.(this, location, ctx, timeSinceLastAnimation));
    }
    updateModel(timeSinceLastUpdate: number) {
        this.behaviors.slice().forEach( (b) =>  b.updateModel?.(this, timeSinceLastUpdate));
    }
    
    handleKill():void{
        this.behaviors.forEach( (b) =>  b.handleKill?.(this));
    }   
}