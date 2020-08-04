import { GameController } from "../../gamelib/GameController";
import Scene from "../../gamelib/Scene";
import { generateAsteroids } from "./sprites/Asteroids";
import { SpaceGame } from "./SpaceGame";


export function createMainGameScene(controller:GameController<SpaceGame>, level:number){
    const scene = new Scene('MainGameScene',controller);
    controller.scene = scene;
    let score =0;
    scene.modelSize = {width: scene.size.width *3, height: scene.size.height*2};
    controller.publishEvent({type:'score', value:(score)});
    scene.wrapAround = true;
    scene.paintBackground = function(ctx: CanvasRenderingContext2D) {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, scene.size.width, scene.size.height);
    }

    generateAsteroids(controller, 30);
}