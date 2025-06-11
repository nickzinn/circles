
import { PolarVector } from "gamelib";
import { MainGameScene } from "../MainGameScene";
import { Ship } from "./Ship";

export class Enemy extends Ship {

    mainGameScene:MainGameScene;
    constructor(scene:MainGameScene) {
        super(scene, {x:Math.floor(Math.random() * scene.modelSize.width), y:50}, "enemy");
        this.mainGameScene = scene;
        this.vector = new PolarVector(100, Math.random()).toVector();
        this.shipAngle = 0;
    }

    private count:number =0;

    updateModel(timeSinceLastUpdate: number):void{
        super.updateModel(timeSinceLastUpdate);
        const xDist = this.x - this.mainGameScene.player.x;
        const yDist = this.y - this.mainGameScene.player.y;
        const distance = Math.hypot(xDist, yDist);
        if (distance > 1500)
            return;
        const requiredHeading = Math.atan2(yDist, xDist);
        const crossproduct = Math.sin(requiredHeading - this.shipAngle);

        if (crossproduct > .1) 
            this.shipAngle -= .1;
        else if (crossproduct < -.1)
            this.shipAngle += .1 ;
        else if (this.count++ % Math.max(100 - this.mainGameScene.level * 20, 30) === 0 && distance < 600   )
            this.mainGameScene.fire(this);
        if (distance > 300) {
            this.move();
        }
    }

    move(amount:number = 12.0) {
        super.move(amount);

        const polar = this.vector.toPolar();
        this.vector = polar.withSpeed(Math.min(polar.speed, 300)).toVector();
	}
}