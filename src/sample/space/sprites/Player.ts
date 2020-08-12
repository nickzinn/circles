import { Ship } from "./Ship";
import { MainGameScene } from "../MainGameScene";
import { Point, pointAsInt } from "../../../gamelib/types/Point";
import { BlendImageBehavior } from "../../../gamelib/sprites/behaviors/BlendImageBehavior";

export class Player extends Ship {
	shield = 100;

	constructor(scene: MainGameScene, position: Point) {
		super(scene, position, "player");
		this.acceleration = -4;
	}

	//handle viewport movement
	updateModel(timeSinceLastUpdate: number): void {
		super.updateModel(timeSinceLastUpdate);
		let viewport = this.scene.viewPort;
		const size = this.scene.size;
		const margin = { x: size.width / 3, y: size.height / 3 };
		const position = pointAsInt(this.position);
		if (position.x < viewport.x + margin.x)
			viewport.x = position.x - margin.x;
		else if (position.x > viewport.x + size.width - margin.x)
			viewport.x = position.x - size.width + margin.x;
		if (position.y < viewport.y + margin.y)
			viewport.y = position.y - margin.y;
		else if (position.y > viewport.y + size.height - margin.y)
			viewport.y = position.y - size.height + margin.y;
		this.scene.viewPort = {
			x: Math.min(Math.max(viewport.x, 0), this.scene.modelSize.width - size.width)
			, y: Math.min(Math.max(viewport.y, 0), this.scene.modelSize.height - size.height)
		};
	}
	animateShield() {
		const shieldSpriteSheet = this.scene.controller.imagePreloader.getSpriteSheetFromCache("shield");
		const blendAmount = Math.min(Math.max(.15, this.shield / 100 + .15), 1.0);
		const shieldAge = 500;
		this.addBehavior(new BlendImageBehavior(shieldSpriteSheet, shieldAge, blendAmount));
	}
}
