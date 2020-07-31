import { GameController } from "./GameController";

export interface GameInitializer{

    init(controller:GameController):void;

    preloadImagesKeyPathMap():Map<string,string>;
}