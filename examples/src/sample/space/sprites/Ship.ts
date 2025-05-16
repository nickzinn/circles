import { Point, AnimatedSprite,addVectors } from "gamelib";


import { MainGameScene } from "../MainGameScene";
import { SpaceGame } from "../SpaceGame";
import { Missle } from "./Missle";

const MAX_SPEED = 375;

export class Ship extends AnimatedSprite<SpaceGame, MainGameScene> {
	shipAngle: number;
	lastMissleFired?: Missle;

	constructor(scene: MainGameScene, position: Point, name: string) {
		super(scene, name, position);
		this.shipAngle = 0;
		this.speed = 0;
		this.angle = 0;
		this.acceleration = -.1;
		this.canCollide = true;
		this.spriteSheetBehavior.getAngle = () => this.shipAngle;
	}

	left() {
		this.shipAngle += -.1;
	}

	right() {
		this.shipAngle += +.1;
	}

	move(amount: number = 15.0) {
		const newVector = addVectors(this, { speed: amount, angle: this.shipAngle });
		this.angle = newVector.angle;
		this.speed = Math.min(newVector.speed, MAX_SPEED);
	}
}
