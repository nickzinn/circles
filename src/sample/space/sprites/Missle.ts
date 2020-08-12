import { Sprite } from "../../../gamelib/sprites/Sprite";
import { MainGameScene } from "../MainGameScene";
import { AnimatedSprite } from "../../../gamelib/sprites/AnimatedSprite";
import { SpaceGame } from "../SpaceGame";
import { Point } from "../../../gamelib/types/Point";
import { SpriteExpirationBehavior } from "../../../gamelib/sprites/behaviors/SpriteExpirationBehavior";

const NAME = "missle";

export class Missle extends AnimatedSprite<SpaceGame, MainGameScene>{
	owner:Sprite;
	behavior:SpriteExpirationBehavior;
	constructor(position:Point,angle:number, speed:number,
			owner:Sprite, scene:MainGameScene, expiration:number) {
		super(scene,NAME, position);
		this.owner = owner;
		this.angle = angle;
		this.speed = speed;
		this.acceleration = 10;
		this.canCollide = true;
		this.behavior =new SpriteExpirationBehavior(expiration);
		this.addBehavior(this.behavior);
	}
	
	handleCollision(otherSprite:Sprite):void{
		if(otherSprite === this.owner || otherSprite.name === NAME )
			return;
		this.isAlive = false;
		this.scene.missleHit(this.owner,otherSprite);
	}
}