import { Size } from "../types/Size";
import { Rectangle } from "../types/Rectangle";

export interface SpriteSheet{
    size:Size;
    readonly rows:number;
    readonly columns:number;
    readonly type:string;
    readonly frameCount:number;
    paint(ctx: CanvasRenderingContext2D, frame:number, angle:number, source:Rectangle, dest:Rectangle):void;
}