import { MainGameScene } from "../MainGameScene";
import { Ship } from "./Ship";

export class Enemy extends Ship {

    mainGameScene:MainGameScene;
    constructor(scene:MainGameScene) {
        super(scene, {x:Math.floor(Math.random() * scene.modelSize.width), y:50}, "enemy");
        this.mainGameScene = scene;
        this.speed = 100;
        this.angle = Math.random();
        this.shipAngle = 0;
    }

    private count:number =0;

    updateModel(timeSinceLastUpdate: number):void{
        super.updateModel(timeSinceLastUpdate);
        const xDist = this.position.x - this.mainGameScene.player.position.x;
        const yDist = this.position.y - this.mainGameScene.player.position.y;
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
    	this.speed = Math.min(this.speed, 300);
	}
}