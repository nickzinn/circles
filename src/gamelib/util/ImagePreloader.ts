import { SpriteSheet } from "./SpriteSheet";
import { Size } from "../types/Size";
import { Point } from "../types/Point";

export interface PreloadImage{
    name:string;
    src:string;
    rows?:number;
    columns?:number;
    scale?:number;
    angle?:number;
    type?:string;
    noTransparent?:boolean;
}


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
            
            const sheet = new SpriteSheetImpl(image, rows, columns, (des.scale)? des.scale: 1.0,
             (des.angle) ? des.angle : 0, (des.type) ? des.type: 'animate');
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
    readonly angle:number;
    readonly size:Size;
    readonly type:string;

    image:HTMLImageElement;
    private srcSize:Size;

    constructor(image:HTMLImageElement, rows:number = 1, columns:number =1, scale:number=1.0, angle:number=0, type:string ='animate') {
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.srcSize = {width:Math.floor(this.image.width/this.columns),
            height: Math.floor(this.image.height/this.rows)};
        if(scale !== 1){
            this.size = {width:Math.floor(this.srcSize.width * scale), height:Math.floor(this.srcSize.height * scale)};
            this._preRenderScaledImage(scale);
        }else{
            this.size = this.srcSize;
        }
        this.angle = angle;
        this.type = type;
    }
    paint(location:Point, ctx: CanvasRenderingContext2D, angle:number= 0,row:number=0, column:number=0):void{
        let x = location.x, y= location.y;
        if(row<0 || row >= this.rows || column < 0 || column >= this.columns)
            throw Error(`Row and columns of sprite need to be in bounds (${row},${column})`);
        angle += this.angle;
        if(angle){
            ctx.translate(x + this.size.width / 2.0, y+ this.size.height / 2.0);
            ctx.rotate(angle);
            x = 0 - this.size.width / 2.0;
            y = 0 - this.size.height / 2.0;
        }
        if(this.columns === 0 && this.rows === 0)
            ctx.drawImage(this.image, 0, 0, this.srcSize.width, this.srcSize.height,
                x, y, this.size.width, this.size.height);
        else{
            const srcX = Math.floor(this.image.width * ((column)/this.columns));
            const srcY = Math.floor(this.image.height * ((row)/this.rows));
            ctx.drawImage(this.image, srcX, srcY, this.srcSize.width, this.srcSize.height,
                 x, y, this.size.width, this.size.height);
        }
        if(angle){
            ctx.setTransform(1, 0, 0, 1, 0, 0);    
        }
    }

    get frameCount():number{
        return this.rows*this.columns;
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
