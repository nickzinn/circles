import { Size } from "../types/Size";
import { Point } from "../types/Point";

export class SpriteSheet{
    readonly rows:number;
    readonly columns:number;
    readonly image:HTMLImageElement;
    readonly size:Size;
    constructor(image:HTMLImageElement, rows:number = 1, columns:number =1) {
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.size = {width:Math.floor(this.image.width/this.columns),
            height: Math.floor(this.image.height/this.rows)}
    }
    paint(location:Point, ctx: CanvasRenderingContext2D, angle:number= 0,row:number=1, column:number=1):void{
        if(row<1 || row > this.rows || column < 1 || column > this.columns)
            throw Error(`Row and columns of sprite need to be in bounds (${row},${column})`);
        const w = this.size.width, h = this.size.height;
        if(angle){
            ctx.translate(location.x + w / 2.0, location.y+ h / 2.0);
            ctx.rotate(angle);
            location.x = 0 - w / 2.0;
            location.y = 0 - h / 2.0;
        }
        if(this.columns === 1 && this.rows === 1)
            ctx.drawImage(this.image, location.x, location.y, w , h);
        else{
            const srcX = Math.floor(this.image.width * ((column-1)/this.columns));
            const srcY = Math.floor(this.image.height * ((row-1)/this.rows));
            ctx.drawImage(this.image, srcX, srcY, w, h, location.x, location.y, w, h);
        }
        if(angle){
            ctx.setTransform(1, 0, 0, 1, 0, 0);    
        }
    }
    get frameCount():number{
        return this.rows*this.columns;
    }
}