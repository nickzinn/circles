import { GameController } from "./GameController";
import { PreloadImage } from "./util/ImagePreloader";
import { PreloadSoundEffect } from "./util/SoundEffects";

export interface GameInitializer<T extends GameInitializer<T>>{

    init(controller:GameController<T>):void;

    preloadImages:PreloadImage[];

    preloadSounds?:PreloadSoundEffect[];
}