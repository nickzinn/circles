import { Point } from "../types/Point";
import { Size } from "../types/Size";


/**
 * 
 * Rectangular tiles
 * Layers
 * Scrolling
 * Rendering
 * 
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation%3A_Scrolling_maps
 * 
 */

/**
 * Unlike a sprite, a tile shouldn't maintain any state other than painting
 */
interface Tile {
    name:string;
    size:Size;
    paint(location:Point, paintArea:Size, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void;
}

 interface TileAtlas{
    //tileMap:Map<string, Sprite>;

    //getTile(name:string): Tile;
    getTile(index:number): Tile;
 }

interface Camera{
    position:Point;
    size:Size;
}

//interface TablePosition
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

const EMPTY_TILE = 0;

class TileMap{
    tileSize:Size;
    tileAtlas:TileAtlas;
    rows:number;
    columns:number;
    logicGrid:number[][];


    readonly worldSize:Size;

    constructor(tileSize:Size, tileAtlas:TileAtlas, rows:number, columns:number, logicGrid:number[][]){
        this.tileSize = tileSize;
        this.tileAtlas = tileAtlas;
        this.rows = rows;
        this.columns = columns;
        this.logicGrid = logicGrid;
        this.worldSize = {width: tileSize.width * columns, height: tileSize.height * rows};
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

    paint(camera:Camera,  ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number){
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
                        tile.paint({x:x1,y:y1}, {width:w, height:h}, ctx,timeSinceLastAnimation);
                    }
                }
            }
        }
    }
}