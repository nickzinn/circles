import { GameController } from "./GameController.js";
import { PreloadImage } from "./util/ImagePreloader.js";
import { PreloadSoundEffect } from "./util/SoundEffects.js";

export interface GameInitializer{

    init(controller:GameController):void;

    preloadImages:PreloadImage[];

    preloadSounds?:PreloadSoundEffect[];
}