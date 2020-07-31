import { GameController } from "./GameController";
import { DefaultSprite } from "./behaviors/DefaultSprite";
import { Point, pointAsInt } from "./types/Point";
import { Sprite, xySpeed } from "./types/Sprite";
import { Size } from "./types/Size";
import { union, Rectangle, intersects, pointInRect } from "./types/Rectangle";


function remove(array:any[], key:any){
    const index = array.indexOf(key, 0);
    if (index > -1) {
        array.splice(index, 1);
    }
}

export default class Scene extends DefaultSprite{

    viewPort:Point = {x:0, y:0};
    controller:GameController;
    debug: boolean = false;
    private collisionListeners:Sprite[] = [];
	private sprites:Sprite[] = [];
	
	wrapAround:boolean = false;
	sceneSpeed:number = 1.0;
    modelSize:Size;
    
    constructor(controller:GameController, modelSize:Size={width:0.0, height:0.0}){
        super();
        this.controller = controller;
        this.modelSize = modelSize;
    }
    handleKeyPressed(key: string): void {
    }

    handleMouseClick(x:number, y:number){
    }


	getSpritesAtPoint(point:Point):Sprite[]{
		return this.sprites.filter( (s) => pointInRect(point, s) );
	}

	addSprite(sprite:Sprite) {
		if(this.debug)
			console.log("AddSprite: " + sprite);

		//todo: insert by z-order
		this.sprites.push(sprite);
		sprite.priorPosition = sprite.position;
		if (sprite.handleCollision)
			this.collisionListeners.push(sprite);
	}

	removeSprite(sprite:Sprite) {
		sprite.handleKill?.();
        if(this.debug)
            console.log("RemoveSprite: " + sprite);
        remove(this.sprites, sprite);
        remove(this.collisionListeners, sprite);
	}

	public resetGame() {
	    this.sprites = [];
		this.collisionListeners = [];
	}

    updateModel(timeSinceLastUpdate: number) {
		super.updateModel(timeSinceLastUpdate);
        
        // handle movements and check collision
		this.handleMovement(timeSinceLastUpdate);
	}

    handleMovement(timeSinceLastUpdate: number) {
        const dx = timeSinceLastUpdate/1000.0;
        const tempArray:Sprite[] = this.sprites.slice();
		while (tempArray.length) {
			const sprite:Sprite = tempArray.pop()!;
			if(!sprite.isAlive){
				// remove any dead sprites.
				this.removeSprite(sprite);
				continue;
			}
			if (sprite.speed) {
				const oldRect = {position:pointAsInt(sprite.position), size:sprite.size};
				const pointSpeed = xySpeed(sprite);
				let newX = sprite.position.x + pointSpeed.x * dx * this.sceneSpeed;
				let newY = sprite.position.y + pointSpeed.y * dx * this.sceneSpeed;

				// handle wrap around
				let wrapped = false;
				if (this.wrapAround) {
					let width = this.size.width;
					let height = this.size.height;
					if(this.modelSize.width !==0){
						width= this.modelSize.width;
						height = this.modelSize.height;
					}
					
					if (newX < 0) {
						newX = width - sprite.size.width;
						wrapped = true;
					} else if (newX + sprite.size.width > width) {
						newX = 0;
						wrapped = true;
					}
					if (newY < 0) {
						newY = height - sprite.size.height;
						wrapped = true;
					} else if (newY + sprite.size.height > height) {
						newY = 0;
						wrapped = true;
					}
				}
				sprite.priorPosition = oldRect.position;
				sprite.position = {x:newX, y:newY};
				// check collisions
				let newRect = {position: pointAsInt(sprite.position), size: sprite.size};
				if (!wrapped)
					newRect = union(oldRect, newRect);
				
				if(sprite.canCollide)
					this._handleCollision(newRect, sprite);
				if (sprite.acceleration) {
					if (Math.sign(sprite.acceleration
							+ sprite.speed) !== Math.sign(sprite
							.speed))
						sprite.speed = 0;
					else
						sprite.speed = sprite.speed + sprite.acceleration;
				}
			}
			if(sprite.updateModel)
				sprite.updateModel(timeSinceLastUpdate);
			if(!sprite.isAlive)
				this.removeSprite(sprite);
		}
	}

	private _handleCollision( newRect:Rectangle, sprite:Sprite) {
		//need to make this more sophisticated so it doesn't break out after one collision.
		let collisionSprite;
		if(sprite.handleCollision){
			for(let i =0; i< this.sprites.length;i++){
				const otherSprite = this.sprites[i];
				if (sprite !== otherSprite && otherSprite.canCollide) {
					if (intersects(newRect, otherSprite)) {
						sprite.handleCollision(otherSprite);
						collisionSprite = otherSprite;
						break;
					}
				}
			}
		}
		if(!collisionSprite)
			collisionSprite = sprite;
		
		for(let i =0; i< this.collisionListeners.length;i++){
			const otherSprite = this.collisionListeners[i];
			if (sprite !== otherSprite) {
				if (intersects(newRect, otherSprite)) {
					otherSprite.handleCollision!(sprite);
					collisionSprite = otherSprite;
					break;
				}
			}
		}
		
		if (!collisionSprite.isAlive) {
			this.removeSprite(collisionSprite);
		}
	}
	count =0;
	totalTime =0;
	paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void {
        //enable you to embed a scene as a sprite in another scene
        location = {x: location.x + this.viewPort.x, y:location.y+this.viewPort.y}; 
		super.paint(location, ctx, timeSinceLastAnimation);
		let displayedSprites =0
		for(let sprite of this.sprites){
			if(!sprite.isAlive)
				throw Error("No Dead Sprites Should Make it to render step.\n" + sprite);
			let pos = pointAsInt(sprite.position);
				if(!sprite.isFixedPosition){
					pos = {x: pos.x - location.x, y: pos.y - location.y}
				}
			if(pos.x > this.size.width || pos.y > this.size.height 
				|| (sprite.size.width + pos.x < 0)
				|| (sprite.size.height + pos.y < 0)){
				continue;
			}
			sprite.paint(pos, ctx, timeSinceLastAnimation);
			displayedSprites++;
		}
		if(this.debug){
			if(++this.count % 300 === 0){
				this.totalTime  = timeSinceLastAnimation;
				this.count =1;
			}else{
				this.totalTime +=timeSinceLastAnimation;
			}
			ctx.fillText(`FPS: ${Math.round(1000 / (this.totalTime/ ++this.count))} Alive Sprites: ${this.sprites.length} On Screen Sprites: ${displayedSprites}` , 10, this.size.height -10);
		}
	}

	addSprites(sprites:Sprite[] ) {
		sprites.forEach( (s) => this.addSprite(s) )
	}
}