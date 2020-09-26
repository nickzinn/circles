import { GameController } from "../../gamelib/GameController";
import { SpaceGame } from "./SpaceGame";
import { Point } from "../../gamelib/types/Point";
import { Radar } from "./sprites/Radar";
import { Sprite } from "../../gamelib/sprites/Sprite";
import { SpriteExpirationBehavior } from "../../gamelib/sprites/behaviors/SpriteExpirationBehavior";
import { launchOpeningSequence } from "./OpeningSequence";
import { newBigExplosion, newSmallExplosion } from "./sprites/Explosion";
import { Player } from "./sprites/Player";
import { Enemy } from "./sprites/Enemy";
import { Missle } from "./sprites/Missle";
import { launchBetweenLevelsScene } from "./BetweenLevelScene";
import { Ship } from "./sprites/Ship";
import { generateGameAsteroids } from "./sprites/Asteroids";
import { centerPosition } from "../../gamelib/types/Rectangle";
import { FadeOutBehavior} from "../../gamelib/sprites/behaviors/FadeOutBehavior"
import { FadeInBehavior } from "../../gamelib/sprites/behaviors/FadeInBehavior";
import Scene from "../../gamelib/Scene";

const NAME = 'MainGameScene';
export class MainGameScene extends Scene<SpaceGame> {
	_score: number = 0;
	level: number;
	stars: Point[] = []
	player: Player;
	alienCount: number;
	pause: boolean = false;

	constructor(controller: GameController<SpaceGame>, level: number, score: number) {
		super(NAME, controller);
		this.setTiles(3,3, [(new Array(9)).fill(NAME)], false);
		
		this.level = level;
		this.score = score;
		controller.scene = this;
		this.modelSize = { width: this.size.width * 3, height: this.size.height * 3 };
		const area = this.modelSize.width * this.modelSize.height;
		this.wrapAround = true;

		this.addSprites(generateGameAsteroids(this, Math.floor((area / 300000) * (.6 + level * .4))));

		this.addSprite(new Radar(this));

		const center = { x: this.modelSize.width / 2, y: this.modelSize.height / 2 };
		this.viewPort = { x: center.x - this.size.width / 2, y: center.y - this.size.height / 2 };

		this.player = new Player(this, center);
		this.player.addBehavior(new FadeInBehavior(500));
		this.addSprite(this.player);

		this.alienCount = level;
		for (let i = 0; i < this.alienCount; i++)
			this.addSprite(new Enemy(this));

		this.speed = 1;
	}

	fire(ship: Ship) {
		if (ship.lastMissleFired && ship.lastMissleFired.behavior.age < 125 && ship.lastMissleFired.isAlive) {
			return;
		}
		const center = centerPosition(ship);
		const pos = {
			x: center.x + Math.cos(ship.shipAngle) * ship.size.width,
			y: center.y + Math.sin(ship.shipAngle) * ship.size.height
		};
		let expiration: number;
		if (this.player === ship) {
			expiration = 1500;
			this.controller.soundEffects.play("missle");

		} else {
			expiration = 1000;
			this.controller.soundEffects.play("alienMissle");
		}
		const missle = new Missle(pos, ship.shipAngle, ship.speed + 50, ship, this, expiration);
		ship.lastMissleFired = missle;
		this.addSprite(missle);
	}

	handleKeyPressed(key: string): void {
		if (this.pause)
			return;
		switch (key) {
			case 'a':
			case 'ArrowLeft':
				this.player.left();
				break;
			case 'w':
			case 'ArrowUp':
				this.player.move();
				break;
			case 's':
			case 'ArrowDown':
				this.player.move(-15.0);
				break;
			case 'd':
			case 'ArrowRight':
				this.player.right();
				break;
			case ' ':
				this.fire(this.player);
				break;
		}
	}

	gameOver() {
		if (this.pause)
			return;
		this.pause = true;
		this.controller.soundEffects.play("gameOver");

		this.addBehavior(new SpriteExpirationBehavior(4000));
		this.addBehavior({
			handleKill: () => {
				if (this.controller.gameInitializer.highscore < this.score) {
					this.controller.gameInitializer.highscore = this.score;
					this.controller.soundEffects.play("newHighScore");
				}
				launchOpeningSequence(this.controller);
			}
		});
	}
	nextLevel() {
		this.pause = true;
		this.addBehavior(new SpriteExpirationBehavior(3000));
		const behavior = new FadeOutBehavior(2000);
		behavior.handleTimeUp = () => this.player.isAlive = false;
		this.player.addBehavior(behavior);
		this.addBehavior({ handleKill: () => launchBetweenLevelsScene(this.controller, this.level, this.score) });
	}

	hit(hitPoints: number) {
		if (this.pause)
			return;
		if (this.player.shield - hitPoints <= 0) {
			const center = centerPosition(this.player);
			this.addSprite(newBigExplosion(this, center));
			this.player.isAlive = false;
			this.gameOver();
		} else {
			this.player.shield -= hitPoints;
			this.player.animateShield();
		}
	}
	missleHit(owner: Sprite, otherSprite: Sprite) {
		if (this.debug) {
			console.log(`Missle from ${owner.name} hits sprite ${otherSprite.name}`);
		}
		if (this.pause)
			return;

		if (otherSprite.name === 'player') {
			this.hit(49);
		} else if (otherSprite.name === 'enemy' && owner === this.player) {
			otherSprite.isAlive = false;
			this.addSprite(newBigExplosion(this, centerPosition(otherSprite)));
			this.score += 50;
			if (--this.alienCount === 0) {
				this.nextLevel();
			}
		} else if (owner === this.player && otherSprite.name === 'asteroid') {
			otherSprite.isAlive = false;
			this.addSprite(newSmallExplosion(this, centerPosition(otherSprite)));
			this.score += 5;
		}
	}
	set score(score: number) {
		this._score = score;
		this.controller.publishEvent({ type: 'score', value: (this.score) });
	}
	get score(): number {
		return this._score;
	}
	handleMouseClick(x: number, y: number) {
		if (this.pause)
			return;
		this.handleTouch(x, y);
		this.fire(this.player);
	}

	handleTouch(x: number, y: number) {
		if (this.pause)
			return;
		const xDist = this.player.position.x - x - this.viewPort.x;
		const yDist = this.player.position.y - y - this.viewPort.y;
		const distance = Math.hypot(xDist, yDist);
		const requiredHeading = Math.atan2(yDist, xDist);
		const crossproduct = Math.sin(requiredHeading - this.player.shipAngle);

		if (crossproduct > .1)
			this.player.shipAngle -= .05;
		else if (crossproduct < -.1)
			this.player.shipAngle += .05;
		if (distance > 100) {
			this.player.move();
			this.acceleration = -1;
		} else {
			this.acceleration = -5;
		}
	}
}
