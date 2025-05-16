import { Sprite, AnimatedSprite, Point, SpriteExpirationBehavior, TrailingEffectBehavior } from "gamelib";
import { MainGameScene } from "../MainGameScene";

const NAME = "missle";

export class Missle extends AnimatedSprite{
	owner:Sprite;
	behavior:SpriteExpirationBehavior;
	mainGameScene:MainGameScene;
	constructor(position:Point,angle:number, speed:number,
			owner:Sprite, scene:MainGameScene, expiration:number) {
		super(scene,NAME, position);
		this.mainGameScene = scene;
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
		this.mainGameScene.missleHit(this.owner,otherSprite);
	}
}