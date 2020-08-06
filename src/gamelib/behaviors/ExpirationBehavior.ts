import { Behavior } from "../types/Behavior";
import { Sprite } from "../types/Sprite";

export class ExpirationBehavior implements Behavior{
	age = 0;
	expirationTime:number;
	public constructor(expirationTime:number){
		this.expirationTime =  expirationTime;
	}
    
    updateModel(sprite:Sprite, timeSinceLastUpdate:number):void{
        this.age+=timeSinceLastUpdate;
		if(this.age > this.expirationTime)
			sprite.isAlive = false;
	}
}
