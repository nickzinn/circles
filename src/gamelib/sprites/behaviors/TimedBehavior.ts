import { Behavior } from "./Behavior";
import { DefaultSprite } from "../DefaultSprite";

export class TimedBehavior implements Behavior{
	age = 0;
	expirationTime:number;
	public constructor(expirationTime:number){
		this.expirationTime =  expirationTime;
	}
    
	updateModel(sprite:DefaultSprite, timeSinceLastUpdate:number):void{
        this.age+=timeSinceLastUpdate;
		if(this.age > this.expirationTime){
			sprite.removeBehavior(this);
			this.handleTimeUp?.(sprite);		
		}
	}

	handleTimeUp?(sprite:DefaultSprite):void;
}
