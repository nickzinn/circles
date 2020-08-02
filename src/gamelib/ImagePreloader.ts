
export interface PreloadImage{
    name:string;
    src:string;
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
    imageCache: Map<string,HTMLImageElement> = new Map();
    loadsCompleted:number =0;
    nLoads:number = 0;

    private loadCallback?:() => void;

    registerCallback(callback:() => void  ){
        if(this.loadsCompleted === this.nLoads)
            callback();
        this.loadCallback = callback;
    }
    
    getImageFromCache(key:string):HTMLImageElement{
        const image = this.imageCache.get(key);
        this.nLoads++;
        if(!image)
            throw Error("unable to load image: " + key);
        return image;
    }
    
    preLoadImages(images:PreloadImage[]):void{
        
        for(let des of images){
            const image = new Image();
            this.nLoads++;
            image.src = des.src;
            image.onload = this._createOnLoad(image, des.name);
        }
    }
    private _createOnLoad(image:HTMLImageElement, key:string){
        return () => {
            const newImage = makeTransparent(image);
            newImage.onload = () => {
                this.imageCache.set(key, newImage);
                if(++this.loadsCompleted === this.nLoads && this.loadCallback){
                    this.loadCallback();
                }
            }
        };
    }
}

//export var __IMAGEPRELOADER__:ImagePreloader = new ImagePreloader();
