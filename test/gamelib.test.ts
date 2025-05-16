// test/my-lib.test.ts
import { GameController } from '../src/GameController';
import { GameInitializer } from '../src/GameInitializer';
export class TestInit implements GameInitializer{

    preloadImages = [];
    preloadSounds = [];

    init(controller: GameController): void {
        
    }
}

test('it runs with canvas mock', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  expect(ctx).toBeDefined();
  const gameInitializer = new TestInit();
  const gameController = new GameController(gameInitializer);
});