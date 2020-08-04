import { GameInitializer } from "../../gamelib/GameInitializer";
import { GameController } from "../../gamelib/GameController";
import { launchOpenningSequence } from "./OpenningSequence";

export class SpaceGame implements GameInitializer<SpaceGame>{
    
    highscore:number =0;

    preloadImages = [{name:'asteroid', src:'/circles/assets/images/asteroidtw8.png'}];
    preloadSounds = [{name:'boop', src:'/circles/assets/sounds/boop.m4a'}
                    ,{name:'error', src:'/circles/assets/sounds/error.m4a'}];

	init(controller:GameController<SpaceGame>):void {
        launchOpenningSequence(controller);  
        controller.debug = true;      
	}
}