// test/my-lib.test.ts
import { GameController } from '../src/GameController';
import { GameInitializer } from '../src/GameInitializer';
export class TestController implements GameInitializer<TestController>{

    preloadImages = [];
    preloadSounds = [];

    init(controller: GameController<TestController>): void {
        
    }
}

test('it runs with canvas mock', () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  expect(ctx).toBeDefined();
const gameController = new TestController();
});