import { MainGameScene } from "../MainGameScene";
import { Point } from "../../../gamelib/types/Point";
import { xySpeed } from "../../../gamelib/types/Sprite";
import { AnimatedSprite } from "../../../gamelib/sprites/AnimatedSprite";
import { SpaceGame } from "../SpaceGame";
import { Missle } from "./Missle";

const MAX_SPEED = 375;

export class Ship  extends AnimatedSprite<SpaceGame, MainGameScene> {
	shipAngle:number;
	lastMissleFired?:Missle;

	constructor(scene:MainGameScene, position:Point, name:string) {
		super(scene,name, position);
		this.shipAngle = 0;
		this.speed = 0;
		this.angle = 0;
		this.acceleration = -.1;
		this.canCollide = true;  
		this.spriteSheetBehavior.getAngle = () => this.shipAngle;
	}

	left() {
		this.shipAngle += -.15;
	}

	right() {
		this.shipAngle += +.15;
	}

	move() {
		const speed = xySpeed(this);

		let xSpeed = speed.x + 15.0 * Math.cos(this.shipAngle);
		let ySpeed = speed.y + 15.0 * Math.sin(this.shipAngle);
		xSpeed = Math.max(Math.min(MAX_SPEED, xSpeed), MAX_SPEED * -1);
		ySpeed = Math.max(Math.min(MAX_SPEED, ySpeed), MAX_SPEED * -1);

		this.angle =Math.atan2(ySpeed, xSpeed);
		this.speed =Math.hypot(xSpeed, ySpeed);
	}
}
