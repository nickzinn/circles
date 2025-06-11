
import { DefaultSprite } from "./DefaultSprite.js";
import { Point } from "../types/Point.js";

export class CountdownSprite extends DefaultSprite{
    timeInMillis:number;
    fontStyle:string;
    age = 0;
    color:string;
    fontHeight:number;

    constructor(timeInMillis:number, color:string="red", fontStyle = "100px Electrolize", fontHeight = 80){
        super("CountdownTimer");
        this.timeInMillis = timeInMillis;
        this.fontStyle = fontStyle;
        this.width = fontHeight*Math.floor(timeInMillis/2500).toString().length;
        this.height = fontHeight;
        this.color = color;
        this.fontHeight = fontHeight;
	}

    paint(location:Point, ctx: CanvasRenderingContext2D, timeSinceLastAnimation: number): void{
        // ctx.fillStyle = "blue";
        // ctx.fillRect(location.x, location.y, this.size.width, this.size.height);

        const displayTime = Math.floor((this.timeInMillis - this.age)/1000).toString();
        ctx.fillStyle = this.color;
        ctx.font = this.fontStyle;
        
        ctx.fillText(displayTime, location.x, location.y+this.height);
        
        
        
    }

    updateModel(timeSinceLastUpdate: number):void{
        this.age += timeSinceLastUpdate;
        if(this.age >this.timeInMillis )
            this.isAlive = false;
    }
}

