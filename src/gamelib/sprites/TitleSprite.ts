import { Sprite } from "../types/Sprite";
import { Point } from "../types/Point";
import { Size } from "../types/Size";

export class TitleSprite implements Sprite{
    name: string = 'Title';
    position: Point = {x:0,y:0};
    size: Size = {width:1, height:1};
    isAlive: boolean = true;
    zOrder: number = 100;
    canCollide: boolean = false;
    isFixedPosition = true;
    title:string;
    subtitle1:string;
    subtitle2:string;

    constructor(title:string, subtitle1:string, subtitle2:string){
        this.title = title;
        this.subtitle1 = subtitle1;
        this.subtitle2 = subtitle2;
    }

    paint(location: Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void {
        //ctx.measureText
        const w = ctx.canvas.width,  h = ctx.canvas.height;
        const oldFont = ctx.font;
        function shadowText(txt:string, x:number,y:number, i:number){
            ctx.fillStyle = "grey";
            ctx.fillText(txt, x+i, y+i);
            ctx.fillStyle = "white";
            ctx.fillText(txt, x,y);
        }

        ctx.font = (w>500) ? (w>800) ? "110px Electrolize": "60px Electrolize" : "45px Electrolize";
        let measure = ctx.measureText(this.title);
        let hpos = h/3;
        shadowText(this.title, (w-measure.width)/2, hpos, 3);
        const subHeight = (w>500) ? (w>800) ? 30: 24 : 18;
        ctx.font = `${subHeight}px Electrolize`;
        measure = ctx.measureText(this.subtitle1);
        hpos += subHeight*2;
        shadowText(this.subtitle1, (w-measure.width)/2,hpos, 1);

        measure = ctx.measureText(this.subtitle2);
        hpos += subHeight*2;
        shadowText(this.subtitle2, (w-measure.width)/2,hpos,1);

        ctx.font = oldFont;
    }

}