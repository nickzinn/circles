import { Point } from "../types/Point";
import { SpriteSheet } from "./SpriteSheet";
import { centerPosition, union } from "../types/Rectangle";

/**
 * blends one image (secondary) into another image (primary)
 */
export class BlendedSpriteSheet implements SpriteSheet{
    primarySpriteSheet:SpriteSheet;
    secondarySpriteSheet:SpriteSheet;
    blend:string;
    blendAmount:number;
    constructor(primarySpriteSheet:SpriteSheet, secondarySpriteSheet:SpriteSheet, blend:string = 'add'){
        this.blend = blend;
        this.primarySpriteSheet = primarySpriteSheet;
        this.secondarySpriteSheet = secondarySpriteSheet;
        this.blendAmount = 1.0;
    }
    paint(location:Point, ctx: CanvasRenderingContext2D, angle:number,row:number, column:number):void{
        this.primarySpriteSheet.paint(location, ctx, angle, row, column);
        
        //place secondary image in the center of primary.
        const center = centerPosition({position:location, size: this.primarySpriteSheet.size});
        const w2 = this.secondarySpriteSheet.size.width, h2 = this.secondarySpriteSheet.size.height;
        const location2 = {x: Math.floor(center.x - w2/2),
                        y: Math.floor(center.y - h2/2)  }
        const out = union( {position:location, size: this.primarySpriteSheet.size}, 
            {position:location2, size: this.secondarySpriteSheet.size} );
        const baseIM = ctx.getImageData(out.position.x, out.position.y, out.size.width, out.size.height);

        ctx.fillStyle = "black";
        ctx.fillRect(location2.x, location2.y, w2, h2);

        this.secondarySpriteSheet.paint(location2,ctx,0,1,1);
        const id2 = ctx.getImageData(location2.x, location2.y, w2, h2);

        const data2= id2.data;
        const dataBase = baseIM.data;
        const offsetx = location2.x - out.position.x, offsety = location2.y - out.position.y;
        if(this.blend === 'add'){
            add(dataBase, out.size.width, out.size.height, data2, offsetx, offsety, w2, h2, this.blendAmount);
        }else if(this.blend === 'subtract'){
            subtract(dataBase, out.size.width, out.size.height, data2,  offsetx, offsety, w2, h2);
        }
        ctx.putImageData(baseIM, out.position.x, out.position.y);
    }
    get rows(){
        return this.primarySpriteSheet.rows;
    }
    get columns(){
        return this.primarySpriteSheet.columns;
    }
    get angle(){
        return this.primarySpriteSheet.angle;
    }
    get size(){
        return this.primarySpriteSheet.size;
    }
    set size(size){
        this.primarySpriteSheet.size = size;
    }
    get type(){
        return this.primarySpriteSheet.type;
    }
    get frameCount(){
        return this.primarySpriteSheet.frameCount;
    }
}
function add(data1: Uint8ClampedArray, w1: number, h1: number, 
    data2: Uint8ClampedArray, offsetx:number, offsety:number, w2: number, h2: number, blendAmount:number){
    for (let x2 = 0; x2 < w2; x2++) {
        for (let y2 = 0; y2 < h2; y2++) {
            const x1 = x2 + offsetx, y1 = y2 + offsety;
            let index1 = (y1 * w1 + x1) * 4;
            let index2 = (y2 * w2 + x2) * 4;
            data1[index1] = Math.min(Math.floor(data2[index2] * blendAmount) + data1[index1], 255); //red
            data1[++index1] = Math.min(Math.floor(data2[++index2] * blendAmount) + data1[index1], 255); //green
            data1[++index1] = Math.min(Math.floor(data2[++index2] * blendAmount) + data1[index1], 255); //blue
            data1[++index1] = 255;
        }
    }
}

function subtract(data1: Uint8ClampedArray, w1: number, h1: number, data2: Uint8ClampedArray, offsetx:number, offsety:number,w2: number, h2: number){
}

