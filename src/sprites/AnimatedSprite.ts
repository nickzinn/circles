import { Point } from "../types/Point.js";
import { SpriteSheetBehavior } from "./behaviors/SpriteSheetBehavior.js";
import { DefaultSprite } from "./DefaultSprite.js";
import Scene from "../Scene.js";


export class AnimatedSprite extends DefaultSprite{
    scene:Scene;
    spriteSheetBehavior:SpriteSheetBehavior;

    constructor(scene:Scene, name:string,x:number = 0.0, y:number = 0.0,animateOnce:boolean =false){
        super(name, x, y);
        this.scene = scene;
        const spriteSheet = scene.controller.imagePreloader.getSpriteSheetFromCache(name)
        this.spriteSheetBehavior =   new SpriteSheetBehavior(spriteSheet, animateOnce);
        this.addBehavior(this.spriteSheetBehavior);
    }
    set animateOnce(animateOnce:boolean){
        this.spriteSheetBehavior.animateOnce = animateOnce;
    }
    get animateOnce(){
        return this.spriteSheetBehavior.animateOnce;
    }
}