import { SpriteSheet } from "./SpriteSheet";

export interface PreloadImage{
    name:string;
    src:string;
    rows?:number;
    columns?:number;
    scale?:number;
    angle?:number;
    type?:string;
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
    imageCache: Map<string,SpriteSheet> = new Map();
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
        this.nLoads++;
        if(!spriteSheet)
            throw Error("unable to load image: " + key);
        return spriteSheet;
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
            const newImage = makeTransparent(image);
            newImage.onload = () => {
                const rows = (des.rows) ? des.rows : 1;
                const columns = (des.columns) ? des.columns :1;
                
                const sheet = new SpriteSheet(newImage, rows, columns, (des.scale)? des.scale: 1.0,
                 (des.angle) ? des.angle : 0, (des.type) ? des.type: 'animate');
                this.imageCache.set(des.name, sheet);
                if(++this.loadsCompleted === this.nLoads && this.loadCallback){
                    this.loadCallback();
                }
            }
        };
    }
}

//export var __IMAGEPRELOADER__:ImagePreloader = new ImagePreloader();
