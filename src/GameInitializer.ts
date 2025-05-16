import { GameController } from "./GameController";
import { PreloadImage } from "./util/ImagePreloader";
import { PreloadSoundEffect } from "./util/SoundEffects";

export interface GameInitializer{

    init(controller:GameController):void;

    preloadImages:PreloadImage[];

    preloadSounds?:PreloadSoundEffect[];
}