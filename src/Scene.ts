import { GameController } from "./GameController";
import { DefaultSprite } from "./sprites/DefaultSprite";
import { Point, pointAsInt } from "./types/Point";
import { Sprite } from "./sprites/Sprite";
import { Size } from "./types/Size";
import { union, Rectangle, intersects, pointInRect } from "./types/Rectangle";
import { GameInitializer } from "./GameInitializer";
import { vectorToXYSpeed } from "./types/Vector";
import { TileMap } from "./tiles/TileMap";

function insert<T>(array:T[], value:T, comparator: (a:T, b:T)=>number){
	let low =0;
	if(array.length>0){
		let high=array.length;
		while(low < high){
			let mid = Math.floor( (low+high)/2);
			const c = comparator(array[mid], value);
			if(c <0){
				low = mid+1;
			}else if( c> 0){
				high = mid;
			}else{
				low = mid;
				break;
			}
		}
	}
	array.splice(low, 0, value);
}
function remove(array:any[], key:any){
    const index = array.indexOf(key, 0);
    if (index > -1) {
        array.splice(index, 1);
    }
}

export default class Scene extends DefaultSprite{

	tileMap?:TileMap;
    viewPort:Point = {x:0, y:0};
    controller:GameController;
    debug: boolean = false;
	wrapAround:boolean = false;
	sceneSpeed:number = 1.0;
	modelSize:Size;
	sprites:Sprite[] = [];

	private collisionListeners:Sprite[] = [];
	
    constructor(name:string, controller:GameController, modelSize:Size={width:0.0, height:0.0}){
        super(name);
        this.controller = controller;
        this.modelSize = modelSize;
    }
    handleKeyPressed(key: string): void {
    }

    handleMouseClick(x:number, y:number){
    }
	handleTouch(x:number, y:number){
    }

	getSpritesAtPoint(point:Point):Sprite[]{
		return this.sprites.filter( (s) => pointInRect(point, s) );
	}
	
	addSprite(sprite:Sprite) {
		this._handleWrap(sprite.position,sprite.size);
		this._validateSprite(sprite);
		if(!sprite.zOrder)
			sprite.zOrder = 0;
		insert(this.sprites, sprite, (a,b) => a.zOrder! - b.zOrder!);
		sprite.priorPosition = sprite.position;
		if (sprite.handleCollision)
			this.collisionListeners.push(sprite);
	}

	removeSprite(sprite:Sprite) {
		sprite.handleKill?.();
        if(this.debug)
            console.log(`Remove sprite(${sprite.name}) (${sprite.position.x}, ${sprite.position.y})`);
        remove(this.sprites, sprite);
        remove(this.collisionListeners, sprite);
	}

	public resetGame() {
	    this.sprites = [];
		this.collisionListeners = [];
	}
	
	setTiles(rows:number, columns:number, logicalGrid:string[][], setWorldSize:boolean, tileSize:Size|undefined = undefined){
		this.tileMap = new TileMap(this.controller.tileAtlas,rows, columns, logicalGrid, tileSize);
		if(setWorldSize){
			this.modelSize = this.tileMap.worldSize;
		}
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
			let newRect;
			if (!sprite.isFixedPosition) {
				const oldRect = {position:pointAsInt(sprite.position), size:sprite.size};
				const pointSpeed = vectorToXYSpeed(sprite);
				let newPosition = {x:sprite.position.x + pointSpeed.x * dx * this.sceneSpeed,
								   y:sprite.position.y + pointSpeed.y * dx * this.sceneSpeed};
				let wrapped = this._handleWrap(newPosition, sprite.size);
				sprite.priorPosition = oldRect.position;
				sprite.position = newPosition;
				// check collisions
				newRect = {position: pointAsInt(sprite.position), size: sprite.size};
				if (!wrapped)
					newRect = union(oldRect, newRect);
				
				if (sprite.acceleration) {
					if (Math.sign(sprite.acceleration
							+ sprite.speed) !== Math.sign(sprite
							.speed))
						sprite.speed = 0;
					else
						sprite.speed = sprite.speed + sprite.acceleration;
				}
			}

			if(sprite.canCollide){
				if(!newRect)
					newRect = sprite;
				this._handleCollision(newRect, sprite);
			}
			if(sprite.updateModel)
				sprite.updateModel(timeSinceLastUpdate);
			const error = this._validateSprite(sprite);
			if(error){
				console.log(`Sprite position not valid.  Killing spite (${sprite.name}). ${error}`);
				sprite.isAlive=false;
			}
			if(!sprite.isAlive)
				this.removeSprite(sprite);
		}
	}

	private _handleCollision( newRect:Rectangle, sprite:Sprite) {
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
		this.paintBackground(ctx);
		if(this.tileMap){
			this.tileMap.paint({position:location, size:this.size},  ctx, timeSinceLastAnimation);
		}
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
			ctx.fillStyle = "red"
			ctx.font ="8px Electrolize";
			ctx.fillText(`FPS: ${Math.round(1000 / (this.totalTime/ ++this.count))} Alive: ${this.sprites.length} On Screen: ${displayedSprites} Collision Handlers: ${this.collisionListeners.length}` , 10, this.size.height -10);
		}
	}

	paintBackground(ctx: CanvasRenderingContext2D):void {
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, this.size.width, this.size.height);
	}

	addSprites(sprites:Sprite[] ) {
		if(!sprites || !sprites.length)
			throw Error(`Attempting to add empty array of sprites in scene (${this.name})`);
		if(this.debug){
			console.log(`Bulk adding ${sprites.length} of type (${sprites[0].name})`)
		}
		sprites.forEach( (s) => this.addSprite(s) )
	}

	_validateSprite(sprite:Sprite):string|undefined{
		if(sprite.position.x < 0 || sprite.position.y < 0 )
			return `Sprite position less 0 (${sprite.position.x}, ${sprite.position.y})`;
		if(this.modelSize.width !==0){
			if(sprite.position.x >= this.modelSize.width || sprite.position.y >= this.modelSize.height)
				return `Sprite position(${sprite.position.x}, ${sprite.position.y}) > model(${this.modelSize.width},${this.modelSize.height})`;
		}else if(sprite.position.x >= this.size.width || sprite.position.y >= this.size.height) {
			return `Sprite position(${sprite.position.x}, ${sprite.position.y})  > screen(${this.size.width},${this.size.height})`;
		}
		if(sprite.size.width <=0 || sprite.size.height <= 0)
			return `Sprite size too small (${sprite.size.width}, ${sprite.size.height})`;
		if( (sprite.speed !== undefined &&  sprite.angle === undefined) 
			|| (sprite.speed === undefined &&  sprite.angle !== undefined))
			return `Either speed(${sprite.speed}) and angle(${sprite.angle}) are both defined or both undefined.`;
		return undefined;
	}
	_handleWrap(position:Point, size:Size):boolean{
		// handle wrap around
		let wrapped = false;
		if (this.wrapAround) {
			let width = this.size.width;
			let height = this.size.height;
			if(this.modelSize.width !==0){
				width= this.modelSize.width;
				height = this.modelSize.height;
			}
			if (position.x < 0) {
				position.x = width - size.width;
				wrapped = true;
			} else if (position.x + size.width > width) {
				position.x = 0;
				wrapped = true;
			}
			if (position.y < 0) {
				position.y = height - size.height;
				wrapped = true;
			} else if (position.y + size.height > height) {
				position.y = 0;
				wrapped = true;
			}
		}	
		return wrapped;
	}

}