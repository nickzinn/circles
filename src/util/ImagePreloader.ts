import { SpriteSheet } from "./SpriteSheet";
import { Size } from "../types/Size";
import { Rectangle } from "../types/Rectangle";

export interface PreloadImage{
    name:string;
    src:string;
    type:string;
    rows?:number;
    columns?:number;
    scale?:number;
    angleOffset?:number;
    fixRow?:number;
    fixColumn?:number;
    noTransparent?:boolean;
}
const VALID_TYPES = ['rotate', 'animate', 'static'];

function makeTransparent(image: HTMLImageElement):HTMLImageElement  {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.height = image.height;
    canvas.width = image.width;
    ctx.drawImage(image,0,0);
    const imgd = ctx.getImageData(0, 0, image.width, image.height);
    const pix = imgd.data;
    const newColor = {r:0,g:0,b:0, a:0};
    let top:number[]
    for (let i = 0, n = pix.length; i <n; i += 4) {
        const r = pix[i], g = pix[i+1],b = pix[i+2];
        if(i===0){
            top = [r,g,b];
        }
        if(r === top![0] && g === top![1] && b === top![2]){ 
            // Change the white to whatever.
            pix[i] = newColor.r;
            pix[i+1] = newColor.g;
            pix[i+2] = newColor.b;
            pix[i+3] = newColor.a;
        }
    }
    ctx.putImageData(imgd, 0,0);
    const output = document.createElement('img');
    output.src = canvas.toDataURL('image/png');
    return output;
}


export class ImagePreloader{
    imageCache: Map<string,SpriteSheetImpl> = new Map();
    loadsCompleted:number =0;
    nLoads:number = 0;

    private loadCallback?:() => void;

    registerCallback(callback:() => void  ){
        if(this.loadsCompleted === this.nLoads)
            callback();
        this.loadCallback = callback;
    }
    
    getSpriteSheetFromCache(key:string):SpriteSheet{
        const spriteSheet = this.imageCache.get(key);
        if(!spriteSheet)
            throw Error("unable to load image: " + key);
        return spriteSheet;
    }
    getImageFromCache(key:string):HTMLImageElement{
        const spriteSheet = this.imageCache.get(key);
        if(!spriteSheet)
            throw Error("unable to load image: " + key);
        return spriteSheet.image;
    }
    
    preLoadImages(images:PreloadImage[]):void{
        
        for(let des of images){
            if(VALID_TYPES.indexOf(des.type) === -1)
                throw Error(`Invalid type: ${des.type}`);
            const image = new Image();
            this.nLoads++;
            image.src = des.src;
            image.onload = this._createOnLoad(image, des);
        }
    }
    private _createOnLoad(image:HTMLImageElement, des:PreloadImage){
        return () => {
            if(des.noTransparent){
                this._cache(image, des)();
            }else{
                const newImage = makeTransparent(image);
                newImage.onload =  this._cache(newImage, des);
            }
        };
    }
    private _cache(image:HTMLImageElement, des:PreloadImage){
        return () => {
            const rows = (des.rows) ? des.rows : 1;
            const columns = (des.columns) ? des.columns :1;
            
            const sheet = new SpriteSheetImpl(image, rows, columns, des);
            this.imageCache.set(des.name, sheet);
            if(++this.loadsCompleted === this.nLoads && this.loadCallback){
                this.loadCallback();
            }
        }
    }
}

class SpriteSheetImpl implements SpriteSheet{
    readonly rows:number;
    readonly columns:number;
    readonly size:Size;
    readonly type:string;
    readonly frameCount:number;

    description:PreloadImage;
    image:HTMLImageElement;
    private srcSize:Size;

    constructor(image:HTMLImageElement, rows:number, columns:number, description:PreloadImage) {
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.srcSize = {width:Math.floor(this.image.width/this.columns),
            height: Math.floor(this.image.height/this.rows)};
        if(description.scale){
            this.size = {width:Math.floor(this.srcSize.width * description.scale), height:Math.floor(this.srcSize.height * description.scale)};
            this._preRenderScaledImage(description.scale);
        }else{
            this.size = this.srcSize;
        }
        this.description = description;
        this.type = description.type;
        this.frameCount = this.rows*this.columns;
    }
    paint(ctx: CanvasRenderingContext2D, frame:number, angle:number, source:Rectangle, dest:Rectangle):void{    
        let column, row;

        if(this.description.type === 'static'){
            column = (this.description.fixColumn) ? this.description.fixColumn : 0;
            row = (this.description.fixRow) ? this.description.fixRow : 0;
            angle =0;
		}else{
            frame = Math.min(frame, this.frameCount-1);
            column = Math.floor(frame % this.columns);
            row = Math.floor( frame/this.columns );        
        }

        let x = dest.position.x, y= dest.position.y;
        if(row<0 || row >= this.rows || column < 0 || column >= this.columns)
            throw Error(`Row and columns of sprite need to be in bounds (${row},${column})`);
        if(this.description.angleOffset)
            angle += this.description.angleOffset;
        if(angle){
            ctx.translate(x + this.size.width / 2.0, y+ this.size.height / 2.0);
            ctx.rotate(angle);
            x = 0 - this.size.width / 2.0;
            y = 0 - this.size.height / 2.0;
        }

        const srcX = Math.floor(this.image.width * ((column)/this.columns)) + source.position.x;
        const srcY = Math.floor(this.image.height * ((row)/this.rows)) + source.position.y;
            ctx.drawImage(this.image, srcX, srcY, source.size.width, source.size.height,
                 x, y, dest.size.width, dest.size.height);
        if(angle){
            ctx.setTransform(1, 0, 0, 1, 0, 0);    
        }
    }
    private _preRenderScaledImage(scale:number){
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const image = this.image;

        const w = Math.floor(image.width * scale) , h = Math.floor(image.height * scale);
        canvas.height = h;
        canvas.width = w;
        ctx.drawImage(this.image, 0, 0, image.width, image.height, 0, 0, w, h);
        const output = document.createElement('img');
        output.src = canvas.toDataURL('image/png');
        output.onload = () =>{
            this.srcSize = {width:Math.floor(w/this.columns),
                height: Math.floor(h/this.rows)};
            this.image = output; 
        };
    }
}

//export var __IMAGEPRELOADER__:ImagePreloader = new ImagePreloader();
