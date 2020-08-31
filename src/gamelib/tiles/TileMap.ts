import { Size } from "../types/Size";
import { Point } from "../types/Point";
import { Camera } from "../types/Camera";
import { TileAtlas } from "./TileAtlas";
import { Tile } from "./Tile";

export const EMPTY_TILE = -1;

// logicGrid: [[
//     3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
//     3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
//     3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
//     3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
//     3, 3, 3, 1, 1, 2, 3, 3, 3, 3, 3, 3
// ], [
//     4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
//     4, 4, 4, 0, 5, 4, 4, 4, 4, 4, 4, 4,
//     4, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3
// ]],

export class TileMap{
    tileSize:Size;
    tileAtlas:TileAtlas;
    rows:number;
    columns:number;


    private readonly logicGrid:number[][];

    readonly worldSize:Size;

    constructor(tileAtlas:TileAtlas, rows:number, columns:number, logicGrid:string[][], tileSize:Size|undefined = undefined){
        logicGrid.forEach( (a) => {
            if(!a  || rows*columns !== a.length)
                throw Error(`Length of array (${!a || a.length}) doesn't match rows(${rows}) columns(${columns}).`)
        });
        this.tileAtlas = tileAtlas;
        this.rows = rows;
        this.columns = columns;
        this.logicGrid = tileAtlas.convertLogicMapStringToIndex(logicGrid);
        this.tileSize = (tileSize !== undefined) ? tileSize : calcDefaultTileSize(this.logicGrid, tileAtlas);
        this.worldSize = {width: this.tileSize.width * columns, height: this.tileSize.height * rows};
    }

    addTile(name:string, layer:number, row:number, column:number){
        const index = this.tileAtlas.nameToIndexMap.get(name);
        if(!index)
            throw Error(`Tile not found`)
        this.logicGrid[layer][this.rows * row + column] = index;
    }

    removeTile(layer:number, row:number, column:number){
        this.logicGrid[layer][this.rows * row + column] = EMPTY_TILE;
    }

    getRowAtY(y:number):number{
        return Math.floor(y /this.tileSize.height);
    }

    getColumnAtX(x:number):number{
        return Math.floor(x /this.tileSize.width);
    }

    getTilesAtPosition(position:Point, layer:number):Tile | undefined{
        const row = this.getRowAtY(position.y);
        const column = this.getColumnAtX(position.x);
        return this.getTilesAt(row, column, layer);
    }

    getTilesAt(row:number, column:number, layer:number):Tile | undefined{
        const id = this.logicGrid[layer][this.rows * row + column];
        return (id === EMPTY_TILE) ? undefined : this.tileAtlas.getTile(id);
    }

    private age =0;
    paint(camera:Camera,  ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number){
        this.age+=timeSinceLastAnimation;
        const frameCount60FPS = Math.floor(this.age / (1000/60));
        const startRow = this.getRowAtY(camera.position.y);
        const endRow = this.getRowAtY(camera.position.y + camera.size.height);
        const startColumn = this.getColumnAtX(camera.position.x);
        const endColumn = this.getColumnAtX( camera.position.x + camera.size.width );
        const wsz = this.worldSize, tsz = this.tileSize;
        for(let column = startColumn; column<= endColumn; column++){
            for(let row = startRow; row<=endRow; row++){
                //draw and clip viewport
                let w= Math.min( tsz.width, wsz.width - ((column) * tsz.width ) );
                let h= Math.min( tsz.height, wsz.height - ((row) * tsz.height ));

                let x1 = ((column) * tsz.width ) - camera.position.x;
                let y1 = ((row) * tsz.height ) - camera.position.y;

                let srcX=0, srcY=0;
                //clip drawing.
                if(x1 < 0){
                    srcX = x1 * -1;
                    w -= srcX;
                    x1 =0;
                    if( w <=0)
                        continue; 
                }
                if(y1 < 0){
                    srcY = y1 * -1;
                    h -= srcY;
                    y1 =0;
                    if( h <=0)
                        continue; 
                }
                if(x1+w > camera.size.width){
                    w -=  (x1 + w) - camera.size.width;
                    if(w<=0)
                        continue;
                }
                if(y1+h > camera.size.height){
                    h -=  (y1 + h) - camera.size.height;
                    if(h<=0)
                        continue;
                }
                for(let layer = 0; layer<this.logicGrid.length; layer++){
                    const tile = this.getTilesAt(row, column, layer);
                    if(tile){
                        tile.paint(ctx, frameCount60FPS, 0, {position:{x:srcX, y:srcY}, size: {width:w, height:h}}, {position:{x:x1, y:y1}, size: {width:w, height:h}} );
                    }
                }
            }
        }
    }
}


function calcDefaultTileSize(logicGrid:number[][], tileAtlas:TileAtlas):Size{
    let index:number | undefined = undefined;
    for(let grid of logicGrid){
        for(let i of grid){
            if(i !== EMPTY_TILE){
                index = i;
                break;
            }
        }
    }
    if(index === undefined){
        throw Error(`Logic Grid is empty!`);
    }
    const tile = tileAtlas.getTile(index);
    return tile.size;
}