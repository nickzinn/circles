import { GameController } from "./GameController.js";
import { DefaultSprite } from "./sprites/DefaultSprite.js";
import { Point, pointAsInt } from "./types/Point.js";
import { Sprite } from "./sprites/Sprite.js";
import { Size } from "./types/Size.js";
import { union, Rectangle, intersects, pointInRect, centerPosition } from "./types/Rectangle.js";
import { TileMap } from "./tiles/TileMap.js";
import Quadtree from '@timohausmann/quadtree-js';

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
	private quadtree: Quadtree | null = null;
	
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
		this._handleWrap(sprite);
		const error = this._validateSprite(sprite);
		if(error){
			console.log(`Sprite position not valid.  Killing spite (${sprite.name}). ${error}`);
			sprite.isAlive=false;
		}
		if(!sprite.zOrder)
			sprite.zOrder = 0;
		insert(this.sprites, sprite, (a,b) => a.zOrder! - b.zOrder!);
		if (sprite.handleCollision)
			this.collisionListeners.push(sprite);
	}

	removeSprite(sprite:Sprite) {
		sprite.handleKill?.();
        if(this.debug)
            console.log(`Remove sprite(${sprite.name}) (${sprite.x}, ${sprite.y})`);
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
        

		this._updateMovement(timeSinceLastUpdate);

		this._checkForCollisions();

		//update Model
		const tempArray:Sprite[] = this.sprites.slice();
		while (tempArray.length) {
			const sprite:Sprite = tempArray.pop()!;			
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

    _updateMovement(timeSinceLastUpdate: number) {
        const dx = timeSinceLastUpdate/1000.0;
			
		const tempArray:Sprite[] = this.sprites.slice();
		while (tempArray.length) {
			const sprite:Sprite = tempArray.pop()!;
			if (!sprite.isFixedPosition) {

				sprite.lastPosition = {x: sprite.x, y: sprite.y};

				sprite.x = sprite.x + sprite.vector.x * dx * this.sceneSpeed;
				sprite.y = sprite.y + sprite.vector.y * dx * this.sceneSpeed;
				if(this._handleWrap(sprite))
					sprite.lastPosition = {x: sprite.x, y: sprite.y};
				
				if (sprite.acceleration) {
					let polarVector = sprite.vector.toPolar();
					
					if (Math.sign(sprite.acceleration
							+ polarVector.speed) !== Math.sign(polarVector
							.speed))
						polarVector = polarVector.withSpeed(0);
					else
						polarVector = polarVector.withSpeed( polarVector.speed + sprite.acceleration);
					sprite.vector = polarVector.toVector();
				}
			}
		}
	}
	
	_checkForCollisions(){
		if(!this.quadtree)
			this.quadtree = new Quadtree({
			x: 0,
			y: 0,	
			width: this.modelSize.width || this.width,
			height: this.modelSize.height || this.height
		});
		this.quadtree.clear();
		this.sprites.forEach((s) => {
			if(s.canCollide)
				this.quadtree!.insert(s);
		});

		const tempArray:Sprite[] = this.collisionListeners.slice();
		while (tempArray.length) {
			const sprite:Sprite = tempArray.pop()!;
			if(!sprite.isAlive){
				this.removeSprite(sprite);
				continue;
			}
			if(!sprite.handleCollision)
				throw Error("Only collision listeners should be in list\n" + sprite);
			const nearSprites = this.quadtree!.retrieve(sprite) as Sprite[];
			for(let i =0; i< nearSprites.length;i++){
				const otherSprite = nearSprites[i];
				if (otherSprite && sprite !== otherSprite && 
					!(sprite.isFixedPosition && otherSprite.isFixedPosition)
				) {
					if(sprite.isFixedPosition && otherSprite.lastPosition){
						const newrect = union({x: otherSprite.lastPosition.x, y: otherSprite.lastPosition.y,
							width:otherSprite.width, height: otherSprite.height}, otherSprite);
						if(intersects(sprite, newrect)){
							sprite.handleCollision(otherSprite);
							otherSprite.x = otherSprite.lastPosition!.x;
							otherSprite.y = otherSprite.lastPosition!.y;						}
					}else if (Scene._checkIntersects(sprite, otherSprite)) {
						sprite.handleCollision(otherSprite);
					}
					if(!otherSprite.isAlive)
						this.removeSprite(otherSprite);
					if(!sprite.isAlive){
						this.removeSprite(sprite);
						break;
					}
				}
			}
		}
	}


	count =0;
	totalTime =0;
	paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number):void {
        //enable you to embed a scene as a sprite in another scene
		location = {x: location.x + this.viewPort.x, y:location.y+this.viewPort.y}; 
		this.paintBackground(ctx);
		if(this.tileMap){
			this.tileMap.paint({position:location, size:this},  ctx, timeSinceLastAnimation);
		}
		let displayedSprites =0
		for(let sprite of this.sprites){
			if(!sprite.isAlive)
				throw Error("No Dead Sprites Should Make it to render step.\n" + sprite);
			let pos = pointAsInt(sprite);
				if(!sprite.isFixedPosition){
					pos = {x: pos.x - location.x, y: pos.y - location.y}
				}
			if(pos.x > this.width || pos.y > this.height 
				|| (sprite.width + pos.x < 0)
				|| (sprite.height + pos.y < 0)){
				continue;
			}
			sprite.paint(pos, ctx, timeSinceLastAnimation);
			displayedSprites++;
		}
		
		if(++this.count % 300 === 0){
			this.totalTime  = timeSinceLastAnimation;
			this.count =1;
		}else{
			this.totalTime +=timeSinceLastAnimation;
		}
		const stats = {
			fps: Math.round(1000 / (this.totalTime/ this.count)),
			displayedSpriteCount: displayedSprites,
			spriteCount: this.sprites.length,
			collisionHandlers: this.collisionListeners.length,
			totalTime: this.totalTime	
		};
		this.controller.performanceStats = stats;
		if(this.debug){
			ctx.fillStyle = "red"
			ctx.font ="8px Electrolize";
			ctx.fillText(`FPS: ${stats.fps} Alive: ${stats.spriteCount} On Screen: ${stats.displayedSpriteCount} Collision Handlers: ${stats.collisionHandlers}` , 10, this.height -10);
		}
	}

	paintBackground(ctx: CanvasRenderingContext2D):void {
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, this.width, this.height);
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
		if(sprite.x + sprite.width < 0 || sprite.y + sprite.height < 0 )
			return `Sprite position less 0 (${sprite.x}, ${sprite.y})`;
		if(this.modelSize.width !==0){
			if(sprite.x >= this.modelSize.width || sprite.y >= this.modelSize.height)
				return `Sprite position(${sprite.x}, ${sprite.y}) > model(${this.modelSize.width},${this.modelSize.height})`;
		}else if(sprite.x >= this.width || sprite.y >= this.height) {
			return `Sprite position(${sprite.x}, ${sprite.y})  > screen(${this.width},${this.height})`;
		}
		if(sprite.width <=0 || sprite.height <= 0)
			return `Sprite size too small (${sprite.width}, ${sprite.height})`;
		if( sprite.vector.x === undefined || sprite.vector.y === undefined)
			return `X speed(${sprite.vector.x}) and y speed(${sprite.vector.y}) need to be both defined.`;
		return undefined;
	}
	_handleWrap(sprite:Sprite):boolean{
		// handle wrap around
		let wrapped = false;
		if (this.wrapAround) {
			let width = this.width;
			let height = this.height;
			if(this.modelSize.width !==0){
				width= this.modelSize.width;
				height = this.modelSize.height;
			}
			if (sprite.x + sprite.width < 0) {
				sprite.x = width - sprite.width;
				wrapped = true;
			} else if (sprite.x > width) {
				sprite.x = 0;
				wrapped = true;
			}
			if (sprite.y + sprite.height < 0) {
				sprite.y = height - sprite.height;
				wrapped = true;
			} else if (sprite.y  > height) {
				sprite.y = 0;
				wrapped = true;
			}
		}	
		return wrapped;
	}
	static _checkIntersects(sprite1:Sprite, sprite2:Sprite):boolean{
		if(sprite1.circularCollision && sprite2.circularCollision){
			const p1 =centerPosition(sprite1);
			const p2 = centerPosition(sprite2);
			const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
			const radius = (sprite1.width + sprite1.height + sprite2.width + sprite2.height) / 4;
			return (distance < radius);
		}
		return intersects(sprite1, sprite2);
	}


}