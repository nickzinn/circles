import { Sprite, AnimatedSprite, Point, SpriteExpirationBehavior, TrailingEffectBehavior } from "gamelib";
import { MainGameScene } from "../MainGameScene";
import { SpaceGame } from "../SpaceGame";

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
		this.addBehavior(new TrailingEffectBehavior(.2));
	}
	
	handleCollision(otherSprite:Sprite):void{
		if(otherSprite === this.owner || otherSprite.name === NAME )
			return;
		this.isAlive = false;
		this.scene.missleHit(this.owner,otherSprite);
	}
}