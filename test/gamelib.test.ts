// test/my-lib.test.ts

import { expect, test, vi } from 'vitest'

import { GameController } from '../src/GameController';
import { GameInitializer } from '../src/GameInitializer';
import Scene from '../src/Scene';
import { FadeInBehavior } from '../src/sprites/behaviors/FadeInBehavior';
export class TestInit implements GameInitializer{

    preloadImages = [];
    preloadSounds = [];

    init(controller: GameController): void {
        const scene = new Scene("test scene", controller, {width: 800, height: 600});
        scene.addBehavior(new FadeInBehavior(50));
        controller.scene = scene;

    }
}

test('it runs with canvas mock', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  expect(ctx).toBeDefined();
  const gameInitializer = new TestInit();
  const gameController = new GameController(gameInitializer);
  gameController.init(canvas, () => {});
  vi.useFakeTimers();
  vi.advanceTimersToNextFrame();
});