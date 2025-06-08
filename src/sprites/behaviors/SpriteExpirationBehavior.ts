import { Behavior } from "./Behavior.js";
import { Sprite } from "../Sprite.js";

export class SpriteExpirationBehavior implements Behavior{
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
