import { Ship } from "./Ship";
import { MainGameScene } from "../MainGameScene";
import { Point, pointAsInt } from "../../../gamelib/types/Point";
import { BlendedSpriteSheet } from "../../../gamelib/util/BlendedSpriteSheet";

export class Player extends Ship {
	shield = 100;
	shieldAge = 0;
	blendedSpriteSheet: BlendedSpriteSheet;
	constructor(scene: MainGameScene, position: Point) {
		super(scene, position, "player");
		this.acceleration = -4;
		const primary = this.spriteSheetBehavior.spriteSheet;
		const secondary = scene.controller.imagePreloader.getSpriteSheetFromCache("shield");
		this.blendedSpriteSheet = new BlendedSpriteSheet(primary, secondary);
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

	paint(location: Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void {
		if (this.shieldAge && this.shieldAge > 0) {
			this.blendedSpriteSheet.blendAmount = Math.min(Math.max(.25, this.shield / 100 + .25), 1.0);
			this.shieldAge -= timeSinceLastAnimation;
			this.spriteSheetBehavior.spriteSheet = this.blendedSpriteSheet;
			super.paint(location, ctx, timeSinceLastAnimation);
			this.spriteSheetBehavior.spriteSheet = this.blendedSpriteSheet.primarySpriteSheet;
		} else {
			super.paint(location, ctx, timeSinceLastAnimation);
		}
	}
	animateShield() {
		this.shieldAge = 500;
	}
}
