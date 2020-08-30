import { Point } from "../types/Point";
import { Size } from "../types/Size";
import { Rectangle } from "../types/Rectangle";


/**
 * Tile
 * 
 * Unlike a sprite, a tile shouldn't maintain any state other than painting
 * 
 * Rectangular tiles
 * Layers
 * Scrolling
 * Rendering
 * 
 */
export interface Tile {
    name:string;
    size:Size;
    paint(ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number, angle:number, source:Rectangle, dest:Rectangle):void;
}