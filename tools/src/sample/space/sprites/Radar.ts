import { DefaultSprite, Point } from "gamelib";
import { MainGameScene } from "../MainGameScene";


export class Radar extends DefaultSprite {

	scene: MainGameScene;

	constructor(scene: MainGameScene) {
		super('Radar');
		const margin = 3;
		const x = Math.floor(scene.width * 14.0 / 16.0) - margin;
		const width = scene.width - 3 - x;
		const y = Math.floor(width / scene.modelSize.width * scene.modelSize.height);
		this.x = x - 3
		this.y = margin + 50;
		this.width = width;
		this.height = y;
		this.isFixedPosition = true;
		this.zOrder = 100;
		this.scene = scene;
		this.canCollide = false;
	}

	paint(location: Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number) {
		ctx.strokeStyle = 'white';
		ctx.strokeRect(location.x - 1, location.y - 1, this.width + 2, this.height + 2);
		ctx.fillStyle = 'white';
		
		const scale = this.width / this.scene.modelSize.width;
		for (const sprite of this.scene.sprites) {
			if (sprite === this) continue;
			const x1 = Math.floor(location.x + (sprite.x * scale));
			const y1 = Math.floor(location.y + (sprite.y * scale));
			let size = 2;
			if (sprite.name === 'enemy')
				ctx.fillStyle = 'red';
			else if (sprite.name === 'player') {
				ctx.fillStyle = 'green';
				size = 3;
			}
			ctx.fillRect(x1, y1, size, size);


			ctx.fillStyle = 'white';
		}
		ctx.strokeStyle = 'red';
		const topX = Math.floor(this.scene.viewPort.x * scale + location.x);
		const topY = Math.floor(this.scene.viewPort.y * scale + location.y)
		const width = Math.floor(this.scene.width * scale);
		const height = Math.floor(this.scene.height * scale);
		ctx.strokeRect(topX, topY, width, height);
	}
}