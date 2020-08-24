import Scene from "../../gamelib/Scene";
import { SpaceGame } from "./SpaceGame";
import { Point } from "../../gamelib/types/Point";

export class BackgroundScene extends Scene<SpaceGame> {
    stars:Point[] = []

    paintBackground(ctx: CanvasRenderingContext2D) {
        const image = this.controller.imagePreloader.getImageFromCache(this.name);
        const sz = (this.modelSize.width === 0) ? this.size : this.modelSize;
        const p = (this.modelSize.width === 0) ? {x:0,y:0} : this.viewPort;
  
        const rows = Math.floor(sz.height / image.height) + 1;
        const columns = Math.floor(sz.width / image.width) + 1;
        for(let row = 0; row <rows; row++){
            for(let col =0; col<columns; col++){
                //draw and clip viewport
                let w= Math.min( image.width, sz.width - ((col) * image.width ) );
                let h= Math.min( image.height, sz.height - ((row) * image.height ));

                let x1 = ((col) * image.width ) - p.x;
                let y1 = ((row) * image.height ) - p.y;

                let srcX=0, srcY=0;
                //clip drawing.
                if(x1 < 0){
                    srcX = x1 * -1;
                    w -= srcX;
                    x1 =0;
                    if( w <=0)
                        continue; 
                }
                if(y1 < 0){
                    srcY = y1 * -1;
                    h -= srcY;
                    y1 =0;
                    if( h <=0)
                        continue; 
                }
                if(x1+w > this.size.width){
                    w -=  (x1 + w) - this.size.width;
                    if(w<=0)
                        continue;
                }
                if(y1+h > this.size.height){
                    h -=  (y1 + h) - this.size.height;
                    if(h<=0)
                        continue;
                }
                ctx.drawImage(image, srcX, srcY,w,h,x1,y1,w,h);
            }
        }
    }
}