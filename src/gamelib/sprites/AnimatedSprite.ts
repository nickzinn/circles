import { Point } from "../types/Point";
import { SpriteSheetBehavior } from "../behaviors/SpriteSheetBehavior";
import { DefaultSprite } from "../behaviors/DefaultSprite";
import Scene from "../Scene";
import { GameInitializer } from "../GameInitializer";


export class AnimatedSprite<T extends GameInitializer<T>, S extends Scene<T>> extends DefaultSprite{
    scene:S;
    spriteSheetBehavior:SpriteSheetBehavior;

    constructor(scene:S, name:string,position:Point ={x:0,y:0},animateOnce:boolean =false){
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