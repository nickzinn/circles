import { Size } from "../types/Size";
import { Point } from "../types/Point";

export interface SpriteSheet{
    size:Size;
    readonly rows:number;
    readonly columns:number;
    readonly angle:number;
    readonly type:string;
    readonly frameCount:number;

    paint(location:Point, ctx: CanvasRenderingContext2D, angle:number,row:number, column:number):void;

}