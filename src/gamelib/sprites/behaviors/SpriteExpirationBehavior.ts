import { Behavior } from "./Behavior";
import { Sprite } from "../Sprite";

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
