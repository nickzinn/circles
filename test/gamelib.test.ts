// test/my-lib.test.ts

import { expect, test, vi } from 'vitest'

import { GameController } from '../src/GameController';
import { GameInitializer } from '../src/GameInitializer';
import Scene from '../src/Scene';
import { FadeInBehavior } from '../src/sprites/behaviors/FadeInBehavior';
import { DefaultSprite } from '../src/sprites/DefaultSprite';
import { Vector } from '../src/types/Vector';
export class TestInit implements GameInitializer{

    preloadImages = [];
    preloadSounds = [];

    init(controller: GameController): void {
        const scene = new Scene("test scene", controller);
        scene.addBehavior(new FadeInBehavior(50));
        const sprite = new DefaultSprite('test sprite', { x: 100, y: 100 }, { width: 50, height: 50 });
        sprite.addBehavior(new FadeInBehavior(50));
        sprite.vector = new Vector(0.1, 0.1);
        scene.addSprite(sprite);
        controller.scene = scene;

    }
}

test('it runs with canvas mock', () => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.width = '800px';
  canvas.style.height = '600px';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  expect(ctx).toBeDefined();
  expect(ctx!.canvas.width).toBe(800);
  expect(ctx!.canvas.height).toBe(600);
  const gameInitializer = new TestInit();
  const gameController = new GameController(gameInitializer);
  gameController.init(canvas, () => {})

  vi.useFakeTimers();
  vi.advanceTimersToNextFrame();
  vi.advanceTimersToNextFrame();
  vi.advanceTimersToNextFrame();
  gameController.publishEvent({ type: 'start', value: "value" });
  vi.advanceTimersToNextFrame();
});