import { DefaultSprite } from "../../../gamelib/behaviors/DefaultSprite";
import { MainGameScene } from "../MainGameScene";
import { Point } from "../../../gamelib/types/Point";


export class Radar extends DefaultSprite{

    scene:MainGameScene;

    constructor(scene:MainGameScene){
        super('Radar');
        const margin = 3;
        const x = Math.floor( scene.size.width * 14.0 / 16.0)- margin;		
        const width = scene.size.width - 3 - x;
        const y = Math.floor( width / scene.modelSize.width * scene.modelSize.height);
        this.position = {x: x-3,y:margin+50};
        this.size = {width,height: y};
        this.isFixedPosition = true;
        this.zOrder = 100;
		this.scene =scene;
		this.canCollide = false;
		this.handleCollision = undefined;
    }
    
    paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number) {
		ctx.strokeStyle = 'white';
		ctx.strokeRect(location.x-1, location.y-1, this.size.width+2, this.size.height+2);
		ctx.fillStyle = 'white';

		const scale = this.size.width/this.scene.modelSize.width;
		for(let sprite of this.scene.sprites){
			if(sprite === this) continue;
			const x1 = Math.floor(location.x + (sprite.position.x * scale));
			const y1 = Math.floor(location.y + (sprite.position.y * scale));
			let size =2;
			if(sprite.name === 'enemy' )
				ctx.fillStyle = 'red';
			else if(sprite.name === 'player'){
				ctx.fillStyle = 'green';
				size =3;
			}
			ctx.fillRect(x1, y1,size,size);
			
			
			ctx.fillStyle = 'white';
		}
		ctx.strokeStyle = 'red';
		const topX = Math.floor(this.scene.viewPort.x * scale + location.x);
		const topY = Math.floor(this.scene.viewPort.y * scale + location.y)
		const width = Math.floor(this.scene.size.width * scale);
		const height = Math.floor(this.scene.size.height * scale);
		ctx.strokeRect(topX, topY, width, height);
	}
}