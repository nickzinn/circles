import { Size } from "../types/Size";
import { Point } from "../types/Point";

const emptySize = {width:0, height:0}

export class SpriteSheet{
    readonly rows:number;
    readonly columns:number;
    readonly image:HTMLImageElement;
    readonly angle:number;
    readonly type:string;
    size:Size;
    readonly srcSize:Size;

    constructor(image:HTMLImageElement, rows:number = 1, columns:number =1, scale:number=1.0, angle:number=0, type:string ='animate') {
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.srcSize = {width:Math.floor(this.image.width/this.columns),
            height: Math.floor(this.image.height/this.rows)};
        this.size = emptySize;
        this.scale = scale;
        this.angle = angle;
        this.type = type;
    }
    paint(location:Point, ctx: CanvasRenderingContext2D, angle:number= 0,row:number=1, column:number=1):void{
        if(row<1 || row > this.rows || column < 1 || column > this.columns)
            throw Error(`Row and columns of sprite need to be in bounds (${row},${column})`);
        angle += this.angle;
        if(angle){
            ctx.translate(location.x + this.size.width / 2.0, location.y+ this.size.height / 2.0);
            ctx.rotate(angle);
            location.x = 0 - this.size.width / 2.0;
            location.y = 0 - this.size.height / 2.0;
        }
        if(this.columns === 1 && this.rows === 1)
            ctx.drawImage(this.image, 0, 0, this.srcSize.width, this.srcSize.height,
                location.x, location.y, this.size.width, this.size.height);
        else{
            const srcX = Math.floor(this.image.width * ((column-1)/this.columns));
            const srcY = Math.floor(this.image.height * ((row-1)/this.rows));
            ctx.drawImage(this.image, srcX, srcY, this.srcSize.width, this.srcSize.height,
                 location.x, location.y, this.size.width, this.size.height);
        }
        if(angle){
            ctx.setTransform(1, 0, 0, 1, 0, 0);    
        }
    }
    set scale(scale:number){
        this.size = {width:Math.floor(this.srcSize.width * scale), height:Math.floor(this.srcSize.height * scale)};
    }

    get frameCount():number{
        return this.rows*this.columns;
    }
}