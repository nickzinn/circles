import { Point } from "../types/Point";
import { SpriteSheetBehavior } from "./behaviors/SpriteSheetBehavior";
import { DefaultSprite } from "./DefaultSprite";
import Scene from "../Scene";


export class AnimatedSprite extends DefaultSprite{
    scene:Scene;
    spriteSheetBehavior:SpriteSheetBehavior;

    constructor(scene:Scene, name:string,position:Point ={x:0,y:0},animateOnce:boolean =false){
        super(name, position);
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