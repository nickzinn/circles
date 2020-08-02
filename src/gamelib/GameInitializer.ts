import { GameController } from "./GameController";
import { PreloadImage } from "./ImagePreloader";

export interface GameInitializer{

    init(controller:GameController):void;

    preloadImages:PreloadImage[];
}