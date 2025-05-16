import { Tile } from "./Tile";
import { ImagePreloader } from "../util/ImagePreloader";
import { SpriteSheet } from "../util/SpriteSheet";
import { Size } from "../types/Size";
import { EMPTY_TILE } from "./TileMap";
import { Rectangle } from "../types/Rectangle";

class StaticTile implements Tile{
    name:string;
    size:Size;
    spriteSheet:SpriteSheet;

    constructor(name:string, spriteSheet:SpriteSheet){
        this.spriteSheet = spriteSheet;
        this.size = spriteSheet.size;
        this.name = name;
    }

    paint(ctx: CanvasRenderingContext2D, frameCount60FPS:number, angle:number, source:Rectangle, dest:Rectangle):void{
        this.spriteSheet.paint(ctx, frameCount60FPS, angle, source, dest );
    }
}

export class TileAtlas {
    tiles:Tile[] = [];
    nameToIndexMap:Map<string, number> = new Map();
    imagePreloader:ImagePreloader;

    constructor(imagePreloader:ImagePreloader){
        this.imagePreloader = imagePreloader;
    }
    
    getTile(index: number): Tile{
        return this.tiles[index];
    }
    addTile(name:string):number{
        const spriteSheet = this.imagePreloader.getSpriteSheetFromCache(name);
        const tile = new StaticTile(name, spriteSheet);
        const index = this.tiles.push(tile) -1;
        this.nameToIndexMap.set(tile.name, index);
        return index;
    }
    convertLogicMapStringToIndex(logicMap:string[][]):number[][]{
        const rv:number[][] = [];
        for(let i=0; i< logicMap.length; i++){
            const array = new Array<number>(logicMap[i].length);
            for(let j=0; j<logicMap[i].length; j++){
                const name = logicMap[i][j];
                let index;
                if(!name || name.length === 0)
                    index = EMPTY_TILE;
                else{
                    index = this.nameToIndexMap.get(name);
                    if(index === undefined){
                        index = this.addTile(name);
                    }
                }
                array[j] = index;
            }
            rv[i] = array;
        }
        return rv;
    }
}
