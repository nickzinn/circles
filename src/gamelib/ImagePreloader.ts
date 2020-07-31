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
    
    preLoadImage(key:string, path:string):void{
        const image = new Image();
        this.nLoads++;
        image.src = path;
    
        image.onload = () => { 

            this.imageCache.set(key, image);
            if(++this.loadsCompleted === this.nLoads && this.loadCallback){
                this.loadCallback();
            }
        };
    }

}

//export var __IMAGEPRELOADER__:ImagePreloader = new ImagePreloader();
