import { Point, AnimatedSprite } from "gamelib";

import { MainGameScene } from "../MainGameScene";
import { Missle } from "./Missle";
import { PolarVector } from "../../../../../dist/types/PolarVector";

const MAX_SPEED = 375;

export class Ship extends AnimatedSprite {
	shipAngle: number;
	lastMissleFired?: Missle;

	constructor(scene: MainGameScene, position: Point, name: string) {
		super(scene, name, position);
		this.shipAngle = 0;
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

		const addVector = new PolarVector(amount, this.shipAngle);
		const newVector = this.vector.add(addVector.toVector()).toPolar();

		this.vector = newVector.withSpeed(Math.min(newVector.speed, MAX_SPEED)).toVector();
	}
}
